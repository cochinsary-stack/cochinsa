// Exposes the public reCAPTCHA v2 site key so the static page can render the widget.
// The secret (SITE_RECAPTCHA_SECRET) is only read by Netlify Forms and never returned here.
export default async () =>
  Response.json(
    { siteKey: process.env.SITE_RECAPTCHA_KEY || null },
    { headers: { "Cache-Control": "public, max-age=300" } }
  );

export const config = { path: "/api/recaptcha-config" };
