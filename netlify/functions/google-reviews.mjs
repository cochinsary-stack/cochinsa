// Fetches Cochinsa's real Google Maps reviews via the Google Places API (New)
// and returns only the positive ones (4★ and above, with text).
// Responses are cached on Netlify's CDN for 12 hours to keep API usage low.

const SEARCH_QUERY = "شركة كوشن للمطابخ جدة";
const MIN_RATING = 4;

async function findPlaceId(key) {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY, languageCode: "ar", regionCode: "SA" }),
  });
  if (!res.ok) throw new Error(`searchText ${res.status}`);
  const data = await res.json();
  return data.places?.[0]?.id;
}

export default async (req) => {
  const lang = new URL(req.url).searchParams.get("lang") === "en" ? "en" : "ar";
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return Response.json({ reviews: [] }, { status: 503 });

  try {
    const placeId = await findPlaceId(key);
    if (!placeId) throw new Error("place not found");

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
      }
    );
    if (!res.ok) throw new Error(`details ${res.status}`);
    const place = await res.json();

    const reviews = (place.reviews || [])
      .filter((r) => (r.rating || 0) >= MIN_RATING && (r.text?.text || r.originalText?.text))
      .map((r) => ({
        rating: r.rating,
        text: r.text?.text || r.originalText?.text,
        author: r.authorAttribution?.displayName || "",
        authorUri: r.authorAttribution?.uri || "",
        photo: r.authorAttribution?.photoUri || "",
        time: r.relativePublishTimeDescription || "",
      }));

    return Response.json(
      {
        rating: place.rating ?? null,
        total: place.userRatingCount ?? null,
        mapsUri: place.googleMapsUri || "",
        reviews,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=600",
          "Netlify-CDN-Cache-Control": "public, durable, max-age=43200, stale-while-revalidate=86400",
          "Netlify-Vary": "query=lang",
        },
      }
    );
  } catch (err) {
    console.error("google-reviews:", err.message);
    return Response.json({ reviews: [] }, { status: 502 });
  }
};

export const config = { path: "/api/google-reviews" };
