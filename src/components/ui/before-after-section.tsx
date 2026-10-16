'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Send,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  Sliders,
  Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Documented Clinical Cases ────────────────────────────────────────────────
// Real patient cases from E:\dr\Before&after showcasing limb alignment & deformity correction

const CASES = [
  {
    id: 1,
    labelAr: 'تصحيح تقوس الساقين (Genu Varum)',
    labelEn: 'Bow Legs Realignment (Genu Varum)',
    badgeAr: 'استقامة المحور الحركي',
    badgeEn: 'Mechanical Axis Realignment',
    descAr: 'مريض يعاني من تقوس ملحوظ في الساقين مع تباعد الركبتين وتوزيع حمل غير متوازن. تم إجراء تصحيح محوري دقيق لإعادة استقامة محور الساق الميكانيكي واستعادة المشية الطبيعية وحماية مفصل الركبة من الاحتكاك المبكر.',
    descEn: 'Patient presenting with pronounced bow legs (Genu Varum) and uneven load distribution. Precision axial realignment was performed to restore the mechanical axis, normalize gait, and protect joints from premature wear.',
    before: '/before-after/before-1.jpg',
    after: '/before-after/after-1.jpg',
    stats: [
      { num: '100%', labelAr: 'استقامة المحور', labelEn: 'Axis Realignment' },
      { num: '6-8', labelAr: 'أسابيع للتعافي', labelEn: 'Weeks Recovery' },
      { num: 'طبيعي', labelAr: 'المجال الحركي', labelEn: 'Full Mobility' },
    ],
  },
  {
    id: 2,
    labelAr: 'تقويم انحراف الساقين الحاد',
    labelEn: 'Severe Limb Deformity Correction',
    badgeAr: 'توازن التحميل الميكانيكي',
    badgeEn: 'Load Balance Restored',
    descAr: 'حالة انحراف محوري متقدم في الطرفين السفليين أثرت على توازن التحميل واستقامة القامة. بفضل خطة جراحية دقيقة وتقنيات تقويم الزوايا الحديثة، تم تصحيح المحور بالكامل واستعادة التناسق الوظيفي والجمالي للساقين.',
    descEn: 'Severe lower limb axial deviation compromising biomechanical weight-bearing and posture. Through a tailored corrective plan, full anatomical symmetry and leg alignment were successfully achieved.',
    before: '/before-after/before-2.jpg',
    after: '/before-after/after-2.jpg',
    stats: [
      { num: 'كامل', labelAr: 'تصحيح الانحراف', labelEn: 'Full Correction' },
      { num: '8-10', labelAr: 'أسابيع للتعافي', labelEn: 'Weeks Recovery' },
      { num: 'حماية', labelAr: 'من الخشونة المبكرة', labelEn: 'Joint Protection' },
    ],
  },
  {
    id: 3,
    labelAr: 'تصحيح تقوس الركبتين الداخلي (Genu Valgum)',
    labelEn: 'Knock Knees Correction (Genu Valgum)',
    badgeAr: 'تناسق مفصلي وحركي متكامل',
    badgeEn: 'Full Articular Symmetry',
    descAr: 'مريض يعاني من تقارب الركبتين وتباعد الكاحلين مع إجهاد وصعوبة أثناء المشي والوقوف الطويل. تم تصحيح زوايا التحميل بدقة متناهية وإعادة استقامة الساقين مع نتائج وظيفية وجمالية رفيعة المستوى.',
    descEn: 'Patient presenting with inward knee alignment (knock knees / Genu Valgum) causing strain during ambulation. Load-bearing angles were meticulously corrected, achieving remarkable functional and aesthetic symmetry.',
    before: '/before-after/before-3.jpg',
    after: '/before-after/after-3.jpg',
    stats: [
      { num: 'دقيق', labelAr: 'موازنة الزوايا', labelEn: 'Precision Angulation' },
      { num: '6', labelAr: 'أسابيع للعودة للمشي', labelEn: 'Weeks to Normal Walk' },
      { num: '100%', labelAr: 'رضا المريض', labelEn: 'Patient Satisfaction' },
    ],
  },
];

