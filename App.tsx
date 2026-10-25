import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import logoUrl from "container:///mnt/data/src/assets/500b6a09ebcdd4c2-cochin_logo_black_gold_trans_final.png";
import heroVideo1 from "container:///mnt/data/src/assets/ec532ecc0346f513-cochin_hero_720.mp4";
import heroVideo2 from "container:///mnt/data/src/assets/21ea8d2c35a8fc81-From_Klickpin_com-_Try_these_10_Beautiful_garden_wedding_decor_ideas_that_look_e.mp4";
import img1 from "container:///mnt/data/src/assets/cf1edf85e11dd52c-f8be8b25b5e59126378cae5ea274fcd3.jpg";
import img2 from "container:///mnt/data/src/assets/b073906b74765956-1_2.jpg";
import img3 from "container:///mnt/data/src/assets/3227b42f3b4cfc83-1_3.jpg";
import img4 from "container:///mnt/data/src/assets/27eb52b63eb0168c-1_4.jpg";
import img5 from "container:///mnt/data/src/assets/5d126e9ab770c92a-1-upscaled_2.png";
import img6 from "container:///mnt/data/src/assets/be5f421becb82128-1.jpeg";
import img7 from "container:///mnt/data/src/assets/610af5e7f85ab986-1.jpg";
import img8 from "container:///mnt/data/src/assets/20a15c3ea61fec43-2_2.jpg";

type Lang = 'ar' | 'en';
type Theme = 'night' | 'day';
type PageMode = 'full' | 'booking' | 'maintenance';

const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/cochin_sa/",
  tiktok: "https://www.tiktok.com/@cochin.sa?lang=ar",
  snapchat: "https://www.snapchat.com/@cochin.sa?invite_id=NCZdW-As&share_id=vud2tFeoQfmpNQHl2eM17g&sid=8b07fb2a13ac48f2a8136bd539b5c5cb",
  whatsapp: "https://wa.me/966536380807",
};

async function callAction(action: string, args: any) {
  const res = await fetch("actions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, args })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json as any).error) {
    throw new Error((json as any).error || `Action ${action} failed`);
  }
  return (json as any).data;
}

const translations: any = {
  ar: {
    portfolio: 'معرض الأعمال',
    branches: 'فروعنا',
    german: 'الجودة الألمانية',
    partners: 'شركاؤنا',
    book: 'حجز موعد',
    maintenance: 'طلب صيانة',
    heroSlides: [
      { title: 'مساحات تليق بذوقك', sub: 'صناعة ألمانية بمعايير عالمية', cta: 'معرض الأعمال' },
      { title: 'دقة ألمانية - فخامة تدوم', sub: 'Hettich • Blum - تصاميم تفصيلية', cta: 'معرض الأعمال' },
    ],
    germanSectionTitle: 'الصناعة الألمانية - دقة تدوم',
    germanSectionSub: 'German Engineering That Lasts',
    germanDesc: 'نستخدم مفصلات Hettich الألمانية وأدراج Blum النمساوية بضمان مدى الحياة - دقة ألمانية في كل تفصيلة، صناعة تتحمل الزمن بلمسة فاخرة تعكس المعايير الألمانية العالمية.',
    germanCards: [
      { title: 'مفصلات Hettich الألمانية', sub: 'ضمان مدى الحياة', desc: 'نظام إغلاق ناعم Soft-Close، اختبار 80,000 دورة، مقاومة تآكل ألمانية', stat: 'Hettich' },
      { title: 'أدراج Blum النمساوية', sub: 'سلاسة بلا حدود', desc: 'سحب كامل، تحميل حتى 65 كجم، حركة صامتة بدقة هندسية', stat: 'Blum' },
      { title: 'خامات German Acrylic', sub: 'لمعان يدوم', desc: 'أكريليك ألماني عالي اللمعان، مقاوم للخدش والحرارة، لمعة مرآة حقيقية', stat: 'German Acrylic' },
    ],
    stats: [
      { n: '15', suffix: ' سنة', l: 'ضمان شامل', target: 15 },
      { n: 'مدى الحياة', suffix: '', l: 'ضمان المفصلات', target: 0 },
      { n: '20+', suffix: ' سنة', l: 'خبرة صناعة', target: 20 },
      { n: '4', suffix: ' فروع', l: 'صالات عرض', target: 4 },
    ],
    warrantyBanner: 'ضمان 15 سنة على المطابخ • ضمان مفصلات مدى الحياة • Hettich • Blum',
    prominentBookTitle: 'حجز موعد',
    prominentBookDesc: 'معاينة مجانية ورفع مقاسات بدقة ألمانية',
    prominentMaintTitle: 'طلب صيانة',
    prominentMaintDesc: 'خدمة ما بعد البيع بمعايير ألمانية',
    tabs: ['الكل', 'مطابخ', 'مجالس', 'دريسنج', 'بار'],
    branchTitle: 'صالات عرض بمعايير ألمانية',
    branchesList: [
      { name: 'كوشن فرع صاري', city: 'جدة - شارع صاري', img: img1 },
      { name: 'كوشن فرع الأمير سلطان', city: 'جدة - الأمير سلطان', img: img2 },
      { name: 'كوشن فرع قريش', city: 'جدة - شارع قريش', img: img3 },
      { name: 'كوشن فرع الطائف', city: 'الطائف', img: img4 },
    ],
    partnersTitle: 'شركاؤنا في النجاح',
    bookingTitle: 'حجز موعد',
    bookingSub: 'دقة ألمانية تبدأ من أول زيارة',
    formName: 'الاسم الكامل',
    formPhone: 'رقم الجوال',
    formCity: 'المدينة',
    formBranch: 'الفرع المفضل',
    formService: 'نوع الخدمة',
    formNotes: 'ملاحظات إضافية',
    formDate: 'التاريخ المفضل',
    budgetTitle: 'الميزانية المتوقعة',
    budgets: ['25,000 ريال سعودي', '50,000 ريال سعودي', '100,000 ريال سعودي', 'أكثر من 100,000 ريال سعودي'],
    guarantees: ['ضمان 15 سنة', 'ضمان المفصلات مدى الحياة', 'رفع المقاسات مجاناً', 'استشارة مجانية'],
    submit: 'تأكيد الحجز - حفظ وإرسال عبر واتساب',
    successBooking: 'تم حفظ طلب الحجز بنجاح! سنتواصل معك خلال 24 ساعة.',
    maintTitle: 'طلب صيانة',
    maintSub: 'خدمة ما بعد البيع - معايير Hettich & Blum',
    maintName: 'الاسم',
    maintPhone: 'رقم الجوال',
    maintOrder: 'رقم الطلب السابق (اختياري)',
    maintIssue: 'نوع المشكلة',
    maintDesc: 'وصف المشكلة',
    maintAddress: 'العنوان',
    uploadTitle: 'ارفاق نسخة من العقد (اختياري) - اسحب الملف هنا أو اضغط للاختيار',
    uploadBadge: 'غير إلزامي - يمكن التخطي',
    uploadHelp: 'السحب والإفلات مدعوم - الحد الأقصى 10 ميجا - الأنواع المدعومة JPG PNG PDF - يتم عرض معاينة فورية قبل الإرسال',
    uploadSkip: 'لا يوجد لدي صورة عقد - تخطي',
    uploadSuccess: 'تم ارفاق نسخة العقد - سيتم ارسالها مع الطلب',
    uploadSelected: 'تم اختيار الملف - سيتم إرسال اسمه مع الطلب عبر واتساب',
    uploadRemove: 'إزالة',
    uploadChange: 'تغيير الملف',
    noContract: 'لا يوجد لدي صورة عقد',
    maintSubmit: 'إرسال طلب الصيانة وحفظ التذكرة',
    successMaint: 'تم حفظ تذكرة الصيانة! رقم التذكرة: #CS-',
    footerFollow: 'تابعنا',
    footerCopy: '© Cochin SA كوشن - جميع الحقوق محفوظة',
    footerWarranty: 'ضمان 15 سنة | ضمان المفصلات مدى الحياة | جودة ألمانية Hettich & Blum',
    savedLabel: 'محفوظ',
    storageNote: 'يتم حفظ حجوزاتك بأمان - سعة التخزين 1000 سجل',
    dayMode: 'نهاري',
    nightMode: 'ليلي',
    openFullSite: 'العودة للموقع الكامل',
    dragActive: 'أفلت الملف هنا...',
    fileTooLarge: 'حجم الملف يتجاوز 10 ميجا',
    invalidType: 'نوع الملف غير مدعوم - يسمح فقط JPG PNG PDF',
    bookNow: 'احجز الآن →',
    maintNow: 'طلب صيانة →',
    ctaBookHeading: 'احجز موعدك الآن',
    ctaMaintHeading: 'خدمة الصيانة الفاخرة',
  },
  en: {
    portfolio: 'Portfolio',
    branches: 'Branches',
    german: 'German Quality',
    partners: 'Partners',
    book: 'Book Appointment',
    maintenance: 'Maintenance',
    heroSlides: [
      { title: 'Spaces Worthy of Your Taste', sub: 'German Engineering - World Standards', cta: 'Our Portfolio' },
      { title: 'German Precision - Luxury That Lasts', sub: 'Hettich • Blum - Detailed Designs', cta: 'Our Portfolio' },
    ],
    germanSectionTitle: 'German Industry - Precision That Lasts',
    germanSectionSub: 'الصناعة الألمانية - دقة تدوم',
    germanDesc: 'We use German Hettich hinges and Austrian Blum drawers with lifetime warranty - German precision in every detail, crafted to endure with luxurious finish reflecting global German standards.',
    germanCards: [
      { title: 'German Hettich Hinges', sub: 'Lifetime Warranty', desc: 'Soft-Close system, 80,000 cycles tested, German corrosion resistance', stat: 'Hettich' },
      { title: 'Austrian Blum Drawers', sub: 'Boundless Smoothness', desc: 'Full extension, up to 65kg load, silent movement with engineering precision', stat: 'Blum' },
      { title: 'German Acrylic Materials', sub: 'Lasting Shine', desc: 'High-gloss German Acrylic, scratch & heat resistant, true mirror gloss', stat: 'German Acrylic' },
    ],
    stats: [
      { n: '15', suffix: ' Years', l: 'Full Warranty', target: 15 },
      { n: 'Lifetime', suffix: '', l: 'Hinges Warranty', target: 0 },
      { n: '20+', suffix: ' Years', l: 'Experience', target: 20 },
      { n: '4', suffix: ' Branches', l: 'Showrooms', target: 4 },
    ],
    warrantyBanner: '15 Years Kitchen Warranty • Lifetime Hinges Warranty • Hettich • Blum',
    prominentBookTitle: 'Book Appointment',
    prominentBookDesc: 'Free visit & German precision measurement',
    prominentMaintTitle: 'Maintenance Request',
    prominentMaintDesc: 'After-sales service with German standards',
    tabs: ['All', 'Kitchens', 'Living', 'Dressing', 'Bar'],
    branchTitle: 'Showrooms with German Standards',
    branchesList: [
      { name: 'Cochin Sari Branch', city: 'Jeddah - Sari Street', img: img1 },
      { name: 'Cochin Prince Sultan Branch', city: 'Jeddah - Prince Sultan', img: img2 },
      { name: 'Cochin Quraish Branch', city: 'Jeddah - Quraish Street', img: img3 },
      { name: 'Cochin Taif Branch', city: 'Taif', img: img4 },
    ],
    partnersTitle: 'Our Success Partners',
    bookingTitle: 'Book Appointment',
    bookingSub: 'German precision starts from first visit',
    formName: 'Full Name',
    formPhone: 'Phone Number',
    formCity: 'City',
    formBranch: 'Preferred Branch',
    formService: 'Service Type',
    formNotes: 'Additional Notes',
    formDate: 'Preferred Date',
    budgetTitle: 'Expected Budget',
    budgets: ['25,000 SAR', '50,000 SAR', '100,000 SAR', 'More than 100,000 SAR'],
    guarantees: ['15 Years Warranty', 'Lifetime Hinges Warranty', 'Free Measurement', 'Free Consultation'],
    submit: 'Confirm Booking - Save & Send via WhatsApp',
    successBooking: 'Booking saved successfully! We will contact you within 24 hours.',
    maintTitle: 'Maintenance Request',
    maintSub: 'After-sales service - Hettich & Blum Standards',
    maintName: 'Name',
    maintPhone: 'Phone Number',
    maintOrder: 'Previous Order No (Optional)',
    maintIssue: 'Issue Type',
    maintDesc: 'Issue Description',
    maintAddress: 'Address',
    uploadTitle: 'Attach Contract Copy (Optional) - Drag here or tap to select',
    uploadBadge: 'Optional - Can Skip',
    uploadHelp: 'Drag & drop supported - Max 10MB - JPG PNG PDF allowed - Instant preview',
    uploadSkip: 'I have no contract image - Skip',
    uploadSuccess: 'Contract copy attached - will be sent with request',
    uploadSelected: 'File selected - name will be sent via WhatsApp',
    uploadRemove: 'Remove',
    uploadChange: 'Change file',
    noContract: 'I don\'t have contract image',
    maintSubmit: 'Submit & Save Maintenance Ticket',
    successMaint: 'Maintenance ticket saved! Ticket No: #CS-',
    footerFollow: 'Follow Us',
    footerCopy: '© Cochin SA - All rights reserved',
    footerWarranty: '15 Years Warranty | Lifetime Hinges Warranty | German Quality Hettich & Blum',
    savedLabel: 'Saved',
    storageNote: 'Your bookings are saved securely - 1000 records capacity',
    dayMode: 'Day',
    nightMode: 'Night',
    openFullSite: 'Back to Full Site',
    dragActive: 'Drop file here...',
    fileTooLarge: 'File exceeds 10MB',
    invalidType: 'Unsupported type - JPG PNG PDF only',
    bookNow: 'Book Now →',
    maintNow: 'Request →',
    ctaBookHeading: 'Book Your Appointment Now',
    ctaMaintHeading: 'Luxury Maintenance Service',
  }
};