const CONDITIONS = [
  { id: 'limb_deformity', ar: 'تقوس وتشوهات الأطراف', en: 'Limb Deformity Correction' },
  { id: 'knee_osteoarthritis', ar: 'خشونة الركبة وتجديد المفصل', en: 'Knee Osteoarthritis & Biologics' },
  { id: 'sports_injuries', ar: 'إصابات الملاعب والرباط الصليبي', en: 'Sports Injuries & ACL' },
  { id: 'arthroscopy', ar: 'مناظير الركبة والكاحل', en: 'Knee & Ankle Arthroscopy' },
  { id: 'limb_lengthening', ar: 'تطويل الأطراف', en: 'Limb Lengthening' },
  { id: 'general_consultation', ar: 'استشارة عامة وجراحة مفاصل', en: 'General Orthopedic Consultation' },
];

const CLINIC_LOCATIONS = [
  {
    id: 'sharjah' as const,
    ar: 'الشارقة — مستشفى دار الكمال',
    en: 'Sharjah — Dar Al Kamal Hospital',
    cityAr: 'الشارقة',
    cityEn: 'Sharjah',
    facilityAr: 'مستشفى دار الكمال',
    facilityEn: 'Dar Al Kamal Hospital',
    featuresAr: 'أجنحة جراحية رقمية وعيادات متكاملة',
    featuresEn: 'Digital surgical suites & specialized clinics',
  },
  {
    id: 'ajman' as const,
    ar: 'عجمان — مركز العلاج الطبي',
    en: 'Ajman — Medical Treatment Center',
    cityAr: 'عجمان',
    cityEn: 'Ajman',
    facilityAr: 'مركز العلاج الطبي',
    facilityEn: 'Medical Treatment Center',
    featuresAr: 'فحص سريري متقدم وحقن موجه للمفاصل',
    featuresEn: 'Advanced clinical exam & guided joint injections',
  },
];

type CaseItem = (typeof CASES)[0];

// ─── Interactive Comparison Slider (Buttery Pointer Events) ───────────────────