const portfolioItems = [
  { id: 2, cat: ['مجالس', 'Living', 'الكل', 'All'], img: img2, titleAr: 'جدار تلفاز رخام أخضر وخشب منحني', titleEn: 'Green Marble TV Wall & Curved Wood', material: 'Calacatta Marble + Natural Oak' },
  { id: 3, cat: ['بار', 'Bar', 'مطابخ', 'Kitchens', 'الكل', 'All'], img: img3, titleAr: 'بار قهوة LED رخامي مينيمال', titleEn: 'Minimal LED Marble Coffee Bar', material: 'Quartz + LED + German Hardware' },
  { id: 4, cat: ['مجالس', 'Living', 'الكل', 'All'], img: img4, titleAr: 'مجلس بيج مودرن بجدار تلفاز', titleEn: 'Modern Beige Living TV Wall', material: 'Natural Wood + German Comfort' },
  { id: 5, cat: ['دريسنج', 'Dressing', 'الكل', 'All'], img: img5, titleAr: 'دريسنج أسود زجاجي بجزيرة LED', titleEn: 'Black Glass Dressing with LED Island', material: 'German Glass + Blum Drawers' },
  { id: 6, cat: ['دريسنج', 'Dressing', 'الكل', 'All'], img: img6, titleAr: 'غرفة نوم فاخرة بثريا', titleEn: 'Luxury Bedroom with Chandelier', material: 'German Elegance + Hettich' },
  { id: 7, cat: ['مطابخ', 'Kitchens', 'الكل', 'All'], img: img7, titleAr: 'مطبخ كلاسيكي بيج بخزائن زجاجية', titleEn: 'Classic Beige Kitchen Glass Cabinets', material: 'German Classic + Natural Wood' },
  { id: 8, cat: ['مجالس', 'Living', 'الكل', 'All'], img: img8, titleAr: 'تفصيلة رخام أخضر - حرفة ألمانية', titleEn: 'Green Marble Detail - German Craftsmanship', material: 'Green Marble + Gold Detail' },
];