function CaseSlider({ c, lang }: { c: CaseItem; lang: 'ar' | 'en' }) {
  const isRtl = lang === 'ar';
  const [pos, setPos] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'before' | 'after'>('slider');
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(98, Math.max(2, rawPct));
    setPos(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (viewMode !== 'slider') return;
    draggingRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || viewMode !== 'slider') return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const activePos = viewMode === 'before' ? 100 : viewMode === 'after' ? 0 : pos;

  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px] mx-auto">
      {/* View Mode Pills (Fast Toggles for Mobile) */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-medium text-[#8ab4f8] flex items-center gap-1.5">
          <Sliders className="w-3 h-3 text-[#1a73e8]" />
          <span>{isRtl ? 'طريقة المقارنة:' : 'View Mode:'}</span>
        </span>
        <div className="inline-flex p-0.5 rounded-lg bg-white/[0.06] border border-white/10 text-[10px]">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
              viewMode === 'slider'
                ? 'bg-[#1a73e8] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {isRtl ? 'شريط التمرير' : 'Slider'}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('before')}
            className={`px-2 py-1 rounded-md transition-all ${
              viewMode === 'before'
                ? 'bg-[#1a73e8] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {isRtl ? 'قبل فقط' : 'Before'}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('after')}
            className={`px-2 py-1 rounded-md transition-all ${
              viewMode === 'after'
                ? 'bg-[#1a73e8] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {isRtl ? 'بعد فقط' : 'After'}
          </button>
        </div>
      </div>

      {/* Main Slider Canvas */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full aspect-[1060/1650] rounded-2xl overflow-hidden select-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/15 bg-[#050a12] cursor-ew-resize touch-pan-y group"
      >
        {/* Underneath: AFTER IMAGE */}
        <Image
          src={c.after}
          alt={isRtl ? `${c.labelAr} - بعد العلاج` : `${c.labelEn} - After`}
          fill
          sizes="(max-width: 640px) 90vw, 420px"
          className="object-contain pointer-events-none"
          priority
        />

        {/* Clipped Overneath: BEFORE IMAGE */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - activePos}% 0 0)` }}
        >
          <Image
            src={c.before}
            alt={isRtl ? `${c.labelAr} - قبل العلاج` : `${c.labelEn} - Before`}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            className="object-contain"
            priority
          />
        </div>

        {/* Floating Clinical Status Pills */}
        <div className="absolute top-3.5 inset-x-3.5 flex justify-between pointer-events-none z-20">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-md">
            {isRtl ? 'قبل العلاج' : 'Before'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0c4186]/85 backdrop-blur-md text-sky-200 border border-[#8ab4f8]/40 shadow-md">
            {isRtl ? 'بعد التصحيح' : 'After'}
          </span>
        </div>

        {/* Glowing Interactive Divider Handle (when slider is active) */}
        {viewMode === 'slider' && (
          <div
            className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_16px_rgba(26,115,232,0.9),0_0_6px_rgba(255,255,255,1)] pointer-events-none z-30 transition-shadow duration-300"
            style={{ left: `${pos}%` }}
          >
            {/* Center Circular Grab Knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-2 border-[#1a73e8] flex items-center justify-center transform active:scale-95 group-hover:scale-105 transition-transform duration-200">
              <div className="flex items-center gap-0.5 text-[#0c4186]">
                <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Hint Banner */}
        {viewMode === 'slider' && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-8 pb-3 px-3 pointer-events-none z-20">
            <p className="text-white/80 text-[10px] text-center font-medium animate-pulse">
              {isRtl ? '← اسحب الدائرة أفقياً للمقارنة الفورية →' : '← Drag slider horizontally to compare →'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Section: Cinematic Before & After + WhatsApp Lead Funnel ────────────

export function BeforeAfterSection({ lang }: { lang: 'ar' | 'en' }) {
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [activeCase, setActiveCase] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedCondition, setSelectedCondition] = useState(CONDITIONS[0].id);
  const [selectedLocation, setSelectedLocation] = useState<'sharjah' | 'ajman'>('sharjah');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const currentCase = CASES[activeCase];

  // GSAP Cinematic Entrance Animations on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.baa-reveal-header',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.baa-reveal-card',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.baa-reveal-form',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Format and dispatch WhatsApp Message
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    setIsSubmitting(true);

    const clinicObj = CLINIC_LOCATIONS.find((loc) => loc.id === selectedLocation);
    const condObj = CONDITIONS.find((c) => c.id === selectedCondition);

    const clinicLabel = clinicObj
      ? isRtl
        ? clinicObj.ar
        : clinicObj.en
      : isRtl
      ? 'الشارقة (مستشفى دار الكمال)'
      : 'Sharjah (Dar Al Kamal Hospital)';

    const conditionLabel = condObj
      ? isRtl
        ? condObj.ar
        : condObj.en
      : isRtl
      ? 'استشارة عامة'
      : 'General Consultation';

    // Structured professional medical inquiry message
    const messageLines = isRtl
      ? [
          'السلام عليكم د. محمد كمال علي 👋',
          'أرغب في حجز موعد استشارة طبية بعيادتكم الموقرة:',
          '',
          `👤 *الاسم:* ${patientName.trim()}`,
          `📱 *رقم الهاتف:* ${patientPhone.trim()}`,
          `🏥 *العيادة المفضلة:* ${clinicLabel}`,
          `🩺 *الحالة الطبية:* ${conditionLabel}`,
          notes.trim() ? `📝 *ملاحظات إضافية:* ${notes.trim()}` : '',
          '',
          'أرجو من فريق المواعيد التكرم بتأكيد الموعد المناسب. شكراً جزيلاً.',
        ].filter(Boolean)
      : [
          'Hello Dr. Mohamed Kamal Ali 👋',
          'I would like to request an orthopedic consultation appointment:',
          '',
          `👤 *Name:* ${patientName.trim()}`,
          `📱 *Phone:* ${patientPhone.trim()}`,
          `🏥 *Preferred Clinic:* ${clinicLabel}`,
          `🩺 *Condition:* ${conditionLabel}`,
          notes.trim() ? `📝 *Additional Notes:* ${notes.trim()}` : '',
          '',
          'Kindly confirm the available appointment slot with your team. Thank you.',
        ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const waUrl = `https://wa.me/971501234567?text=${encodeURIComponent(fullMessage)}`;

    window.open(waUrl, '_blank');

    setSubmittedSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 8000);
  };

  return (
    <section
      id="before-after-cases"
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative w-full bg-[#050913] text-white overflow-hidden py-16 sm:py-24 border-t border-white/10"
    >
      {/* Cinematic Ambient Lighting Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -start-24 w-96 h-96 bg-[#0c4186]/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -end-24 w-[32rem] h-[32rem] bg-[#1a73e8]/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 start-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]" />
        {/* Subtle Luxury Medical Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══ SECTION HEADER ══ */}
        <div className="baa-reveal-header text-center max-w-3xl mx-auto mb-10 sm:mb-14">

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            {isRtl ? (
              <>
                حالات حقيقية... <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ab4f8] via-[#a8c7fa] to-white">ورحلات تعافٍ ملهمة</span>
              </>
            ) : (
              <>
                Real Cases... <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ab4f8] via-[#a8c7fa] to-white">Documented Outcomes</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            {isRtl
              ? 'شاهد دقة تقويم وتصحيح انحراف الأطراف واستعادة التوازن الحركي الطبيعي تحت إشراف د. محمد كمال علي، وفق أحدث المعايير الدولية.'
              : 'Explore precision limb realignment, deformity correction, and restored functional biomechanics by Dr. Mohamed Kamal Ali.'}
          </p>
        </div>

        {/* ══ CASE SWITCHER TABS (PILLS) ══ */}
        <div className="baa-reveal-card flex justify-center items-center gap-2 sm:gap-3 flex-wrap mb-10">
          {CASES.map((cas, idx) => {
            const isSelected = activeCase === idx;
            return (
              <button
                key={cas.id}
                type="button"
                onClick={() => setActiveCase(idx)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1a73e8]/30 via-[#155fc3]/30 to-[#0c4186]/40 border-[#8ab4f8]/60 text-white shadow-[0_4px_25px_rgba(26,115,232,0.4)] backdrop-blur-xl scale-102'
                    : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/[0.08]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#8ab4f8] animate-pulse' : 'bg-gray-600'}`} />
                <span>{isRtl ? cas.labelAr : cas.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* ══ INTERACTIVE COMPARISON + CLINICAL CASE DETAILS ══ */}
        <div className="baa-reveal-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left / Top: Interactive Before/After Slider */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <CaseSlider c={currentCase} lang={lang} />
          </div>

          {/* Right / Bottom: Clinical Card & Treatment Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative overflow-hidden">
              {/* Subtle accent glow */}
              <div className="absolute top-0 end-0 w-44 h-44 bg-[#1a73e8]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Tag / Category Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1a73e8]/15 border border-[#8ab4f8]/30 text-[#8ab4f8]">
                  <Activity className="w-3 h-3 text-[#8ab4f8]" />
                  <span>{isRtl ? currentCase.badgeAr : currentCase.badgeEn}</span>
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {isRtl
                    ? `الحالة ${activeCase + 1} من ${CASES.length}`
                    : `Case ${activeCase + 1} of ${CASES.length}`}
                </span>
              </div>

              {/* Case Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-snug">
                {isRtl ? currentCase.labelAr : currentCase.labelEn}
              </h3>

              {/* Case Medical Description */}
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6">
                {isRtl ? currentCase.descAr : currentCase.descEn}
              </p>

              {/* Outcome Metrics Strip */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                {currentCase.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center text-center backdrop-blur-md"
                  >
                    <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">
                      {stat.num}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5 leading-tight">
                      {isRtl ? stat.labelAr : stat.labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Next / Previous Case Navigation Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveCase((prev) => (prev + 1) % CASES.length)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                >
                  <span>{isRtl ? 'عرض الحالة التالية' : 'Next Case'}</span>
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const formEl = document.getElementById('consultation-booking-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#1a73e8]/25 hover:bg-[#1a73e8]/35 border border-[#8ab4f8]/40 text-[#8ab4f8] text-xs sm:text-sm font-bold transition-all"
                >
                  <span>{isRtl ? 'احجز لهذه الحالة' : 'Consult for this'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══ LUXURY DIVIDER ══ */}
        <div className="relative my-16 sm:my-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8ab4f8]/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#050913] border border-white/15 text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isRtl ? 'استشارة طبية معتمدة وسريعة' : 'Certified Clinical Booking'}</span>
          </div>
        </div>

        {/* ══ WHATSAPP CONCIERGE BOOKING FORM ══ */}
        <div id="consultation-booking-form" ref={formRef} className="baa-reveal-form max-w-2xl mx-auto">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Soft Ambient Inner Glow */}
            <div className="absolute top-0 start-1/2 -translate-x-1/2 w-80 h-32 bg-[#1a73e8]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header Form Title */}
            <div className="text-center mb-7 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a73e8]/30 to-[#0c4186]/50 border border-[#8ab4f8]/40 mx-auto flex items-center justify-center mb-3.5 shadow-[0_0_30px_rgba(26,115,232,0.35)]">
                <MessageCircle className="w-7 h-7 text-[#8ab4f8]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {isRtl ? 'احجز استشارتك مع الدكتور' : 'Book Your Consultation'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto">
                {isRtl
                  ? 'املأ البيانات البسيطة واضغط إرسال، وستُرسل رسالتك منسقة بالكامل عبر واتساب مباشرة للعيادة'
                  : 'Complete the short form below and your consultation request will be instantly formatted and sent via WhatsApp'}
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {isRtl ? 'الاسم الكامل' : 'Full Name'} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8ab4f8]/70 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={isRtl ? 'مثال: أحمد عبد الله' : 'e.g. John Doe'}
                    className="w-full ps-10 pe-4 py-3 bg-white/[0.05] border border-white/15 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              {/* Patient Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {isRtl ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp Number'} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8ab4f8]/70 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder={isRtl ? 'مثال: 0501234567 أو +971501234567' : 'e.g. +971 50 123 4567'}
                    className="w-full ps-10 pe-4 py-3 bg-white/[0.05] border border-white/15 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              {/* Preferred Clinic Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {isRtl ? 'اختر العيادة المفضلة' : 'Preferred Clinic Location'}{' '}
                  <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CLINIC_LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`p-3 rounded-xl border text-start transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-[#1a73e8]/20 border-[#8ab4f8] text-white shadow-[0_0_18px_rgba(26,115,232,0.3)]'
                            : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <MapPin
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#8ab4f8]' : 'text-gray-500'
                          }`}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {isRtl ? loc.cityAr : loc.cityEn}
                          </span>
                          <span className="text-[11px] text-gray-300">
                            {isRtl ? loc.facilityAr : loc.facilityEn}
                          </span>
                          <span className="text-[10px] text-gray-400 mt-0.5">
                            {isRtl ? loc.featuresAr : loc.featuresEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Medical Condition Selection Pills */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {isRtl ? 'الحالة التي ترغب في استشارة الدكتور بشأنها' : 'Condition for Consultation'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONDITIONS.map((cond) => {
                    const isSelected = selectedCondition === cond.id;
                    return (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setSelectedCondition(cond.id)}
                        className={`px-3 py-2 rounded-xl border text-start text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1a73e8]/25 border-[#8ab4f8] text-white shadow-sm'
                            : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <span>{isRtl ? cond.ar : cond.en}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#8ab4f8] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  {isRtl ? 'ملاحظات إضافية أو وقت مفضل (اختياري)' : 'Additional Notes / Preferred Time (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'مثال: أعاني من ألم بالركبة منذ شهرين، وأفضل موعد مسائي...'
                      : 'e.g. Knee discomfort during sports, prefer afternoon slots...'
                  }
                  className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] focus:bg-white/[0.08] transition-all resize-none"
                />
              </div>

              {/* WhatsApp CTA Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!patientName.trim() || !patientPhone.trim() || isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-[#1a73e8] hover:from-emerald-400 hover:to-[#155fc3] text-white font-black text-sm sm:text-base shadow-[0_8px_30px_rgba(16,185,129,0.35)] transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {submittedSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                      <span>{isRtl ? 'جاري فتح واتساب مع الرسالة المنسقة ✓' : 'Opening WhatsApp with Your Details ✓'}</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                      <span>{isRtl ? 'إرسال طلب الحجز عبر واتساب مباشرة' : 'Send Booking Request via WhatsApp'}</span>
                      <Send className="w-4 h-4 ms-1 opacity-80" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-2.5">
                  {isRtl
                    ? '⚡ سيتم فتح تطبيق واتساب فوراً برسالة جاهزة تحتوي كافة تفاصيل حجزك للتأكيد الفوري مع العيادة.'
                    : '⚡ WhatsApp will open instantly with your pre-formatted booking details for quick confirmation.'}
                </p>
              </div>
            </form>

            {/* Trust Assurances */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'سرية طبية تامة' : 'Strict Confidentiality'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8ab4f8]" />
                <span>{isRtl ? 'تأكيد الموعد خلال ساعات العمل' : 'Fast Confirmation'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isRtl ? 'مستشفى دار الكمال & مركز العلاج' : 'MOHAP Certified Facilities'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