const germanImages = [img3, img5, img7];
const branchImagesClean = [img2, img3, img4, img5];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = (e: any) => setPrefers(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return prefers;
}
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -60px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}
function Reveal({ children, delay = 0, className = '', y = 20, threshold = 0.12, withScale = false }: { children: any, delay?: number, className?: string, y?: number, threshold?: number, withScale?: boolean }) {
  const { ref, visible } = useReveal(threshold);
  const isMobile = useIsMobile();
  const effectiveDelay = isMobile ? delay * 0.5 : delay;
  const effectiveY = isMobile ? Math.min(y, 20) : y;
  const duration = isMobile ? 0.6 : 0.8;
  return (
    <div ref={ref} className={`${className} will-change-transform`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translate3d(0,0,0) scale3d(1,1,1)' : `translate3d(0,${effectiveY}px,0) scale3d(${withScale && isMobile ? 0.95 : 1},${withScale && isMobile ? 0.95 : 1},1)`, transition: `opacity ${duration}s ease-out ${effectiveDelay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${effectiveDelay}s`, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}>
      {children}
    </div>
  );
}
function HeadlineReveal({ children, delay = 0, className = '', threshold = 0.12 }: { children: any, delay?: number, className?: string, threshold?: number }) {
  const { ref, visible } = useReveal(threshold);
  const isMobile = useIsMobile();
  const d = isMobile ? delay * 0.5 : delay;
  const duration = isMobile ? 0.5 : 1.1;
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <div className="will-change-transform" style={{ clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)', opacity: visible ? 1 : 0, transition: `clip-path ${duration}s cubic-bezier(0.16,1,0.3,1) ${d}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${d}s, opacity 0.5s ease ${d}s`, willChange: 'clip-path, transform', backfaceVisibility: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
function GoldLine({ width = 40, delay = 0, center = false, className = '' }: { width?: number, delay?: number, center?: boolean, className?: string }) {
  const { ref, visible } = useReveal(0.12);
  const isMobile = useIsMobile();
  const effectiveDelay = isMobile ? delay * 0.5 : delay;
  const duration = isMobile ? 0.8 : 1;
  return (
    <div ref={ref} className={`h-[1px] bg-[#D4AF37] ${className} ${center ? 'mx-auto' : ''} will-change-transform`} style={{ width: visible ? `${width}px` : '0px', transition: `width ${duration}s cubic-bezier(0.16,1,0.3,1) ${effectiveDelay}s, opacity 0.5s ease ${effectiveDelay}s, box-shadow 0.8s ease ${effectiveDelay}s`, opacity: visible ? 1 : 0, boxShadow: visible ? '0 0 12px rgba(212,175,55,0.5)' : 'none', transform: 'translate3d(0,0,0)', willChange: 'width', backfaceVisibility: 'hidden' }} />
  );
}
function CountUp({ target, suffix = '', prefix = '', duration = 1100, className = '', style = {} as any }) {
  const { ref, visible } = useReveal(0.12);
  const [count, setCount] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!visible || hasAnimated.current || target === 0) return;
    hasAnimated.current = true;
    if (prefersReduced) { setCount(target); return; }
    let start: number | null = null;
    const dur = isMobile ? Math.min(duration, 900) : duration;
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [visible, target, duration, prefersReduced, isMobile]);
  return <div ref={ref} className={className} style={{...style, backfaceVisibility: 'hidden' as any}}>{target === 0 ? prefix : `${prefix}${count}${suffix}`}</div>;
}
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || isMobile || prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-6px,0) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [isMobile, prefersReduced]);
  return ref;
}
function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || isMobile || prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => { el.style.transform = 'translate3d(0,0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [isMobile, prefersReduced, strength]);
  return ref;
}
function CustomCursor() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (isMobile || prefersReduced) return;
    const onMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const animate = () => {
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.35;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [isMobile, prefersReduced]);
  if (isMobile || prefersReduced) return null;
  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block will-change-transform" style={{ transform: 'translate3d(0,0,0)', marginLeft: '-3px', marginTop: '-3px' }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-[#D4AF37]/40 rounded-full pointer-events-none z-[9999] hidden lg:block will-change-transform" style={{ transform: 'translate3d(0,0,0)', marginLeft: '-16px', marginTop: '-16px', transition: 'width 0.2s, height 0.2s' }} />
    </>
  );
}
function WhatsAppIconLux({ size = 18, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden><path d="M12 2C6.48 2 2 6.26 2 11.5c0 1.9.56 3.67 1.52 5.18L2 22l5.52-1.44A9.88 9.88 0 0012 21c5.52 0 10-4.26 10-9.5S17.52 2 12 2zm0 17.3c-1.48 0-2.92-.39-4.18-1.12l-.3-.18-3.28.86.88-3.1-.2-.32A7.85 7.85 0 014 11.5C4 7.18 7.73 3.7 12 3.7c4.27 0 8 3.48 8 7.8s-3.73 7.8-8 7.8zm4.68-5.82c-.25-.13-1.48-.71-1.71-.79-.23-.08-.4-.13-.57.12-.17.25-.66.79-.81.95-.15.16-.3.18-.55.05-.25-.13-1.06-.38-2.02-1.21-.75-.65-1.25-1.45-1.4-1.7-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.13-.14.17-.25.25-.42.08-.16.04-.3-.02-.42-.06-.12-.57-1.33-.78-1.82-.2-.47-.41-.41-.57-.42h-.49c-.17 0-.42.06-.64.3-.22.25-.84.8-.84 1.94s.86 2.25.98 2.4c.12.16 1.7 2.52 4.12 3.53.58.24 1.03.38 1.38.49.58.18 1.1.15 1.52.09.46-.07 1.48-.59 1.69-1.16.21-.57.21-1.06.15-1.16-.06-.1-.23-.16-.48-.28z" fill="currentColor" /></svg>
}
function InstagramIcon({ size = 22, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
}
function TikTokIcon({ size = 22, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M14 3v10.5a3.5 3.5 0 1 1-2-3.16V6a7 7 0 0 0 6 2.5V6.5a4.9 4.9 0 0 1-4-3.5Z" /></svg>
}
function SnapchatIcon({ size = 22, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M12 3c-3.5 0-6 2.2-6 5.2 0 2 1.2 3.4 1.2 3.4s-.6 2.4-.8 3c-.1.4.2.7.6.5 1-.5 1.8-1.2 2.2-1.5.6.3 1.7.7 2.8.7s2.2-.4 2.8-.7c.4.3 1.2 1 2.2 1.5.4.2.7-.1.6-.5-.2-.6-.8-3-.8-3s1.2-1.4 1.2-3.4C18 5.2 15.5 3 12 3Z" /><path d="M9.2 13.5c.5.4 1.6.8 2.8.8s2.3-.4 2.8-.8" /></svg>
}
function SunIcon({ size = 18, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
}
function MoonIcon({ size = 18, className = '' }: { size?: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
}
function addGoldRipple(e: React.MouseEvent | React.TouchEvent) {
  const target = e.currentTarget as HTMLElement;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const clientX = (e as any).touches ? (e as any).touches[0]?.clientX : (e as React.MouseEvent).clientX;
  const clientY = (e as any).touches ? (e as any).touches[0]?.clientY : (e as React.MouseEvent).clientY;
  if (clientX == null) return;
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const ripple = document.createElement('span');
  ripple.className = 'gold-touch-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  target.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}
function getPageFromUrl(): PageMode {
  try {
    const sp = new URLSearchParams(window.location.search);
    const p = (sp.get('page') || '').toLowerCase();
    if (p === 'booking' || p === 'book' || p === 'hgz' || p === 'hajz') return 'booking';
    if (p === 'maintenance' || p === 'maint' || p === 'syanah' || p === 'siana' || p === 'siyana') return 'maintenance';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('booking') || hash.includes('book')) return 'booking';
    if (hash.includes('maintenance') || hash.includes('maint') || hash.includes('syanah') || hash.includes('siana')) return 'maintenance';
  } catch {}
  return 'full';
}
function getShareableUrl(mode: PageMode): string {
  try {
    const origin = window.location.origin || 'https://cochin.sa';
    const pathname = window.location.pathname || '/';
    if (mode === 'full') return origin + pathname;
    if (mode === 'booking') return `${origin}${pathname}?page=booking`;
    if (mode === 'maintenance') return `${origin}${pathname}?page=maintenance`;
    return `${origin}${pathname}?page=${mode}`;
  } catch {
    if (mode === 'booking') return "https://cochin.sa/?page=booking";
    if (mode === 'maintenance') return "https://cochin.sa/?page=maintenance";
    return `https://cochin.sa/?page=${mode}`;
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('night');
  const [activeTab, setActiveTab] = useState('الكل');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [budget, setBudget] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [maintSuccess, setMaintSuccess] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [busyBooking, setBusyBooking] = useState(false);
  const [busyMaint, setBusyMaint] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [maintList, setMaintList] = useState<any[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', city: 'جدة', branch: 'صاري', service: 'مطابخ', notes: '', date: '' });
  const [maintForm, setMaintForm] = useState({ name: '', phone: '', orderNo: '', issue: 'مفصلات', desc: '', address: '', hasContractSkip: true });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingLine, setLoadingLine] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const germanRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const [pageMode, setPageMode] = useState<PageMode>('full');
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [contractPreview, setContractPreview] = useState<string | null>(null);
  const [contractError, setContractError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRefStandalone = useRef<HTMLInputElement>(null);
  const t = translations[lang];
  const isDay = theme === 'day';
  const slides = useMemo(() => [
    { src: heroVideo1, title: t.heroSlides[0].title, sub: t.heroSlides[0].sub, cta: t.heroSlides[0].cta },
    { src: heroVideo2, title: t.heroSlides[1].title, sub: t.heroSlides[1].sub, cta: t.heroSlides[1].cta },
  ], [t]);

  useEffect(() => {
    const mode = getPageFromUrl();
    setPageMode(mode);
    const onPop = () => setPageMode(getPageFromUrl());
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);

  useEffect(() => {
    function initPageRouter(){
      try{
        const params = new URLSearchParams(window.location.search);
        const page = (params.get('page') || '').toLowerCase();
        const mainSite = document.getElementById('main-site');
        const bookingPage = document.getElementById('booking-standalone-page');
        const maintenancePage = document.getElementById('maintenance-standalone-page');
        if(!mainSite || !bookingPage || !maintenancePage) return;
        const bg = isDay ? '#FFFFFF' : '#000000';
        const txt = isDay ? '#000000' : '#FFFFFF';
        document.body.style.backgroundColor = bg;
        document.body.style.color = txt;
        document.body.style.minHeight = '100vh';
        document.documentElement.style.setProperty('--bg-color', bg);
        document.documentElement.style.setProperty('--text-color', txt);
        document.documentElement.setAttribute('data-theme', isDay ? 'light' : 'dark');
        if(page === 'booking' || page === 'book' || page === 'hgz' || page === 'hajz'){
          mainSite.style.display = 'none';
          maintenancePage.style.display = 'none';
          bookingPage.style.display = 'block';
          (bookingPage.style as any).visibility = 'visible';
          (bookingPage.style as any).opacity = '1';
          document.body.classList.add('standalone-mode');
          window.scrollTo(0,0);
        } else if(page === 'maintenance' || page === 'maint' || page === 'syanah' || page === 'siana' || page === 'siyana'){
          mainSite.style.display = 'none';
          bookingPage.style.display = 'none';
          maintenancePage.style.display = 'block';
          (maintenancePage.style as any).visibility = 'visible';
          (maintenancePage.style as any).opacity = '1';
          document.body.classList.add('standalone-mode');
          window.scrollTo(0,0);
        } else {
          if(pageMode === 'full'){
            mainSite.style.display = 'block';
            bookingPage.style.display = 'none';
            maintenancePage.style.display = 'none';
            document.body.classList.remove('standalone-mode');
          }
        }
      } catch(e){
        console.error('Router error', e);
        const mainSite = document.getElementById('main-site');
        if(mainSite) mainSite.style.display = 'block';
      }
    }
    initPageRouter();
    const tm = setTimeout(initPageRouter, 150);
    return () => clearTimeout(tm);
  }, [pageMode, isDay]);

  const navigatePage = useCallback((mode: PageMode) => {
    try {
      if (mode === 'full') {
        const url = window.location.pathname;
        window.history.pushState({}, '', url);
      } else {
        const url = `${window.location.pathname}?page=${mode}`;
        window.history.pushState({}, '', url);
      }
    } catch {}
    setPageMode(mode);
    try{
      const mainSite = document.getElementById('main-site');
      const bookingPage = document.getElementById('booking-standalone-page');
      const maintenancePage = document.getElementById('maintenance-standalone-page');
      if(mainSite && bookingPage && maintenancePage){
        if(mode === 'booking'){
          mainSite.style.display = 'none';
          maintenancePage.style.display = 'none';
          bookingPage.style.display = 'block';
          (bookingPage.style as any).visibility = 'visible';
          (bookingPage.style as any).opacity = '1';
        } else if(mode === 'maintenance'){
          mainSite.style.display = 'none';
          bookingPage.style.display = 'none';
          maintenancePage.style.display = 'block';
          (maintenancePage.style as any).visibility = 'visible';
          (maintenancePage.style as any).opacity = '1';
        } else {
          mainSite.style.display = 'block';
          bookingPage.style.display = 'none';
          maintenancePage.style.display = 'none';
        }
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenu(false);
  }, []);

  const handleContractFile = useCallback((file: File) => {
    setContractError(null);
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    if (!(isImage || isPdf)) {
      setContractError(t.invalidType);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setContractError(t.fileTooLarge);
      return;
    }
    if (contractPreview) {
      try { URL.revokeObjectURL(contractPreview); } catch {}
    }
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
    setContractFile(file);
    setContractPreview(previewUrl || null);
    setMaintForm(prev => ({ ...prev, hasContractSkip: false }));
  }, [contractPreview, t]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleContractFile(f);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (maintForm.hasContractSkip) return;
    const f = e.dataTransfer.files?.[0];
    if (f) handleContractFile(f);
  };
  const removeContractFile = () => {
    if (contractPreview) {
      try { URL.revokeObjectURL(contractPreview); } catch {}
    }
    setContractFile(null);
    setContractPreview(null);
    setContractError(null);
    if (fileInputRefStandalone.current) fileInputRefStandalone.current.value = '';
  };
  const handleSkipToggle = (checked: boolean) => {
    if (checked) {
      removeContractFile();
    }
    setMaintForm(prev => ({ ...prev, hasContractSkip: checked }));
  };
  useEffect(() => {
    return () => {
      if (contractPreview) {
        try { URL.revokeObjectURL(contractPreview); } catch {}
      }
    };
  }, [contractPreview]);

  useEffect(() => {
    try{
      const saved = localStorage.getItem('cochin_theme') as Theme | null;
      if (saved === 'day' || saved === 'night') setTheme(saved);
    } catch {}
  }, []);
  useEffect(() => { try{ localStorage.setItem('cochin_theme', theme); } catch{} }, [theme]);

  useEffect(() => {
    const lineTimer = setTimeout(() => setLoadingLine(true), 80);
    const ms = isMobile ? 700 : 1200;
    const timer = setTimeout(() => setIsLoading(false), ms);
    return () => { clearTimeout(timer); clearTimeout(lineTimer); };
  }, [isMobile]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? (y / docH) * 100 : 0;
      setScrollProgress(p);
      setHeaderScrolled(y > 10);
      if (isMobile) setHeaderVisible(true);
      else {
        if (y > 120) {
          if (y > lastScrollY.current && y - lastScrollY.current > 12) setHeaderVisible(false);
          else if (y < lastScrollY.current - 12) setHeaderVisible(true);
        } else setHeaderVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setHeroVisible(entry.isIntersecting);
        if (!entry.isIntersecting) videoRefs.current.forEach(v => v?.pause());
        else { const current = videoRefs.current[currentSlide]; current?.play().catch(()=>{}); }
      });
    }, { threshold: 0.1 });
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, [currentSlide]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRefs.current.forEach(v => v?.pause());
        if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
        if (autoPlayRef.current) window.clearTimeout(autoPlayRef.current);
      } else { if (heroVisible) videoRefs.current[currentSlide]?.play().catch(()=>{}); }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [currentSlide, heroVisible]);

  const goToSlide = useCallback((idx: number) => {
    const total = slides.length;
    const next = ((idx % total) + total) % total;
    setCurrentSlide(next);
    setProgress(0);
  }, [slides.length]);
  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    if (autoPlayRef.current) window.clearTimeout(autoPlayRef.current);
    setProgress(0);
    if (!heroVisible) return;
    const step = 100 / (6000 / 50);
    progressIntervalRef.current = window.setInterval(() => { setProgress(p => { const nxt = p + step; return nxt > 100 ? 100 : nxt; }); }, 50) as unknown as number;
    autoPlayRef.current = window.setTimeout(() => { nextSlide(); }, 6000) as unknown as number;
    return () => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current as any);
      if (autoPlayRef.current) window.clearTimeout(autoPlayRef.current as any);
    };
  }, [currentSlide, nextSlide, heroVisible]);

  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === currentSlide && heroVisible) v.play().catch(()=>{});
      else v.pause();
    });
  }, [currentSlide, heroVisible]);

  useEffect(() => { setActiveTab(lang === 'ar' ? 'الكل' : 'All'); }, [lang]);

  useEffect(() => {
    async function loadRecords() {
      try {
        const b = await callAction("records.list", { collection: "bookings", limit: 100 });
        const m = await callAction("records.list", { collection: "maintenance_requests", limit: 100 });
        setBookings((b as any).records || []);
        setMaintList((m as any).records || []);
      } catch (e) { setLoadError(e instanceof Error ? e.message : String(e)); }
    }
    loadRecords();
  }, []);

  const scrollTo = (ref: any) => {
    if (pageMode !== 'full') {
      navigatePage('full');
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    } else ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  };

  const filteredPortfolio = portfolioItems.filter(item => item.cat.includes(activeTab));

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busyBooking) return;
    setBusyBooking(true);
    const idempotency_key = `booking-${bookingForm.phone}-${Date.now()}`;
    try {
      const value = { name: bookingForm.name, phone: bookingForm.phone, city: bookingForm.city, branch: bookingForm.branch, service: bookingForm.service, budget: t.budgets[budget], notes: bookingForm.notes, date: bookingForm.date, lang, created_at_text: new Date().toISOString(), pageLink: getShareableUrl('booking') };
      const created = await callAction("records.create", { collection: "bookings", value, idempotency_key });
      setBookings(prev => [created as any, ...prev]);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 6000);
      setBookingForm({ name: '', phone: '', city: 'جدة', branch: 'صاري', service: 'مطابخ', notes: '', date: '' });
      const msg = `حجز موعد كوشن\nالاسم: ${value.name}\nالجوال: ${value.phone}\nالمدينة: ${value.city}\nالفرع: ${value.branch}\nالخدمة: ${value.service}\nالميزانية: ${value.budget}\nالتاريخ: ${value.date}\nملاحظات: ${value.notes}\nرابط الحجز: ${getShareableUrl('booking')}`;
      window.open(`${SOCIAL_URLS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    } catch (err) { alert(err instanceof Error ? err.message : String(err)); } finally { setBusyBooking(false); }
  };

  const handleMaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busyMaint) return;
    setBusyMaint(true);
    const ticket = Math.floor(1000 + Math.random() * 9000).toString();
    const idempotency_key = `maint-${maintForm.phone}-${Date.now()}`;
    try {
      const attachmentInfo = contractFile ? { name: contractFile.name, size: contractFile.size, type: contractFile.type, sizeFormatted: contractFile.size < 1024*1024 ? `${Math.round(contractFile.size/1024)} KB` : `${(contractFile.size/1024/1024).toFixed(2)} MB` } : null;
      const value = { name: maintForm.name, phone: maintForm.phone, orderNo: maintForm.orderNo, issue: maintForm.issue, desc: maintForm.desc, address: maintForm.address, hasContractSkip: maintForm.hasContractSkip, ticketNo: `CS-${ticket}`, lang, created_at_text: new Date().toISOString(), attachmentName: attachmentInfo?.name || null, attachmentSize: attachmentInfo?.size || null, attachmentType: attachmentInfo?.type || null, attachmentFormatted: attachmentInfo?.sizeFormatted || null, pageLink: getShareableUrl('maintenance') };
      const created = await callAction("records.create", { collection: "maintenance_requests", value, idempotency_key });
      setMaintList(prev => [created as any, ...prev]);
      setMaintSuccess(ticket);
      setTimeout(() => setMaintSuccess(null), 6000);
      setMaintForm({ name: '', phone: '', orderNo: '', issue: 'مفصلات', desc: '', address: '', hasContractSkip: true });
      removeContractFile();
      const fileNote = attachmentInfo ? (lang==='ar' ? `\nمرفق عقد: ${attachmentInfo.name} (${attachmentInfo.sizeFormatted}) - سيتم إرسال الصورة عبر واتساب بشكل منفصل` : `\nContract attached: ${attachmentInfo.name} (${attachmentInfo.sizeFormatted}) - will be sent separately via WhatsApp`) : (lang==='ar' ? '\nبدون مرفق عقد' : '\nNo contract attachment');
      const msg = `طلب صيانة كوشن\nالاسم: ${value.name}\nالجوال: ${value.phone}\nرقم الطلب: ${value.orderNo}\nالمشكلة: ${value.issue}\nالوصف: ${value.desc}\nالعنوان: ${value.address}\nرقم التذكرة: ${value.ticketNo}${fileNote}\nرابط الصيانة: ${getShareableUrl('maintenance')}`;
      window.open(`${SOCIAL_URLS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    } catch (err) { alert(err instanceof Error ? err.message : String(err)); } finally { setBusyMaint(false); }
  };

  const fontFamily = lang === 'ar' ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif";
  const magneticBook = useMagnetic(0.18);
  const magneticMaint = useMagnetic(0.18);
  const magneticBookMobile = useMagnetic(0.18);
  const magneticMaintMobile = useMagnetic(0.18);
  const themeBg = isDay ? 'bg-[#FAFAFA]' : 'bg-black';
  const themeText = isDay ? 'text-black' : 'text-white';

  return (
    <div data-safe-area-inset-root className={`min-h-screen selection:bg-[#D4AF37] selection:text-black w-full max-w-full overflow-x-clip ${lang === 'ar' ? 'font-ar' : 'font-en'} theme-root ${themeBg} ${themeText}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)', fontFamily, transition: 'background-color 0.4s ease, color 0.4s ease', backgroundColor: isDay ? '#FFFFFF' : '#000000'}} data-theme={isDay ? 'light' : 'dark'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        :root { --bg-color: ${isDay ? '#FFFFFF' : '#000000'}; --text-color: ${isDay ? '#000000' : '#FFFFFF'}; }
        [data-theme="light"] { --bg-color: #FFFFFF; --text-color: #000000; }
        [data-theme="dark"] { --bg-color: #000000; --text-color: #FFFFFF; }
        html { scroll-behavior: smooth; } * { box-sizing: border-box; }
        body { background: var(--bg-color) !important; color: var(--text-color) !important; min-height: 100vh !important; margin: 0; }
        #booking-standalone-page, #maintenance-standalone-page { background: var(--bg-color); color: var(--text-color); display: none; visibility: hidden; opacity: 0; transition: opacity 0.3s ease; min-height: 100vh; width: 100%; box-sizing: border-box; }
        #booking-standalone-page[style*="display: block"], #maintenance-standalone-page[style*="display: block"] { visibility: visible; opacity: 1; }
        .gold-gradient { background: linear-gradient(135deg, #D4AF37 0%, #C9A86A 50%, #B8960C 100%); }
        .gold-text { background: linear-gradient(135deg, #D4AF37, #F5E6B8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .gold-text-day { background: linear-gradient(135deg, #B8941F, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${isDay ? '#FAFAFA' : '#000'}; } ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 3px; }
        html, body { overflow-x: clip; max-width: 100%; } body { overflow-x: clip; }
        .headline-strong { font-family: ${fontFamily}; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; font-size: 28px; } @media (min-width: 768px) { .headline-strong { font-size: 48px; } }
        .label-gold { font-family: ${fontFamily}; font-weight: 300; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #D4AF37; }
        .slide-fade { transition: opacity 1s cubic-bezier(0.16,1,0.3,1); }
        @keyframes kenBurns { 0% { transform: scale3d(1,1,1) translate3d(0,0,0); } 100% { transform: scale3d(1.15,1.15,1.15) translate3d(-1.5%, -1%,0); } }
        @keyframes kenBurnsMobile { 0% { transform: scale3d(1,1,1) translate3d(0,0,0); } 100% { transform: scale3d(1.08,1.08,1.08) translate3d(-1%, -0.5%,0); } }
        .ken-burns-active { animation: kenBurns 12s cubic-bezier(0.25,0.46,0.45,0.94) forwards; will-change: transform; backface-visibility: hidden; }
        .ken-burns-mobile { animation: kenBurnsMobile 8s cubic-bezier(0.25,0.46,0.45,0.94) forwards; will-change: transform; backface-visibility: hidden; }
        @keyframes shimmerMove { 0% { transform: translateX(-120%); } 100% { transform: translateX(220%); } }
        .btn-shimmer { position: relative; overflow: hidden; will-change: transform; backface-visibility: hidden; }
        .btn-shimmer::after { content:''; position:absolute; top:0; left:0; width:45%; height:100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent); transform: translateX(-120%); transition: transform 0.6s; }
        .btn-shimmer:hover::after { animation: shimmerMove 0.9s ease; }
        @keyframes goldPulse { 0%,100% { box-shadow: 0 0 20px rgba(212,175,55,0.25), 0 0 0 rgba(212,175,55,0); } 50% { box-shadow: 0 0 35px rgba(212,175,55,0.45), 0 0 20px rgba(212,175,55,0.15); } }
        @keyframes goldPulseMobile { 0%,100% { box-shadow: 0 0 12px rgba(212,175,55,0.12); } 50% { box-shadow: 0 0 22px rgba(212,175,55,0.22); } }
        .gold-pulse { animation: goldPulse 2.8s ease-in-out infinite; } @media (max-width: 767px) { .gold-pulse { animation: goldPulseMobile 3.5s ease-in-out infinite; } }
        @keyframes dotPulse { 0%,100% { transform: scale3d(1,1,1); } 50% { transform: scale3d(1.25,1.25,1); } } .dot-active { animation: dotPulse 1.8s ease-in-out infinite; }
        @keyframes logoGlow { 0%,100% { filter: drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale3d(1,1,1); } 50% { filter: drop-shadow(0 0 22px rgba(212,175,55,0.6)); transform: scale3d(1.03,1.03,1); } }
        .card-lift { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease, border-color 0.5s ease, background-color 0.4s ease; will-change: transform; backface-visibility: hidden; }
        .card-lift:hover { transform: translate3d(0,-8px,0) scale3d(1.02,1.02,1.02); box-shadow: 0 24px 48px rgba(212,175,55,0.20), 0 0 0 1px rgba(212,175,55,0.2); }
        .card-lift:active { transform: scale3d(0.98,0.98,0.98) translate3d(0,0,0); transition-duration: 0.15s; }
        @media (max-width: 767px) { .card-lift:hover { transform: none; box-shadow: none; } .card-lift:active { transform: scale3d(0.98,0.98,0.98); box-shadow: 0 8px 20px rgba(212,175,55,0.15); } }
        .img-parallax { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .group:hover .img-parallax { transform: scale3d(1.08,1.08,1.08); }
        .will-change-transform { will-change: transform; backface-visibility: hidden; }
        .gold-touch-ripple { position: absolute; width: 20px; height: 20px; margin-left: -10px; margin-top: -10px; background: radial-gradient(circle, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0) 70%); border-radius: 50%; pointer-events: none; transform: scale(0); animation: goldRippleExpand 0.6s ease-out forwards; z-index: 10; }
        @keyframes goldRippleExpand { 0% { transform: scale(0); opacity: 0.8; } 100% { transform: scale(12); opacity: 0; } }
        @keyframes fadeInUp { from { opacity:0; transform: translate3d(0,20px,0); } to { opacity:1; transform: translate3d(0,0,0); } }
        .tabs-scroll { -webkit-overflow-scrolling: touch; scrollbar-width: none; } .tabs-scroll::-webkit-scrollbar { display: none; }
        .section-shell { width: 100%; max-width: 100%; overflow-x: clip; box-sizing: border-box; transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease; }
        .dot-touch { min-width: 44px; min-height: 44px; display:flex; align-items:center; justify-content:center; } @media (min-width: 768px) { .dot-touch { min-width: auto; min-height: auto; } }
      `}</style>

      <CustomCursor />
      <div className="fixed top-0 left-0 w-full z-[200] pointer-events-none bg-transparent" style={{ top: 'var(--safe-area-inset-top, 0px)', height: '2px' }}>
        <div className="h-full gold-gradient will-change-transform" style={{ width: `${scrollProgress}%`, transition: 'width 0.12s linear', boxShadow: '0 0 8px rgba(212,175,55,0.6)', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
      </div>

      <div className={`fixed inset-0 z-[300] ${isDay ? 'bg-[#FAFAFA]' : 'bg-black'} flex flex-col items-center justify-center transition-all duration-[700ms] cubic-bezier(0.16,1,0.3,1) ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <img src={logoUrl} alt="Cochin" className={`h-[86px] w-auto object-contain will-change-transform ${isLoading ? '' : 'scale-110'} ${isDay ? 'brightness-0' : 'brightness-110 contrast-110'}`} style={{ animation: 'logoGlow 2s ease-in-out infinite', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
          </div>
          <div className={`mt-8 w-[140px] h-[1px] overflow-hidden relative ${isDay ? 'bg-black/10' : 'bg-white/10'}`}>
            <div className="absolute inset-0 h-full gold-gradient origin-left will-change-transform" style={{ transform: loadingLine ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)', transformOrigin: 'left', backfaceVisibility: 'hidden' }} />
          </div>
          <div className="mt-4 text-[10px] tracking-[0.45em] text-[#D4AF37] font-bold overflow-hidden" style={{fontFamily}}>
            <span className="inline-block" style={{ transform: isLoading ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', opacity: isLoading ? 1 : 0 }}>COCHIN SA • GERMAN QUALITY</span>
          </div>
        </div>
      </div>

      {/* MAIN SITE WRAPPER - FORMS REMOVED, ONLY CTA CARDS */}
      <div id="main-site" style={{ display: pageMode === 'full' ? 'block' : 'none', width: '100%', minHeight: '100vh', background: isDay ? '#FFFFFF' : '#000000' }}>
        <header data-safe-area-sticky-top className={`fixed w-full z-50 border-b flex items-center ease-[cubic-bezier(0.16,1,0.3,1)] ${headerVisible ? 'translate-y-0' : '-translate-y-full'} will-change-transform ${isDay ? 'border-[#D4AF37]/30' : 'border-[#D4AF37]/20'} ${headerScrolled ? (isDay ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)]' : 'bg-black/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]') : (isDay ? 'bg-white' : 'bg-black')}`} style={{ top: 'var(--safe-area-inset-top)', height: isMobile ? '64px' : '90px', transform: `translate3d(0,${headerVisible ? 0 : '-100%'},0)`, backfaceVisibility: 'hidden', transitionProperty: 'transform, background-color, backdrop-filter, border-color', transitionDuration: '500ms, 400ms, 300ms, 400ms' }}>
          <div className="w-full max-w-[1600px] mx-auto px-5 md:px-8 flex items-center justify-between h-full">
            <div className={`flex items-center ${lang === 'ar' ? 'order-1' : 'order-3'}`}>
              <img src={logoUrl} alt="Cochin SA" className={`w-auto object-contain transition-all duration-500 hover:scale-[1.03] will-change-transform ${isDay ? 'brightness-0' : 'brightness-110 contrast-110'}`} style={{ height: isMobile ? '48px' : '72px', maxWidth: isMobile ? '120px' : 'none', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
            </div>
            <nav className={`hidden lg:flex items-center gap-10 ${lang === 'ar' ? 'order-2' : 'order-2'}`}>
              <button onClick={() => scrollTo(portfolioRef)} className={`text-[13px] font-medium tracking-[0.15em] transition-colors uppercase relative group min-h-[44px] will-change-transform ${isDay ? 'text-black/70 hover:text-[#B8941F]' : 'text-white/80 hover:text-[#D4AF37]'}`} style={{fontFamily, fontWeight: 500}}>{t.portfolio}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" /></button>
              <button onClick={() => scrollTo(branchesRef)} className={`text-[13px] font-medium tracking-[0.15em] transition-colors uppercase relative group min-h-[44px] ${isDay ? 'text-black/70 hover:text-[#B8941F]' : 'text-white/80 hover:text-[#D4AF37]'}`} style={{fontFamily, fontWeight: 500}}>{t.branches}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" /></button>
              <button onClick={() => scrollTo(germanRef)} className="text-[13px] font-bold tracking-[0.15em] text-[#D4AF37] hover:text-[#B8941F] transition-colors uppercase relative group min-h-[44px]" style={{fontFamily, fontWeight: 700}}>{t.german}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" /></button>
              <button onClick={() => scrollTo(partnersRef)} className={`text-[13px] font-medium tracking-[0.15em] transition-colors uppercase relative group min-h-[44px] ${isDay ? 'text-black/70 hover:text-[#B8941F]' : 'text-white/80 hover:text-[#D4AF37]'}`} style={{fontFamily, fontWeight: 500}}>{t.partners}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" /></button>
            </nav>
            <div className={`flex items-center gap-2 md:gap-3 ${lang === 'ar' ? 'order-3' : 'order-1'}`}>
              <button onClick={(e)=>{ addGoldRipple(e); setLang(lang === 'ar' ? 'en' : 'ar'); }} className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border flex items-center justify-center text-[11px] tracking-widest hover:scale-105 transition-all will-change-transform relative overflow-hidden ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`} style={{fontFamily, fontWeight: 700, transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden'}}>{lang === 'ar' ? 'EN' : 'AR'}</button>
              <button onClick={(e)=>{ addGoldRipple(e as any); setTheme(isDay ? 'night' : 'day'); }} aria-label={`Switch to ${isDay ? 'night' : 'day'} mode`} className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border flex items-center justify-center hover:scale-105 transition-all duration-500 will-change-transform relative overflow-hidden group ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shadow-[0_0_12px_rgba(212,175,55,0.15)]'}`} style={{transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden'}}>
                <span style={{ display: 'inline-flex' }}>{isDay ? <SunIcon size={18} /> : <MoonIcon size={18} />}</span>
              </button>
              <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 gold-pulse will-change-transform relative overflow-hidden ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'}`} style={{transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden'}} onClick={addGoldRipple as any}>
                <WhatsAppIconLux size={18} />
              </a>
              <button ref={magneticBook} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('booking'); }} className="hidden lg:flex h-[40px] min-h-[44px] px-[32px] gold-gradient text-black text-[14px] font-bold tracking-wider rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] items-center gap-2 btn-shimmer will-change-transform relative overflow-hidden" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">◐</span>{t.book}
              </button>
              <button ref={magneticMaint} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('maintenance'); }} className="hidden lg:flex h-[40px] min-h-[44px] px-[32px] gold-gradient text-black text-[14px] font-bold tracking-wider rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] items-center gap-2 btn-shimmer will-change-transform relative overflow-hidden" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">⚙</span>{t.maintenance}
              </button>
              <button onClick={(e)=>{ addGoldRipple(e as any); setMobileMenu(!mobileMenu); }} className={`lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5 border rounded-full transition-colors will-change-transform relative overflow-hidden ${isDay ? 'border-[#D4AF37] bg-white hover:bg-[#D4AF37]/10' : 'border-[#D4AF37] bg-black hover:bg-[#D4AF37]/10'}`} style={{transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden'}}>
                <span className={`block w-4 h-[1.5px] bg-[#D4AF37] transition-all will-change-transform ${mobileMenu ? 'rotate-45 translate-y-[3px]' : ''}`} style={{ transform: mobileMenu ? 'translate3d(0,3px,0) rotate(45deg)' : 'translate3d(0,0,0)' }} />
                <span className={`block w-4 h-[1.5px] bg-[#D4AF37] transition-all ${mobileMenu ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-4 h-[1.5px] bg-[#D4AF37] transition-all will-change-transform ${mobileMenu ? '-rotate-45 -translate-y-[3px]' : ''}`} style={{ transform: mobileMenu ? 'translate3d(0,-3px,0) rotate(-45deg)' : 'translate3d(0,0,0)' }} />
              </button>
            </div>
          </div>
          {mobileMenu && (
            <div className={`lg:hidden absolute top-[64px] left-0 w-full backdrop-blur-xl border-b p-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto will-change-transform ${isDay ? 'bg-white/95 border-[#D4AF37]/30' : 'bg-black/95 border-[#D4AF37]/30'}`} style={{ transform: 'translate3d(0,0,0)', animation: 'fadeInUp 0.35s ease', backfaceVisibility: 'hidden' }}>
              <button onClick={(e)=>{ addGoldRipple(e as any); scrollTo(portfolioRef); }} className={`text-right md:text-left py-3 border-b text-[15px] font-medium tracking-wide min-h-[44px] relative overflow-hidden ${isDay ? 'text-black/80 border-black/10' : 'text-white/90 border-white/10'}`} style={{fontFamily}}>{t.portfolio}</button>
              <button onClick={(e)=>{ addGoldRipple(e as any); scrollTo(branchesRef); }} className={`text-right md:text-left py-3 border-b text-[15px] font-medium tracking-wide min-h-[44px] relative overflow-hidden ${isDay ? 'text-black/80 border-black/10' : 'text-white/90 border-white/10'}`} style={{fontFamily}}>{t.branches}</button>
              <button onClick={(e)=>{ addGoldRipple(e as any); scrollTo(germanRef); }} className="text-right md:text-left text-[#D4AF37] py-3 border-b border-white/10 text-[15px] font-bold tracking-wide min-h-[44px] relative overflow-hidden" style={{fontFamily}}>{t.german}</button>
              <button onClick={(e)=>{ addGoldRipple(e as any); scrollTo(partnersRef); }} className={`text-right md:text-left py-3 border-b text-[15px] font-medium tracking-wide min-h-[44px] relative overflow-hidden ${isDay ? 'text-black/80 border-black/10' : 'text-white/90 border-white/10'}`} style={{fontFamily}}>{t.partners}</button>
              <div className="flex items-center justify-between pt-2">
                <span className={`text-[12px] tracking-[0.2em] font-bold ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{isDay ? t.dayMode : t.nightMode} MODE</span>
                <div className="flex gap-2">
                  <button onClick={(e)=>{ addGoldRipple(e as any); setTheme(isDay ? 'night' : 'day'); }} className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}>
                    {isDay ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                  </button>
                  <button onClick={(e)=>{ addGoldRipple(e as any); setLang(lang === 'ar' ? 'en' : 'ar'); }} className={`w-11 h-11 rounded-full border flex items-center justify-center text-[11px] font-bold ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`} style={{fontFamily}}>{lang === 'ar' ? 'EN' : 'AR'}</button>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <button ref={magneticBookMobile} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('booking'); }} className="w-full h-[48px] min-h-[48px] gold-gradient text-black rounded-full text-[14px] font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] btn-shimmer will-change-transform relative overflow-hidden" style={{fontFamily}}><span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">◐</span>{t.book}</button>
                <button ref={magneticMaintMobile} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('maintenance'); }} className="w-full h-[48px] min-h-[48px] gold-gradient text-black rounded-full text-[14px] font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] btn-shimmer will-change-transform relative overflow-hidden" style={{fontFamily}}><span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">⚙</span>{t.maintenance}</button>
                <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" className={`w-full h-[48px] min-h-[48px] flex items-center justify-center gap-3 border rounded-full text-[14px] font-medium tracking-wider transition-all will-change-transform relative overflow-hidden ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`} style={{fontFamily}} onClick={addGoldRipple as any}><span className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border ${isDay ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30' : 'bg-[#D4AF37]/15 border-[#D4AF37]/30'}`}><WhatsAppIconLux size={16} /></span>WhatsApp • واتساب</a>
              </div>
            </div>
          )}
        </header>

        <section ref={heroRef} className="relative w-full overflow-hidden touch-pan-y select-none section-shell" style={{height: '100vh'}}>
          <div className="absolute inset-0 w-full h-full">
            {slides.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <div key={idx} className={`absolute inset-0 w-full h-full slide-fade ${isActive ? 'opacity-100 z-[2]' : 'opacity-0 z-[1] pointer-events-none'}`}>
                  <video ref={el => { videoRefs.current[idx] = el; }} src={slide.src} muted loop playsInline preload={idx === 0 ? "auto" : "metadata"} className={`absolute inset-0 w-full h-full object-cover will-change-transform ${isActive ? (isMobile ? 'ken-burns-mobile' : 'ken-burns-active') : ''}`} style={{ transformOrigin: 'center center', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
                  <div className="absolute inset-0 transition-colors duration-500" style={{background: isDay ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.6)'}} />
                  <div className="absolute inset-0 transition-colors duration-500" style={{background: isDay ? 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)'}} />
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-28 px-5 md:px-16 text-center" style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                    <div className="w-10 h-[1px] bg-[#D4AF37] mb-6 md:mb-7 shadow-[0_0_8px_rgba(212,175,55,0.6)] will-change-transform" style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translate3d(0,0,0) scaleX(1)' : 'translate3d(0,10px,0) scaleX(0)', transition: `opacity ${isMobile ? 0.6 : 0.8}s ease ${isMobile ? 0.1 : 0.2}s, transform ${isMobile ? 0.6 : 0.8}s cubic-bezier(0.16,1,0.3,1) ${isMobile ? 0.1 : 0.2}s`, backfaceVisibility: 'hidden' }} />
                    <h1 className="mb-4 max-w-[95%] md:max-w-4xl will-change-transform" style={{ fontFamily, fontWeight: 700, fontSize: isMobile ? '32px' : '48px', lineHeight: '1.1', color: '#FFFFFF', textShadow: '0 2px 30px rgba(0,0,0,0.8)', opacity: isActive ? 1 : 0, transform: isActive ? `translate3d(0,0,0)` : `translate3d(0,20px,0)`, transition: `opacity ${isMobile ? 0.6 : 0.9}s ease ${isMobile ? 0.2 : 0.3}s, transform ${isMobile ? 0.6 : 0.9}s cubic-bezier(0.16,1,0.3,1) ${isMobile ? 0.2 : 0.3}s`, backfaceVisibility: 'hidden' }}>{slide.title}</h1>
                    <p className="font-medium max-w-[90%] md:max-w-3xl mb-8 md:mb-10 leading-relaxed will-change-transform" style={{ fontFamily, fontWeight: 400, fontSize: isMobile ? '14px' : '15px', letterSpacing: isMobile ? '0.05em' : '0.2em', color: 'rgba(255,255,255,0.85)', opacity: isActive ? 1 : 0, transform: isActive ? 'translate3d(0,0,0)' : `translate3d(0,16px,0)`, transition: `opacity ${isMobile ? 0.6 : 0.9}s ease ${isMobile ? 0.35 : 0.5}s, transform ${isMobile ? 0.6 : 0.9}s cubic-bezier(0.16,1,0.3,1) ${isMobile ? 0.35 : 0.5}s`, backfaceVisibility: 'hidden' }}>{slide.sub}</p>
                    <button onClick={(e)=>{ addGoldRipple(e as any); scrollTo(portfolioRef); }} className="min-h-[44px] backdrop-blur-sm border border-[#D4AF37] tracking-[0.15em] font-bold rounded-full transition-all flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)] btn-shimmer will-change-transform relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] bg-black/60 text-white hover:bg-[#D4AF37]/15 hover:text-[#D4AF37]" style={{ fontFamily, height: '48px', width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? '320px' : 'none', paddingLeft: isMobile ? '20px' : '48px', paddingRight: isMobile ? '20px' : '48px', fontSize: '13px', opacity: isActive ? 1 : 0, transform: isActive ? 'translate3d(0,0,0)' : `translate3d(0,12px,0)`, transition: `opacity ${isMobile ? 0.6 : 0.8}s ease ${isMobile ? 0.5 : 0.7}s, transform ${isMobile ? 0.6 : 0.8}s cubic-bezier(0.16,1,0.3,1) ${isMobile ? 0.5 : 0.7}s`, backfaceVisibility: 'hidden' }}>{slide.cta}</button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-white/10 z-[20] will-change-transform" style={{ height: '2px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}><div className="h-full gold-gradient will-change-transform" style={{ width: `${progress}%`, transition: 'width 0.05s linear', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} /></div>
          <div className="absolute top-20 md:top-24 right-5 md:right-8 z-[20] flex items-center gap-3"><div className="w-8 h-[1px] bg-[#D4AF37]/50 hidden md:block" /><span className="text-[12px] tracking-[0.3em] text-[#D4AF37] font-bold" style={{fontFamily}}>{String(currentSlide + 1).padStart(2, '0')} / 0{slides.length}</span></div>
          <div className="absolute bottom-10 md:bottom-10 left-1/2 -translate-x-1/2 z-[20] flex items-center gap-1 md:gap-2">{slides.map((_, idx) => (<button key={idx} onClick={(e)=>{ addGoldRipple(e as any); goToSlide(idx); }} aria-label={`Go to slide ${idx + 1}`} className={`dot-touch rounded-full will-change-transform relative overflow-hidden`}><span className={`rounded-full transition-all duration-500 block will-change-transform ${currentSlide === idx ? 'bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)] dot-active' : 'bg-white/40 hover:bg-white/70 border border-white/20'}`} style={{ width: currentSlide === idx ? '28px' : '12px', height: '12px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} /></button>))}</div>
          <button onClick={(e)=>{ addGoldRipple(e as any); prevSlide(); }} aria-label="Previous slide" className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-[20] w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 hover:scale-110 active:scale-95 will-change-transform overflow-hidden box-border"><span className="text-[18px]">‹</span></button>
          <button onClick={(e)=>{ addGoldRipple(e as any); nextSlide(); }} aria-label="Next slide" className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-[20] w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 hover:scale-110 active:scale-95 will-change-transform overflow-hidden box-border"><span className="text-[18px]">›</span></button>
        </section>

        <section ref={germanRef} className={`py-10 md:py-28 border-t section-shell ${isDay ? 'bg-white border-[#D4AF37]/20' : 'bg-[#0A0A0A] border-[#D4AF37]/10'}`}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full box-border">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Reveal delay={0.08} threshold={0.12} className="flex items-center gap-4 mb-6"><GoldLine width={40} delay={0.15} /><span className="label-gold" style={{fontFamily, fontSize: '12px'}}>{t.germanSectionSub}</span><GoldLine width={40} delay={0.15} /></Reveal>
              <HeadlineReveal delay={0.15} threshold={0.12}><h2 className={`headline-strong mb-5 px-2 leading-tight text-center ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily, fontSize: isMobile ? '28px' : '48px'}}>{t.germanSectionTitle}</h2></HeadlineReveal>
              <Reveal delay={0.22} threshold={0.12}><p className={`body-regular max-w-3xl tracking-wide px-2 text-center ${isDay ? 'text-black/70' : 'text-white/65'}`} style={{fontFamily, fontSize: '14px'}}>{t.germanDesc}</p></Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16 w-full">
              {t.germanCards.map((card: any, i: number) => {
                const tiltRef = useTilt();
                return (
                  <Reveal key={i} delay={0.08 + i * 0.08} threshold={0.12} withScale className="h-full w-full">
                    <div ref={tiltRef} onClick={addGoldRipple as any} className={`group overflow-hidden w-full h-full card-lift will-change-transform relative border hover:border-[#D4AF37]/40 transition-all duration-700 ${isDay ? 'bg-white border-[#D4AF37]/20 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'bg-black border-[#D4AF37]/15'}`} style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                      <div className="h-[240px] md:h-[260px] overflow-hidden relative w-full">
                        <div className="w-full h-full bg-cover bg-center img-parallax will-change-transform" style={{ backgroundImage: `url(${germanImages[i]})`, transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} role="img" aria-label={card.title} />
                        <div className={`absolute inset-0 transition-all ${isDay ? 'bg-white/10 group-hover:bg-white/0' : 'bg-black/20 group-hover:bg-black/10'}`} />
                        <div className={`absolute top-4 left-4 px-3 py-1 border text-[10px] tracking-[0.2em] font-bold will-change-transform ${isDay ? 'bg-white/90 border-[#D4AF37]/40 text-[#B8941F]' : 'bg-black/80 border-[#D4AF37]/40 text-[#D4AF37]'}`} style={{fontFamily, fontWeight: 600, transform: 'translate3d(0,0,0)'}}>{card.stat}</div>
                      </div>
                      <div className="p-5 md:p-7">
                        <div className="flex items-center gap-3 mb-3"><GoldLine width={24} delay={0.3 + i*0.08} /><span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold" style={{fontFamily}}>{card.sub}</span></div>
                        <h3 className={`text-[18px] md:text-[19px] font-bold tracking-wide mb-3 ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily}}>{card.title}</h3>
                        <p className={`text-[13px] font-normal leading-[1.8] tracking-wide ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{card.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.2} threshold={0.12} withScale>
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-px border w-full ${isDay ? 'bg-[#D4AF37]/20 border-[#D4AF37]/20' : 'bg-[#D4AF37]/20 border-[#D4AF37]/20'}`}>
                {t.stats.map((s: any, i: number) => (
                  <div key={i} className={`py-7 md:py-10 text-center px-1 group transition-colors will-change-transform ${isDay ? 'bg-white hover:bg-[#FAFAFA]' : 'bg-black hover:bg-[#0A0A0A]'}`} style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                    <div className="text-[20px] md:text-[28px] font-bold text-[#D4AF37] tracking-wide mb-2 group-hover:scale-105 transition-transform duration-300 will-change-transform" style={{fontFamily, backfaceVisibility: 'hidden'}}>
                      {s.target > 0 ? <CountUp target={s.target} suffix={s.suffix} className="inline" duration={1100} /> : s.n}
                      {s.target === 0 && <span>{s.n}{s.suffix}</span>}
                    </div>
                    <div className={`text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium ${isDay ? 'text-black/50' : 'text-white/50'}`} style={{fontFamily}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`border-y py-5 md:py-8 relative overflow-hidden gold-pulse will-change-transform section-shell ${isDay ? 'bg-white border-[#D4AF37]/30' : 'bg-black border-[#D4AF37]/30'}`} style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(circle at center, #D4AF37 0%, transparent 70%)' }} />
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center relative w-full box-border">
            <Reveal delay={0.08} threshold={0.12} className="flex items-center gap-3"><GoldLine width={24} className="hidden md:block" /><span className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#D4AF37] font-bold" style={{fontFamily}}>{t.warrantyBanner}</span><GoldLine width={24} className="hidden md:block" /></Reveal>
            <div className={`flex items-center gap-2 text-[9px] tracking-[0.25em] font-medium ${isDay ? 'text-black/30' : 'text-white/30'}`} style={{fontFamily}}><span className="w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" /><span>GERMAN STANDARDS</span></div>
          </div>
        </section>

        {/* LUXURY CTA CARDS - NO FORMS, ONLY LINKS TO STANDALONE PAGES */}
        <section className={`py-10 md:py-16 border-y section-shell ${isDay ? 'bg-[#FAFAFA] border-[#D4AF37]/15' : 'bg-black border-[#D4AF37]/10'}`}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full box-border">
            <Reveal delay={0.08} threshold={0.12} withScale>
              <div className={`group relative overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.1)] w-full card-lift gold-pulse will-change-transform border-[2px] border-[#D4AF37] ${isDay ? 'bg-white' : 'bg-[#0A0A0A]'}`} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('booking'); }} style={{ height: isMobile ? '200px' : '320px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 img-parallax will-change-transform" style={{ backgroundImage: `url(${img2})`, transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
                <div className={`absolute inset-0 ${isDay ? 'bg-gradient-to-t from-white via-white/60 to-transparent' : 'bg-gradient-to-t from-black via-black/60 to-transparent'}`} />
                <div className="relative h-full p-6 md:p-10 flex flex-col justify-between">
                  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}><span className="text-black text-xl">◐</span></div>
                  <div>
                    <h3 className={`text-[22px] md:text-[28px] font-bold tracking-wide mb-2 transition-colors duration-300 ${isDay ? 'text-black group-hover:text-[#B8941F]' : 'text-white group-hover:text-[#D4AF37]'}`} style={{fontFamily}}>{t.ctaBookHeading}</h3>
                    <p className={`text-[12px] md:text-[13px] tracking-[0.15em] mb-3 font-medium ${isDay ? 'text-black/60' : 'text-white/70'}`} style={{fontFamily}}>{t.prominentBookDesc}</p>
                    <div className="h-[44px] min-h-[44px] px-[28px] md:px-[32px] gold-gradient inline-flex items-center text-black text-[12px] md:text-[13px] font-bold tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] btn-shimmer group-hover:scale-[1.03] transition-transform will-change-transform relative overflow-hidden" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>{t.bookNow}</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16} threshold={0.12} withScale>
              <div className={`group relative overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.1)] w-full card-lift will-change-transform border-[2px] border-[#D4AF37] ${isDay ? 'bg-white' : 'bg-[#0A0A0A]'}`} onClick={(e)=>{ addGoldRipple(e as any); navigatePage('maintenance'); }} style={{ height: isMobile ? '200px' : '320px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 img-parallax will-change-transform" style={{ backgroundImage: `url(${img4})`, transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
                <div className={`absolute inset-0 ${isDay ? 'bg-gradient-to-t from-white via-white/80 to-transparent' : 'bg-gradient-to-t from-black via-black/80 to-transparent'}`} />
                <div className="relative h-full p-6 md:p-10 flex flex-col justify-between">
                  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}><span className="text-black text-xl">⚙</span></div>
                  <div>
                    <h3 className={`text-[22px] md:text-[28px] font-bold tracking-wide mb-2 transition-colors duration-300 ${isDay ? 'text-black group-hover:text-[#B8941F]' : 'text-white group-hover:text-[#D4AF37]'}`} style={{fontFamily}}>{t.ctaMaintHeading}</h3>
                    <p className={`text-[12px] md:text-[13px] tracking-[0.15em] mb-3 font-medium ${isDay ? 'text-black/60' : 'text-white/70'}`} style={{fontFamily}}>{t.prominentMaintDesc}</p>
                    <div className="h-[44px] min-h-[44px] px-[28px] md:px-[32px] gold-gradient inline-flex items-center text-black text-[12px] md:text-[13px] font-bold tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] btn-shimmer group-hover:scale-[1.03] transition-transform will-change-transform relative overflow-hidden" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>{t.maintNow}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section ref={portfolioRef} className={`py-10 md:py-28 section-shell ${themeBg}`}>
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 w-full box-border">
            <Reveal threshold={0.12} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 w-full">
              <div><div className="flex items-center gap-3 mb-4"><GoldLine width={32} /><span className="label-gold" style={{fontFamily, fontSize: '12px'}}>{t.portfolio}</span></div><HeadlineReveal delay={0.12}><h2 className={`headline-strong leading-tight ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily, fontSize: isMobile ? '28px' : '48px'}}>معرض الأعمال - German Craftsmanship</h2></HeadlineReveal></div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto tabs-scroll pb-2 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0" style={{scrollbarWidth: 'none'}}>
                {t.tabs.map((tab: string, idx: number) => (<button key={tab} onClick={(e)=>{ addGoldRipple(e as any); setActiveTab(tab); }} className={`h-10 md:h-9 min-h-[44px] md:min-h-[36px] px-5 rounded-full text-[13px] tracking-[0.12em] border transition-all min-w-[44px] font-medium hover:scale-[1.04] active:scale-95 will-change-transform shrink-0 relative overflow-hidden ${activeTab === tab ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.3)]' : (isDay ? 'bg-transparent text-black/60 border-black/15 hover:border-[#D4AF37]/50 hover:text-black' : 'bg-transparent text-white/60 border-white/15 hover:border-[#D4AF37]/50 hover:text-white')}`} style={{fontFamily, transform: 'translate3d(0,0,0)', transitionDelay: `${idx*0.05}s`, backfaceVisibility: 'hidden'}}>{tab}</button>))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
              {filteredPortfolio.map((item, idx) => (
                <Reveal key={item.id} delay={0.08 + idx * 0.08} threshold={0.12} y={20} withScale>
                  <div className={`group relative overflow-hidden border transition-all cursor-pointer w-full card-lift will-change-transform relative ${isDay ? 'bg-white border-[#D4AF37]/15 hover:border-[#D4AF37]/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)]' : 'bg-[#0A0A0A] border-[#D4AF37]/15 hover:border-[#D4AF37]/40'}`} onClick={(e)=>{ addGoldRipple(e as any); setLightbox(item.img); }} style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                    <div className="relative overflow-hidden w-full">
                      <img src={item.img} alt={lang === 'ar' ? item.titleAr : item.titleEn} className="w-full object-cover img-parallax will-change-transform" style={{ height: isMobile ? '320px' : '380px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 bg-gradient-to-t from-black via-black/70 to-transparent translate-y-[2px] group-hover:translate-y-0 transition-transform duration-500 will-change-transform">
                        <div className="text-[10px] tracking-[0.25em] text-[#D4AF37] mb-2 font-bold will-change-transform" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>{item.material}</div>
                        <h4 className="text-[15px] md:text-[17px] font-bold tracking-wide text-white will-change-transform" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>{lang === 'ar' ? item.titleAr : item.titleEn}</h4>
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-[#D4AF37]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="text-[#D4AF37] text-[12px]">↗</span></div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section ref={branchesRef} className={`py-10 md:py-20 border-t section-shell ${isDay ? 'bg-[#FAFAFA] border-[#D4AF37]/15' : 'bg-[#0A0A0A] border-[#D4AF37]/10'}`}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full box-border">
            <Reveal threshold={0.12} className="text-center mb-8 md:mb-12 w-full"><HeadlineReveal delay={0.08}><h2 className={`headline-strong mb-3 leading-tight text-center ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily, fontSize: isMobile ? '28px' : '48px'}}>{t.branchTitle}</h2></HeadlineReveal><GoldLine width={48} center className="mt-4" /></Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
              {t.branchesList.map((b: any, i: number) => {
                const tiltRef = useTilt();
                return (
                  <Reveal key={i} delay={0.08 + i * 0.08} threshold={0.12} withScale>
                    <div ref={tiltRef} onClick={addGoldRipple as any} className={`border transition-all group overflow-hidden w-full card-lift will-change-transform relative ${isDay ? 'bg-white border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]' : 'bg-black border-[#D4AF37]/20 hover:border-[#D4AF37]/50'}`} style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                      <div className="h-[200px] md:h-[220px] overflow-hidden relative w-full"><div className="w-full h-full bg-cover bg-center img-parallax will-change-transform" style={{ backgroundImage: `url(${branchImagesClean[i]})`, transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} role="img" aria-label={b.name} /><div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" /><div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 border border-[#D4AF37]/30 text-[9px] tracking-widest text-[#D4AF37] font-bold will-change-transform" style={{fontFamily, transform: 'translate3d(0,0,0)'}}>SHOWROOM</div></div>
                      <div className="p-5"><h4 className={`text-[15px] md:text-[16px] font-bold tracking-wide mb-1 transition-colors ${isDay ? 'text-black group-hover:text-[#B8941F]' : 'text-white group-hover:text-[#D4AF37]'}`} style={{fontFamily}}>{b.name}</h4><p className={`text-[12px] tracking-wide font-medium ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{b.city}</p></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={partnersRef} className={`py-10 md:py-[80px] border-t relative section-shell ${isDay ? 'bg-white border-[#D4AF37]/15' : 'bg-black border-[#D4AF37]/10'}`}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 flex flex-col items-center w-full box-border">
            <Reveal threshold={0.12}><GoldLine width={40} center className="mb-8" /></Reveal>
            <HeadlineReveal delay={0.12} threshold={0.12}><h2 className={`headline-strong mb-8 md:mb-14 text-center ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily, fontSize: isMobile ? '28px' : '48px'}}>{lang === 'ar' ? 'شركاؤنا في النجاح' : 'Our Partners'}</h2></HeadlineReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 lg:gap-16 w-full max-w-[900px]" style={{gap: isMobile ? '16px' : undefined}}>
              {[
                { big: 'BLOOM', smallAr: 'بلوم إن السعودية', sub: 'شركة الاكسسوارات' },
                { big: 'JUFFALI', smallAr: 'أنظمة الجفالي', sub: '' },
                { big: 'ELBA', smallAr: 'شركة إلبا السعودية', sub: '' },
                { big: 'AN', smallAr: 'شركة عوض النحاس', sub: '' },
              ].map((p, idx) => (
                <Reveal key={idx} delay={0.08 + idx * 0.08} threshold={0.12} withScale>
                  <div className="flex flex-col items-center group select-none will-change-transform w-full" style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                    <div onClick={addGoldRipple as any} className={`rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:shadow-[0_0_32px_rgba(212,175,55,0.45)] group-active:scale-[0.98] will-change-transform relative overflow-hidden border ${isDay ? 'bg-white border-[#D4AF37] shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : 'bg-[#000000] border-[#D4AF37]'}`} style={{ width: isMobile ? '120px' : '160px', height: isMobile ? '120px' : '160px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                      <span className="font-bold tracking-[0.2em] text-[#D4AF37] group-hover:scale-105 transition-transform will-change-transform text-center px-2" style={{fontFamily, fontSize: isMobile ? '15px' : '20px', transform: 'translate3d(0,0,0)'}}>{p.big}</span>
                    </div>
                    <div className="mt-4 md:mt-5 flex flex-col items-center text-center"><span className={`text-[12px] md:text-[15px] font-bold tracking-wide transition-colors ${isDay ? 'text-black group-hover:text-[#B8941F]' : 'text-white group-hover:text-[#D4AF37]'}`} style={{fontFamily}}>{p.smallAr}</span>{p.sub && <span className="mt-1 text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]" style={{fontFamily}}>{p.sub}</span>}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <footer className={`border-t py-10 md:py-20 section-shell ${isDay ? 'bg-white border-[#D4AF37]/20' : 'bg-black border-[#D4AF37]/20'}`}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full box-border">
            <div className="flex flex-col items-center text-center w-full">
              <Reveal threshold={0.12}><img src={logoUrl} alt="Cochin SA" className={`w-auto object-contain opacity-95 hover:scale-[1.03] transition-transform duration-700 will-change-transform ${isDay ? 'brightness-0' : ''}`} style={{ height: isMobile ? '90px' : '100px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} /></Reveal>
              <Reveal delay={0.08} threshold={0.12}><GoldLine width={40} center className="mt-6 mb-8" /></Reveal>
              <Reveal delay={0.12} threshold={0.12}><h4 className={`text-[15px] tracking-[0.3em] font-bold mb-8 ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily}}>{t.footerFollow}</h4></Reveal>
              <Reveal delay={0.16} threshold={0.12} className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center justify-center gap-4">
                  {[
                    { href: SOCIAL_URLS.instagram, icon: <InstagramIcon size={22} />, label: 'Instagram' },
                    { href: SOCIAL_URLS.tiktok, icon: <TikTokIcon size={22} />, label: 'TikTok' },
                    { href: SOCIAL_URLS.snapchat, icon: <SnapchatIcon size={22} />, label: 'Snapchat' },
                  ].map((s, idx) => (
                    <a key={idx} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label}`} onClick={addGoldRipple as any} className={`relative rounded-full border flex items-center justify-center transition-all duration-500 overflow-hidden group will-change-transform hover:scale-110 active:scale-95 ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_24px_rgba(212,175,55,0.5)]' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_24px_rgba(212,175,55,0.5)]'}`} style={{ width: '52px', height: '52px', minWidth: '52px', minHeight: '52px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                      <span className="relative z-10 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}>{s.icon}</span>
                    </a>
                  ))}
                </div>
                <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={addGoldRipple as any} className={`relative rounded-full border flex items-center justify-center transition-all duration-500 overflow-hidden group will-change-transform hover:scale-105 active:scale-95 gold-pulse ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F] hover:bg-[#D4AF37] hover:text-black' : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`} style={{ width: isMobile ? '64px' : '52px', height: isMobile ? '64px' : '52px', minWidth: isMobile ? '64px' : '52px', minHeight: isMobile ? '64px' : '52px', transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
                  <span className="relative z-10 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}><WhatsAppIconLux size={isMobile ? 26 : 22} /></span>
                </a>
              </Reveal>
              <Reveal delay={0.2} threshold={0.12} className="mt-8"><p className={`text-[11px] tracking-[0.2em] max-w-2xl leading-relaxed mb-3 px-2 text-center font-medium ${isDay ? 'text-black/40' : 'text-white/40'}`} style={{fontFamily}}>{t.footerWarranty}</p></Reveal>
              <Reveal delay={0.24} threshold={0.12}><p className={`text-[11px] tracking-[0.15em] px-2 text-center font-medium ${isDay ? 'text-black/30' : 'text-white/30'}`} style={{fontFamily}}>{t.footerCopy}</p></Reveal>
              {loadError && <p className={`mt-4 text-[9px] tracking-wide ${isDay ? 'text-black/20' : 'text-white/20'}`} style={{fontFamily}}>Backend preview offline: {loadError.slice(0,80)}</p>}
            </div>
          </div>
        </footer>

        {lightbox && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 will-change-transform" style={{ transform: 'translate3d(0,0,0)', animation: 'fadeInUp 0.3s ease', backfaceVisibility: 'hidden' }} onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="preview" className="max-w-[92vw] max-h-[85vh] object-contain border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.2)] will-change-transform" style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
            <button className="absolute top-6 right-6 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black border border-[#D4AF37]/30 text-white flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}>✕</button>
          </div>
        )}
        <div className={`h-[1px] w-full max-w-[100vw] ${isDay ? 'bg-[#D4AF37]/10' : 'bg-[#D4AF37]/10'}`} />
      </div>

      {/* BOOKING STANDALONE PAGE - FULL FORM ONLY HERE */}
      <div id="booking-standalone-page" style={{ display: pageMode === 'booking' ? 'block' : 'none', visibility: pageMode === 'booking' ? 'visible' as any : 'hidden' as any, opacity: pageMode === 'booking' ? 1 : 0, minHeight: '100vh', background: isDay ? '#FFFFFF' : '#000000', color: isDay ? '#000000' : '#FFFFFF', padding: '80px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col items-center mb-10">
            <img src={logoUrl} alt="Cochin SA" className={`w-auto object-contain ${isDay ? 'brightness-0' : 'brightness-110'}`} style={{ height: '72px', maxWidth: '200px' }} />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button onClick={()=>navigatePage('full')} className="h-[44px] px-6 border border-[#D4AF37] text-[#D4AF37] rounded-full text-[12px] font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2" style={{fontFamily}}><span>→</span> {t.openFullSite}</button>
              <button onClick={()=>setLang(lang==='ar'?'en':'ar')} className={`w-11 h-11 rounded-full border flex items-center justify-center text-[11px] font-bold ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`} style={{fontFamily}}>{lang==='ar'?'EN':'AR'}</button>
              <button onClick={()=>setTheme(isDay?'night':'day')} className={`w-11 h-11 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}>{isDay ? <SunIcon size={18}/> : <MoonIcon size={18}/>}</button>
              <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 rounded-full border flex items-center justify-center gold-pulse ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><WhatsAppIconLux size={18}/></a>
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /><span className="text-[11px] tracking-[0.25em] text-[#D4AF37] font-bold" style={{fontFamily}}>{t.bookingSub}</span></div>
            <h1 className="text-[32px] md:text-[42px] font-extrabold tracking-wide mb-4" style={{fontFamily, color: '#D4AF37', lineHeight: 1.2}}>حجز موعد - Book Appointment</h1>
            <div className="w-[64px] h-[1px] bg-[#D4AF37] mx-auto shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
            <p className={`mt-5 text-[12px] tracking-wide ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{t.storageNote} • {bookings.length} {t.savedLabel} • German Quality Hettich Blum</p>
          </div>

          <form onSubmit={handleBookingSubmit} className={`border p-6 md:p-10 w-full box-border ${isDay ? 'bg-white border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-[#0A0A0A] border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(212,175,55,0.08)]'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formName}</label><input required value={bookingForm.name} onChange={e=>setBookingForm({...bookingForm, name:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black focus:border-[#D4AF37]' : 'bg-black border-white/10 text-white focus:border-[#D4AF37]'}`} style={{fontFamily}} placeholder={t.formName} /></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formPhone}</label><input required value={bookingForm.phone} onChange={e=>setBookingForm({...bookingForm, phone:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black focus:border-[#D4AF37]' : 'bg-black border-white/10 text-white focus:border-[#D4AF37]'}`} style={{fontFamily}} placeholder="05xxxxxxxx" /></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formCity}</label><select value={bookingForm.city} onChange={e=>setBookingForm({...bookingForm, city:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}}><option>جدة</option><option>الطائف</option><option>مكة</option><option>الرياض</option></select></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formBranch}</label><select value={bookingForm.branch} onChange={e=>setBookingForm({...bookingForm, branch:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}}><option>صاري</option><option>الأمير سلطان</option><option>قريش</option><option>الطائف</option></select></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formService}</label><select value={bookingForm.service} onChange={e=>setBookingForm({...bookingForm, service:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}}><option>مطابخ</option><option>مجالس</option><option>دريسنج</option><option>بار</option><option>كامل المنزل</option></select></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formDate}</label><input type="date" value={bookingForm.date} onChange={e=>setBookingForm({...bookingForm, date:e.target.value})} className={`w-full border px-4 text-[14px] h-[48px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>
            </div>

            <div className="mb-8">
              <label className="text-[13px] tracking-[0.2em] text-[#D4AF37] mb-4 block font-bold" style={{fontFamily}}>{t.budgetTitle}</label>
              <div className="grid grid-cols-2 gap-3">
                {t.budgets.map((b:string, idx:number)=>(
                  <button type="button" key={idx} onClick={(e)=>{addGoldRipple(e as any); setBudget(idx);}} className={`h-[72px] border-[1.5px] flex flex-col items-center justify-center gap-1 transition-all relative overflow-hidden ${budget===idx ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_18px_rgba(212,175,55,0.35)]' : (isDay ? 'bg-white border-[#D4AF37]/30 text-black/70 hover:border-[#D4AF37]' : 'bg-black border-[#D4AF37]/30 text-white/70 hover:border-[#D4AF37]')}`} style={{fontFamily}}><span className="text-[13px] font-bold text-center px-1 leading-tight">{b}</span>{budget===idx && <span className="text-[9px] opacity-70 font-bold tracking-widest">SELECTED</span>}</button>
                ))}
              </div>
            </div>

            <div className="mb-8"><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.formNotes}</label><textarea value={bookingForm.notes} onChange={e=>setBookingForm({...bookingForm, notes:e.target.value})} className={`w-full h-28 border p-4 text-[14px] outline-none resize-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black focus:border-[#D4AF37]' : 'bg-black border-white/10 text-white focus:border-[#D4AF37]'}`} style={{fontFamily}} placeholder={lang==='ar' ? 'أخبرنا عن مساحتك وتفضيلاتك...' : 'Tell us about your space...'} /></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {t.guarantees.map((g:string,i:number)=>(
                <div key={i} className={`flex items-center gap-2 p-2 border ${isDay ? 'bg-white border-black/5' : 'bg-black border-white/5'}`}><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span><span className={`text-[12px] ${isDay?'text-black/70':'text-white/70'}`} style={{fontFamily}}>{g}</span></div>
              ))}
            </div>

            <button disabled={busyBooking} type="submit" className="w-full h-[52px] gold-gradient text-black text-[13px] tracking-[0.2em] font-bold rounded-full hover:brightness-110 disabled:opacity-50 shadow-[0_0_24px_rgba(212,175,55,0.3)] btn-shimmer relative overflow-hidden" style={{fontFamily}}>{busyBooking ? (lang==='ar' ? 'جاري الحفظ...' : 'Saving...') : t.submit}</button>

            {bookingSuccess && <div className="mt-6 p-4 border text-center bg-[#D4AF37]/10 border-[#D4AF37]/30"><p className="text-[13px] text-[#D4AF37] font-bold" style={{fontFamily}}>{t.successBooking}</p><div className="mt-3 flex justify-center"><a href={`${SOCIAL_URLS.whatsapp}?text=${encodeURIComponent(`حجز موعد - ${t.budgets[budget]} - ${getShareableUrl('booking')}`)}`} target="_blank" className="h-11 px-6 bg-[#D4AF37] text-black text-[12px] tracking-widest rounded-full inline-flex items-center font-bold">WhatsApp 0536380807</a></div></div>}
          </form>

          <div className={`mt-10 border-t pt-8 text-center ${isDay ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/20'}`}>
            <img src={logoUrl} alt="Cochin" className={`h-[64px] w-auto mx-auto mb-4 ${isDay ? 'brightness-0' : ''}`} />
            <p className={`text-[10px] tracking-widest ${isDay ? 'text-black/40' : 'text-white/40'}`} style={{fontFamily}}>{t.footerCopy}</p>
            <p className={`text-[9px] tracking-widest mt-2 ${isDay ? 'text-black/30' : 'text-white/30'}`} style={{fontFamily}}>{t.footerWarranty}</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href={SOCIAL_URLS.instagram} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><InstagramIcon size={18}/></a>
              <a href={SOCIAL_URLS.tiktok} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><TikTokIcon size={18}/></a>
              <a href={SOCIAL_URLS.snapchat} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><SnapchatIcon size={18}/></a>
              <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><WhatsAppIconLux size={18}/></a>
            </div>
          </div>
        </div>
      </div>

      {/* MAINTENANCE STANDALONE PAGE - FULL FORM WITH CONTRACT UPLOAD */}
      <div id="maintenance-standalone-page" style={{ display: pageMode === 'maintenance' ? 'block' : 'none', visibility: pageMode === 'maintenance' ? 'visible' as any : 'hidden' as any, opacity: pageMode === 'maintenance' ? 1 : 0, minHeight: '100vh', background: isDay ? '#FFFFFF' : '#000000', color: isDay ? '#000000' : '#FFFFFF', padding: '80px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col items-center mb-10">
            <img src={logoUrl} alt="Cochin SA" className={`w-auto object-contain ${isDay ? 'brightness-0' : 'brightness-110'}`} style={{ height: '72px', maxWidth: '200px' }} />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button onClick={()=>navigatePage('full')} className="h-[44px] px-6 border border-[#D4AF37] text-[#D4AF37] rounded-full text-[12px] font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2" style={{fontFamily}}><span>→</span> {t.openFullSite}</button>
              <button onClick={()=>setLang(lang==='ar'?'en':'ar')} className={`w-11 h-11 rounded-full border flex items-center justify-center text-[11px] font-bold ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`} style={{fontFamily}}>{lang==='ar'?'EN':'AR'}</button>
              <button onClick={()=>setTheme(isDay?'night':'day')} className={`w-11 h-11 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}>{isDay ? <SunIcon size={18}/> : <MoonIcon size={18}/>}</button>
              <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 rounded-full border flex items-center justify-center gold-pulse ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><WhatsAppIconLux size={18}/></a>
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /><span className="text-[11px] tracking-[0.25em] text-[#D4AF37] font-bold" style={{fontFamily}}>{t.maintSub}</span></div>
            <h1 className="text-[32px] md:text-[42px] font-extrabold tracking-wide mb-4" style={{fontFamily, color: '#D4AF37', lineHeight: 1.2}}>طلب صيانة - Maintenance Request</h1>
            <div className="w-[64px] h-[1px] bg-[#D4AF37] mx-auto shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
            <p className={`mt-5 text-[12px] tracking-wide ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{maintList.length} {t.savedLabel} • {t.storageNote}</p>
          </div>

          <form onSubmit={handleMaintSubmit} className={`border p-6 md:p-10 w-full box-border ${isDay ? 'bg-white border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-[#0A0A0A] border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(212,175,55,0.08)]'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintName}</label><input required value={maintForm.name} onChange={e=>setMaintForm({...maintForm, name:e.target.value})} className={`w-full h-[48px] border px-4 text-[14px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintPhone}</label><input required value={maintForm.phone} onChange={e=>setMaintForm({...maintForm, phone:e.target.value})} className={`w-full h-[48px] border px-4 text-[14px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintOrder}</label><input value={maintForm.orderNo} onChange={e=>setMaintForm({...maintForm, orderNo:e.target.value})} className={`w-full h-[48px] border px-4 text-[14px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>
              <div><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintIssue}</label><select value={maintForm.issue} onChange={e=>setMaintForm({...maintForm, issue:e.target.value})} className={`w-full h-[48px] border px-4 text-[14px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}}><option>مفصلات</option><option>أدراج</option><option>إضاءة LED</option><option>رخام</option><option>أخرى</option></select></div>
            </div>

            <div className="mb-6"><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintDesc}</label><textarea required value={maintForm.desc} onChange={e=>setMaintForm({...maintForm, desc:e.target.value})} className={`w-full h-28 border p-4 text-[14px] outline-none resize-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>
            <div className="mb-6"><label className={`text-[12px] tracking-[0.15em] mb-2 block font-bold ${isDay ? 'text-black/70' : 'text-white/70'}`} style={{fontFamily}}>{t.maintAddress}</label><input value={maintForm.address} onChange={e=>setMaintForm({...maintForm, address:e.target.value})} className={`w-full h-[48px] border px-4 text-[14px] outline-none ${isDay ? 'bg-[#FAFAFA] border-black/10 text-black' : 'bg-black border-white/10 text-white'}`} style={{fontFamily}} /></div>

            <div className="mb-8 w-full">
              <div onDragOver={(e)=>{ e.preventDefault(); if(!maintForm.hasContractSkip) setDragActive(true); }} onDragLeave={()=>setDragActive(false)} onDrop={handleDrop} onClick={(e)=>{ const target = e.target as HTMLElement; if (target.closest('button')) return; if (!maintForm.hasContractSkip && !contractFile) fileInputRefStandalone.current?.click(); }} className={`relative border-[1.5px] border-dashed p-5 md:p-6 overflow-hidden group transition-all duration-300 w-full ${dragActive ? 'bg-[#D4AF37]/10 border-[#D4AF37] scale-[1.01]' : (isDay ? 'bg-[#FAFAFA] border-[#D4AF37] hover:bg-[#D4AF37]/5' : 'bg-[#0A0A0A] border-[#D4AF37] hover:bg-[#D4AF37]/5')} ${maintForm.hasContractSkip ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}>
                <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient opacity-60" />
                <input ref={fileInputRefStandalone} type="file" accept="image/*,.pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileInputChange} />
                {!contractFile ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 min-w-[48px] rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0"><span className="text-[#D4AF37] text-[18px]">◧</span></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[13px] font-bold ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily}}>{dragActive ? t.dragActive : t.uploadTitle}</span>
                        <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[9px] tracking-widest text-[#D4AF37] font-bold" style={{fontFamily}}>{t.uploadBadge}</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed font-medium mb-3 ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}>{t.uploadHelp}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-1 rounded-full border text-[9px] tracking-widest ${isDay ? 'bg-black/5 border-black/10 text-black/40' : 'bg-black border-[#D4AF37]/20 text-white/40'}`} style={{fontFamily}}>JPG • PNG • PDF • 10MB</span>
                        <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-black text-[9px] tracking-widest font-bold" style={{fontFamily}}>✓ CLIENT-SIDE • PREVIEW</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {contractPreview ? (
                      <div className="w-[80px] h-[80px] min-w-[80px] border-[2px] border-[#D4AF37] overflow-hidden shadow-[0_0_16px_rgba(212,175,55,0.25)] relative">
                        <img src={contractPreview} alt="contract preview" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-[8px] text-white text-center py-0.5 tracking-widest">PREVIEW • معاينة</div>
                      </div>
                    ) : (
                      <div className="w-[80px] h-[80px] min-w-[80px] border-[2px] border-[#D4AF37] bg-black flex flex-col items-center justify-center gap-1"><span className="text-[#D4AF37] text-[24px]">📄</span><span className="text-[8px] text-[#D4AF37] tracking-widest font-bold">PDF</span></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><span className={`text-[13px] font-bold truncate max-w-[180px] md:max-w-[260px] ${isDay ? 'text-black' : 'text-white'}`} style={{fontFamily}}>{contractFile.name}</span><span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[8px] font-bold tracking-widest">✓ {t.uploadSelected}</span></div>
                      <div className={`text-[11px] mt-1 flex items-center gap-2 flex-wrap ${isDay ? 'text-black/60' : 'text-white/60'}`} style={{fontFamily}}><span>{contractFile.type || 'image'} • {contractFile.size < 1024*1024 ? `${Math.round(contractFile.size/1024)} KB` : `${(contractFile.size/1024/1024).toFixed(2)} MB`}</span></div>
                      <div className="mt-2 flex gap-2">
                        <button type="button" onClick={()=>fileInputRefStandalone.current?.click()} className={`h-[32px] px-3 border text-[11px] font-bold tracking-widest rounded-full flex items-center gap-1 ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`} style={{fontFamily}}>{t.uploadChange}</button>
                        <button type="button" onClick={(e)=>{ e.stopPropagation(); removeContractFile(); }} className="h-[32px] w-[32px] rounded-full bg-black border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors"><span className="text-[12px]">✕</span></button>
                      </div>
                    </div>
                  </div>
                )}
                {contractError && <div className="mt-4 p-2.5 border border-red-500/30 bg-red-500/10 text-red-500 text-[11px] font-bold tracking-wide" style={{fontFamily}}>{contractError}</div>}
              </div>
              <div className={`mt-4 flex items-start gap-3 p-3 border w-full ${isDay ? 'bg-white border-black/5' : 'bg-black border-white/5'}`}>
                <label className="flex items-center gap-3 cursor-pointer group min-h-[44px] w-full">
                  <div className={`relative w-6 h-6 min-w-[24px] border flex items-center justify-center transition-colors ${isDay ? 'border-[#D4AF37]/40 bg-white group-hover:border-[#D4AF37]' : 'border-[#D4AF37]/40 bg-black group-hover:border-[#D4AF37]'}`}>
                    <input type="checkbox" checked={maintForm.hasContractSkip} onChange={e=>handleSkipToggle(e.target.checked)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                    {maintForm.hasContractSkip && <span className="text-[#D4AF37] text-[14px] font-bold">✓</span>}
                  </div>
                  <div className="flex-1">
                    <span className={`text-[13px] font-bold ${isDay ? 'text-black/80' : 'text-white/80'}`} style={{fontFamily}}>{t.uploadSkip}</span>
                    <p className={`text-[10px] mt-0.5 ${isDay ? 'text-black/40' : 'text-white/40'}`} style={{fontFamily}}>{lang==='ar' ? 'تفعيل هذا الخيار يسمح بالإرسال بدون ملف ويخفي منطقة الرفع' : 'Enabling allows submit without file and hides upload area'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[8px] tracking-widest font-bold border ${maintForm.hasContractSkip ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : (isDay ? 'bg-white text-black/30 border-black/10' : 'bg-black text-white/30 border-white/10')}`} style={{fontFamily}}>{maintForm.hasContractSkip ? 'SKIPPED' : 'ACTIVE'}</span>
                </label>
              </div>
            </div>

            <button disabled={busyMaint} type="submit" className="w-full h-[52px] gold-gradient text-black text-[13px] tracking-[0.2em] font-bold rounded-full hover:brightness-110 disabled:opacity-50 shadow-[0_0_24px_rgba(212,175,55,0.25)]" style={{fontFamily}}>{busyMaint ? '...' : t.maintSubmit}</button>

            {maintSuccess && <div className="mt-6 p-4 border text-center bg-[#D4AF37]/10 border-[#D4AF37]/30"><p className="text-[13px] text-[#D4AF37] font-bold" style={{fontFamily}}>{t.successMaint}{maintSuccess}</p><p className={`text-[10px] mt-2 ${isDay ? 'text-black/40' : 'text-white/40'}`} style={{fontFamily}}>{contractFile ? `${t.uploadSelected}: ${contractFile.name}` : t.noContract}</p></div>}
          </form>

          <div className={`mt-10 border-t pt-8 text-center ${isDay ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/20'}`}>
            <img src={logoUrl} alt="Cochin" className={`h-[64px] w-auto mx-auto mb-4 ${isDay ? 'brightness-0' : ''}`} />
            <p className={`text-[10px] tracking-widest ${isDay ? 'text-black/40' : 'text-white/40'}`} style={{fontFamily}}>{t.footerCopy}</p>
            <p className={`text-[9px] tracking-widest mt-2 ${isDay ? 'text-black/30' : 'text-white/30'}`} style={{fontFamily}}>{t.footerWarranty}</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href={SOCIAL_URLS.instagram} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><InstagramIcon size={18}/></a>
              <a href={SOCIAL_URLS.tiktok} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><TikTokIcon size={18}/></a>
              <a href={SOCIAL_URLS.snapchat} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><SnapchatIcon size={18}/></a>
              <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener" className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDay ? 'bg-white border-[#D4AF37] text-[#B8941F]' : 'bg-black border-[#D4AF37] text-[#D4AF37]'}`}><WhatsAppIconLux size={18}/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
