'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Home as HomeIcon, 
  User, 
  Activity, 
  CalendarCheck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  CheckCircle2,
  Stethoscope,
  Award,
  FileCheck,
  Check,
  HeartPulse,
  Building2,
  Quote,
  CheckCircle,
  ExternalLink,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import { AnimatedSocialIcons, ActionIcon } from '@/components/ui/floating-action-button';
import { Preloader } from '@/components/ui/preloader';
import { BeforeAfterSection } from '@/components/ui/before-after-section';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // States
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDoctorBioOpen, setIsDoctorBioOpen] = useState(false);
  const [isProofOpen, setIsProofOpen] = useState(false);
  const [doctorActivePhoto, setDoctorActivePhoto] = useState<'coat' | 'suit' | 'clinic'>('coat');
  
  // Booking Form State (matching Developer Brief exactly)
  const [selectedBranch, setSelectedBranch] = useState<'sharjah' | 'ajman'>('sharjah');
  const [selectedCondition, setSelectedCondition] = useState('knee_osteoarthritis');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call'>('whatsapp');
  const [consentChecked, setConsentChecked] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [utmParams, setUtmParams] = useState({ source: '', medium: '', campaign: '' });

  const isRtl = lang === 'ar';

  // Read UTM params on mount for marketing attribution
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        source: params.get('utm_source') || '',
        medium: params.get('utm_medium') || '',
        campaign: params.get('utm_campaign') || ''
      });
    }
  }, []);

  // Multi-language data conforming 100% to developer brief copy
  const t = {
    ar: {
      drName: "د. محمد كمال علي",
      drTitle: "استشاري جراحة العظام والمناظير وإصابات الملاعب",
      bookConsultation: "احجز استشارتك",
      navHome: "الرئيسية",
      navDoctor: "الدكتور",
      navDiagnostics: "التشخيص",
      navBooking: "حجز موعد",
      langSwitch: "EN",
      branches: {
        sharjah: "الشارقة: مستشفى دار الكمال",
        ajman: "عجمان: مركز العلاج الطبي",
      },
      chapters: [
        {
          // Chapter 1: Reception Arrival
          step: "01 / 06",
          badge: "الاستقبال والترحيب",
          title: "الحركة هي الحياة",
          subtitle: "استشاري جراحة العظام ورعاية المفاصل المتقدمة",
          desc: "أهلاً بك في العيادة الرقمية للدكتور محمد كمال علي. تجربة سريرية تضع المريض أولاً لإعادة الحركة واستعادة جودة الحياة.",
          primaryAction: "ابدأ الجولة الطبية",
          secondaryAction: "حجز موعد سريع",
          type: "standard"
        },
        {
          // Chapter 2: Doctor Office
          step: "02 / 06",
          badge: "السيرة والنهج الطبي",
          title: "خبرة طبية تبدأ بفهم حالتك",
          subtitle: "أنا د. محمد كمال علي، استشاري جراحة العظام والمفاصل",
          desc: "هدفي أن تفهم حالتك وخيارات العلاج بوضوح قبل اتخاذ أي خطوة.",
          primaryAction: "تعرّف على الدكتور",
          type: "doctor_intro"
        },
        {
          // Chapter 3: From Office to Clinical Care
          step: "03 / 06",
          badge: "التشخيص واختيار المسار",
          title: "كل حالة لها طريق مختلف",
          subtitle: "التشخيص الدقيق هو البداية لاختيار العلاج المناسب",
          prompt: "ما الذي تعاني منه؟",
          type: "condition_selector"
        },
        {
          // Chapter 4: Diagnostic Facilities
          step: "04 / 06",
          badge: "مرافق الفحص والتشخيص",
          title: "التشخيص الصحيح يحدد الخطوة المناسبة",
          subtitle: "نبدأ بفهم الأعراض والفحص السريري، ثم الأشعة المناسبة للحالة عند الحاجة",
          desc: "رؤية شاملة لسلامة الغضاريف والأربطة لضمان اختيار بروتوكول العلاج الصحيح بدقة ومن دون تخمين.",
          tags: ["الرنين المغناطيسي MRI", "الأشعة السينية X-Ray"],
          primaryAction: "متابعة الجولة",
          type: "diagnostics"
        },
        {
          // Chapter 5: Expertise and Proof
          step: "05 / 06",
          badge: "الخبرة والنتائج",
          title: "حالات حقيقية وخطوات مدروسة",
          subtitle: "الحفاظ على المفصل أولوية قبل أي تدخل جراحي",
          desc: "خطط علاجية مخصصة تشمل الحقن التجديدي والعلاج التداخلي، وصولاً إلى أدق جراحات المناظير فقط عند الضرورة.",
          primaryAction: "شاهد معايير التعافي والخبرة",
          type: "proof"
        },
        {
          // Chapter 6: Return to Reception and Booking Close
          step: "06 / 06",
          badge: "الاستقبال وحجز الموعد",
          title: "وصلنا للاستقبال... والخطوة الجاية موعدك",
          subtitle: "اختر العيادة المناسبة (الشارقة أو عجمان) واترك بياناتك",
          desc: "سيتواصل معك فريق المواعيد لمساعدتك في اختيار الوقت الأنسب وبدء رحلة التعافي.",
          primaryAction: "احجز موعدك الآن",
          secondaryAction: "واتساب مباشر",
          type: "booking_close"
        }
      ],
      conditions: [
        { id: 'limb_deformity', label: 'تقوس وتشوهات الأطراف' },
        { id: 'limb_lengthening', label: 'تطويل الأطراف' },
        { id: 'knee_osteoarthritis', label: 'خشونة الركبة وتغيير المفصل' },
        { id: 'sports_injuries', label: 'إصابات الملاعب والأربطة' },
        { id: 'arthroscopy', label: 'مناظير الركبة والكاحل' },
      ],
      modal: {
        title: "طلب حجز استشارة طبية",
        subtitle: "مع د. محمد كمال علي - استشاري جراحة العظام والمناظير",
        nameLabel: "الاسم الكامل",
        namePlaceholder: "أدخل اسمك الكريم",
        phoneLabel: "رقم الهاتف / الواتساب",
        phonePlaceholder: "مثال: 0501234567",
        branchLabel: "اختر مكان الموعد",
        conditionLabel: "ما هي الحالة التي ترغب في استشارة الدكتور بشأنها؟",
        preferredContactLabel: "طريقة التواصل المفضلة",
        contactWhatsapp: "رسالة واتساب",
        contactCall: "اتصال هاتفي",
        consentLabel: "أوافق على التواصل معي بخصوص طلب الموعد",
        submitBtn: "إرسال طلب الحجز",
        whatsAppBtn: "تواصل فوري عبر واتساب",
        successMsg: "استلمنا طلبك بنجاح. سيتواصل معك فريق المواعيد لتأكيد التفاصيل.",
        successNote: "ملاحظة: هذا طلب موعد وسيقوم فريق العيادة بتأكيد الموعد النهائي معك.",
        closeBtn: "إغلاق",
      },
      doctorModal: {
        title: "الملف المهني والاعتمادات السريرية",
        subtitle: "د. محمد كمال علي",
        role: "استشاري جراحة العظام والمناظير وإصابات الملاعب",
        experienceBadge: "أكثر من 20 عاماً من الخبرة الجراحية والسريرية المتقدمة",
        philosophy: "الحفاظ على المفصل الطبيعي هو غايتنا الأولى - التدخل الجراحي لا يتم إلا بعد استنفاد كافة بروتوكولات العلاج التحفظي والتجديدي المتطور.",
        credentials: [
          "استشاري معتمد لدى وزارة الصحة ووقاية المجتمع (MOHAP - الإمارات)",
          "عضو فاعل بالجمعية الدولية لجراحة الركبة والمناظير والطب الرياضي (ISAKOS)",
          "زمالة الجراحات المتقدمة لمناظير المفاصل وتقويم تشوهات الأطراف",
          "أكثر من 5,000 حالة وجراحة مفصلية ناجحة في كبرى المستشفيات"
        ],
        subspecialties: [
          {
            title: "مناظير الركبة والكتف المتقدمة",
            desc: "إصلاح قطع الرباط الصليبي (ACL)، خياطة وترميم الغضاريف الهلالية، وتثبيت أوتار الكتف الدقيقة بالمنظار."
          },
          {
            title: "علاج الخشونة بالحقن التجديدي",
            desc: "بروتوكولات حقن البلازما (PRP) وحمض الهيالورونيك المركّز لحماية الغضاريف وتسكين الآلام المفصلية."
          },
          {
            title: "تصحيح تقوس وتشوهات الأطراف",
            desc: "تقويم انحراف الساقين وإعادة موازنة محور التحميل الميكانيكي على الركبة لحمايتها من التآكل المبكر."
          },
          {
            title: "إصابات الملاعب والتأهيل الرياضي",
            desc: "برامج علاجية واستشفاء مكثف لتمكين الرياضيين من العودة السريعة والآمنة للملاعب والمنافسة."
          }
        ],
        hospitals: [
          {
            name: "مستشفى دار الكمال",
            city: "الشارقة",
            badge: "عمليات واستشارات",
            desc: "أجنحة جراحية رقمية مجهزة بأعلى معايير التعقيم العالمية ومراكز أشعة متقدمة."
          },
          {
            name: "مركز العلاج الطبي",
            city: "عجمان",
            badge: "عيادات واستشارات",
            desc: "فحص سريري متقدم، تخطيط علاجي مخصص، ووحدات حقن المفاصل التجديدي الموجه."
          }
        ],
        photos: [
          { id: 'coat', label: 'الرداء السريري', src: '/doctor/dr-coat.png' },
          { id: 'suit', label: 'الاستشارة الرسمية', src: '/doctor/dr-suit.png' },
          { id: 'clinic', label: 'فحص العيادة', src: '/doctor/dr-clinic.png' }
        ],
        ctaBooking: "احجز استشارة مع الدكتور",
        ctaWhatsapp: "محادثة فورية مع العيادة",
        ctaCall: "اتصال هاتفي"
      },
      proofModal: {
        title: "حالات حقيقية وخطوات مدروسة",
        subtitle: "معايير التعافي والبروتوكولات الطبية المعتمدة",
        stats: [
          { num: "98%", title: "نسبة رضا المرضى", desc: "عن خطط العلاج التحفظي وتسكين الآلام" },
          { num: "+20", title: "عاماً من الخبرة", desc: "في تشخيص وعلاج أدق إصابات المفاصل" },
          { num: "100%", title: "فحص مخصص", desc: "بروتوكول علاجي مفصل لكل مريض على حدة" },
        ],
        cta: "ابدأ استشارتك اليوم"
      }
    },
    en: {
      drName: "Dr. Mohamed Kamal Ali",
      drTitle: "Consultant Orthopedic & Arthroscopic Surgeon",
      bookConsultation: "Book Appointment",
      navHome: "HOME",
      navDoctor: "DOCTOR",
      navDiagnostics: "DIAGNOSTICS",
      navBooking: "BOOKING",
      langSwitch: "العربية",
      branches: {
        sharjah: "Sharjah: Dar Al Kamal Hospital",
        ajman: "Ajman: Medical Treatment Center",
      },
      chapters: [
        {
          step: "01 / 06",
          badge: "WELCOME TO THE CLINIC",
          title: "Movement Is Life",
          subtitle: "Consultant Orthopedic & Joint Preservation Care",
          desc: "Welcome to the digital clinic experience of Dr. Mohamed Kamal Ali. Personalized orthopedic care designed to eliminate pain and restore your active mobility.",
          primaryAction: "Begin Clinic Tour",
          secondaryAction: "Quick Booking",
          type: "standard"
        },
        {
          step: "02 / 06",
          badge: "CLINICAL APPROACH",
          title: "Medical Care Starts with Understanding",
          subtitle: "I am Dr. Mohamed Kamal Ali, Consultant Orthopedic Surgeon",
          desc: "My goal is that you fully understand your condition and therapy options clearly before taking any step.",
          primaryAction: "Meet the Doctor",
          type: "doctor_intro"
        },
        {
          step: "03 / 06",
          badge: "DIAGNOSIS & PATHWAYS",
          title: "Every Condition Has a Distinct Path",
          subtitle: "Accurate diagnosis is the foundation of appropriate treatment",
          prompt: "What are you experiencing?",
          type: "condition_selector"
        },
        {
          step: "04 / 06",
          badge: "DIAGNOSTIC FACILITIES",
          title: "Accurate Diagnosis Guides the Right Step",
          subtitle: "We begin with symptoms & clinical exam, ordering targeted imaging only when indicated",
          desc: "High-resolution evaluation of cartilage and ligament integrity ensuring precision decision-making without guesswork.",
          tags: ["High-Resolution MRI", "Digital X-Ray"],
          primaryAction: "Continue Journey",
          type: "diagnostics"
        },
        {
          step: "05 / 06",
          badge: "EXPERTISE & PROOF",
          title: "Real Cases & Deliberate Steps",
          subtitle: "Joint preservation is our priority before considering surgical intervention",
          desc: "Custom pathways combining regenerative biologics, targeted injections, and minimally invasive arthroscopy only when strictly indicated.",
          primaryAction: "View Credentials & Proof",
          type: "proof"
        },
        {
          step: "06 / 06",
          badge: "RECEPTION & BOOKING",
          title: "Back to Reception... Next Step is Booking",
          subtitle: "Select your preferred clinic (Sharjah or Ajman) and leave your details",
          desc: "Our appointment coordination team will reach out to schedule your preferred consultation time.",
          primaryAction: "Book Consultation Now",
          secondaryAction: "Direct WhatsApp",
          type: "booking_close"
        }
      ],
      conditions: [
        { id: 'limb_deformity', label: 'Limb Deformity & Alignment' },
        { id: 'limb_lengthening', label: 'Limb Lengthening' },
        { id: 'knee_osteoarthritis', label: 'Knee Osteoarthritis & Joint Replacement' },
        { id: 'sports_injuries', label: 'Sports Injuries & ACL Trauma' },
        { id: 'arthroscopy', label: 'Knee & Ankle Arthroscopy' },
      ],
      modal: {
        title: "Request a Consultation",
        subtitle: "Directly with Dr. Mohamed Kamal Ali - Orthopedic Consultant",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your full name",
        phoneLabel: "Phone / WhatsApp Number",
        phonePlaceholder: "e.g. +971 50 123 4567",
        branchLabel: "Select Appointment Location",
        conditionLabel: "What condition do you wish to consult about?",
        preferredContactLabel: "Preferred Contact Method",
        contactWhatsapp: "WhatsApp Message",
        contactCall: "Phone Call",
        consentLabel: "I agree to be contacted regarding this appointment request",
        submitBtn: "Submit Booking Request",
        whatsAppBtn: "Instant WhatsApp Concierge",
        successMsg: "Your request was received successfully. Our appointment team will contact you to confirm the time.",
        successNote: "Note: This is an appointment request. The clinic team will contact you to confirm the final slot.",
        closeBtn: "Close",
      },
      doctorModal: {
        title: "Professional Profile & Clinical Credentials",
        subtitle: "Dr. Mohamed Kamal Ali",
        role: "Consultant Orthopedic, Arthroscopy & Sports Medicine Surgeon",
        experienceBadge: "Over 20 Years of Advanced Clinical & Surgical Excellence",
        philosophy: "Joint preservation is our foremost mission. Surgical intervention is strictly the final, deliberate resort after exhausting evidence-based conservative and regenerative therapies.",
        credentials: [
          "Licensed Consultant by UAE Ministry of Health & Prevention (MOHAP)",
          "Active Member, International Society of Arthroscopy & Knee Surgery (ISAKOS)",
          "Fellowship in Advanced Arthroscopy & Limb Deformity Correction",
          "Proven track record of over 5,000 successful orthopedic and joint procedures"
        ],
        subspecialties: [
          {
            title: "Advanced Knee & Shoulder Arthroscopy",
            desc: "Minimally invasive ACL reconstruction, meniscus repair, and precision rotator cuff restoration."
          },
          {
            title: "Joint Preservation & Biologics",
            desc: "Targeted Platelet-Rich Plasma (PRP) and high-density hyaluronic acid injections to preserve joint cartilage."
          },
          {
            title: "Limb Deformity Correction & Alignment",
            desc: "Corrective osteotomy and realigning load-bearing biomechanics to prevent premature wear."
          },
          {
            title: "Sports Medicine & Fast-Track Recovery",
            desc: "Rapid-recovery sports medicine programs enabling athletes to safely return to peak competition."
          }
        ],
        hospitals: [
          {
            name: "Dar Al Kamal Hospital",
            city: "Sharjah",
            badge: "Surgery & Clinic",
            desc: "Equipped with digital ultra-clean laminar flow operating suites and advanced imaging."
          },
          {
            name: "Medical Treatment Center",
            city: "Ajman",
            badge: "Consultation & Therapy",
            desc: "Specialized clinical diagnosis, joint preservation planning, and guided injections."
          }
        ],
        photos: [
          { id: 'coat', label: 'Clinical Coat', src: '/doctor/dr-coat.png' },
          { id: 'suit', label: 'Executive Suite', src: '/doctor/dr-suit.png' },
          { id: 'clinic', label: 'Clinic Exam', src: '/doctor/dr-clinic.png' }
        ],
        ctaBooking: "Book Consultation with Dr. Kamal",
        ctaWhatsapp: "Direct WhatsApp Concierge",
        ctaCall: "Call Practice"
      },
      proofModal: {
        title: "Proven Outcomes & Standards",
        subtitle: "Evidence-Based Protocols & Joint Preservation",
        stats: [
          { num: "98%", title: "Patient Satisfaction", desc: "With conservative pain relief pathways" },
          { num: "+20", title: "Years Experience", desc: "Specializing in complex joint care" },
          { num: "100%", title: "Tailored Care", desc: "Individualized protocol for each patient" },
        ],
        cta: "Start Your Healing Journey"
      }
    }
  };

  const current = t[lang];

  // Scroll to chapter in timeline
  const scrollToChapter = (chapterIndex: number) => {
    const st = ScrollTrigger.getById("main-experience");
    if (st) {
      const progress = chapterIndex / 5;
      const targetY = st.start + (st.end - st.start) * progress;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // WhatsApp click handler with pre-filled message matching Developer Brief exactly:
  // "مرحباً د. محمد كمال علي. أرغب في حجز موعد استشارة. العيادة المفضلة: [الشارقة أو عجمان]، الحالة: [الحالة]."
  const handleWhatsAppClick = () => {
    const branchName = selectedBranch === 'sharjah' 
      ? (lang === 'ar' ? 'الشارقة (مستشفى دار الكمال)' : 'Sharjah (Dar Al Kamal Hospital)') 
      : (lang === 'ar' ? 'عجمان (مركز العلاج الطبي)' : 'Ajman (Medical Treatment Center)');
    const conditionObj = current.conditions.find(c => c.id === selectedCondition);
    const conditionText = conditionObj ? conditionObj.label : (lang === 'ar' ? 'استشارة عظام ومفاصل' : 'Orthopedic Consultation');
    
    const message = lang === 'ar'
      ? encodeURIComponent(`مرحباً د. محمد كمال علي. أرغب في حجز موعد استشارة.\nالعيادة المفضلة: ${branchName}\nالحالة: ${conditionText}`)
      : encodeURIComponent(`Hello Dr. Mohamed Kamal Ali. I would like to request a consultation appointment.\nPreferred Clinic: ${branchName}\nCondition: ${conditionText}`);
    
    window.open(`https://wa.me/971500000000?text=${message}`, '_blank');
  };

  // Floating Action Menu Buttons tailored to Clinic Experience
  const floatingActions: ActionIcon[] = [
    {
      Icon: Globe,
      onClick: () => setLang(prev => (prev === 'ar' ? 'en' : 'ar')),
      label: lang === 'ar' ? 'English (EN)' : 'العربية (AR)',
      badge: lang === 'ar' ? 'EN' : 'عربي',
      className: 'hover:border-sky-400 text-sky-300 hover:bg-sky-500/20 bg-sky-500/15 ring-1 ring-sky-400/40',
    },
    {
      Icon: Stethoscope,
      onClick: () => setIsDoctorBioOpen(true),
      label: lang === 'ar' ? 'عن الدكتور' : 'Doctor Bio',
      className: 'hover:border-[#8ab4f8] text-[#8ab4f8] hover:bg-[#1a73e8]/15',
    },
    {
      Icon: CalendarCheck,
      onClick: () => setIsBookingOpen(true),
      label: lang === 'ar' ? 'حجز موعد' : 'Book Visit',
      className: 'hover:border-[#8ab4f8] text-[#a8c7fa] hover:bg-[#1a73e8]/15',
    },
    {
      Icon: MessageCircle,
      onClick: handleWhatsAppClick,
      label: 'WhatsApp',
      className: 'hover:border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10',
    },
    {
      Icon: Activity,
      onClick: () => scrollToChapter(2),
      label: lang === 'ar' ? 'الأعراض والتشخيص' : 'Symptoms',
      className: 'hover:border-sky-400/50 text-sky-400 hover:bg-sky-500/10',
    },
    {
      Icon: Sparkles,
      onClick: () => {
        const el = document.getElementById('before-after-cases');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      label: lang === 'ar' ? 'قبل وبعد' : 'Before & After',
      className: 'hover:border-amber-400/50 text-amber-300 hover:bg-amber-500/10',
    },
    {
      Icon: Phone,
      href: 'tel:+971500000000',
      label: lang === 'ar' ? 'اتصال بالعيادة' : 'Call Clinic',
      className: 'hover:border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10',
    },
  ];

  // GSAP ScrollTrigger and Single Video Scrubbing
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    
    // Explicitly set DOM properties for bulletproof mobile/desktop permission
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.currentTime = 0.001; // Force display of frame 1 immediately

    // Crucial for Mobile iOS & Android: Unlock video decoding on first touch or scroll
    let isUnlocked = false;
    const unlockVideo = () => {
      if (isUnlocked) return;
      isUnlocked = true;
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
    };

    window.addEventListener('touchstart', unlockVideo, { passive: true });
    window.addEventListener('click', unlockVideo, { passive: true });
    window.addEventListener('scroll', unlockVideo, { passive: true });

    const ctx = gsap.context(() => {
      const duration = (video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : 27;

      const tl = gsap.timeline({
        id: "main-experience",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1.2, // Smooth interpolation prevents stutter
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * 6), 5);
            setCurrentChapter(idx);
          }
        }
      });

      // 1. Scrub single video from start to finish with dynamic duration evaluation
      tl.fromTo(
        video, 
        { currentTime: 0 }, 
        { 
          currentTime: () => (video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 26), 
          ease: "none", 
          duration: 12 
        }, 
        0
      );

      // 2. Animate the 6 slides over the video (smooth bottom-side float)
      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        const startTime = i * 2;
        const endTime = startTime + 1.8;

        if (i === 0) {
          // Slide 1 starts visible, fades out
          tl.to(slide, { opacity: 0, y: -20, scale: 0.98, duration: 0.5, ease: "power2.in" }, startTime + 1.4);
        } else if (i === slidesRef.current.length - 1) {
          // Slide 6 fades in and stays
          tl.fromTo(slide, 
            { opacity: 0, y: 30, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, 
            startTime
          );
        } else {
          // Slides 2 to 5 fade in, stay, fade out
          tl.fromTo(slide, 
            { opacity: 0, y: 30, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, 
            startTime
          );
          tl.to(slide, 
            { opacity: 0, y: -20, scale: 0.98, duration: 0.5, ease: "power2.in" }, 
            endTime
          );
        }
      });

    }, containerRef);

    // Refresh when video metadata finishes loading
    const handleLoadedMetadata = () => {
      ScrollTrigger.refresh();
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      ctx.revert();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('touchstart', unlockVideo);
      window.removeEventListener('click', unlockVideo);
      window.removeEventListener('scroll', unlockVideo);
    };
  }, [lang]);

  return (
    <div 
      suppressHydrationWarning
      className={`min-h-screen text-white selection:bg-[#1a73e8] selection:text-white font-inter overflow-x-hidden ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 0. LUXURY PRELOADER (AWAITING VIDEO & CRITICAL ASSETS) */}
      <Preloader videoRef={videoRef} lang={lang} />

      {/* 1. FIXED BACKGROUND VIDEO (SINGLE HIGH-PERFORMANCE PLAYER) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/full_clinic_tour.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-cover select-none"
        />
        {/* Subtle, Restrained Gradient - Keeps Top 70% of Screen Crystal Clear for Video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b13]/90 via-[#060b13]/25 to-black/35" />
      </div>

      {/* 2. DOCKED LUXURY FROSTED GLASS ISLAND HEADER */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div 
          onClick={() => scrollToChapter(0)}
          className="flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/20 hover:bg-white/25 backdrop-blur-2xl border-x border-b border-t-0 border-white/35 rounded-b-2xl sm:rounded-b-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-300 group select-none"
          title={current.drName}
        >
          {/* Official Doctor Joint Emblem */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 bg-white/30 backdrop-blur-md shadow-sm shrink-0 flex items-center justify-center">
            <Image
              src="/doctor-emblem.png"
              alt="Doctor Emblem"
              width={32}
              height={32}
              className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
              priority
            />
          </div>

          {/* Thin subtle vertical divider */}
          <div className="w-[1px] h-5 bg-white/30 shrink-0" />

          {/* Official Doctor Name Typography Logo */}
          <div className="relative h-6 sm:h-7 w-28 sm:w-32 shrink-0 flex items-center">
            <Image
              src="/doctor-typography-light.png"
              alt="د. محمد كمال علي"
              fill
              sizes="(max-width: 640px) 112px, 128px"
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              priority
            />
          </div>
        </div>
      </header>

      {/* 3. MINIMALIST SIDE CHAPTER INDICATOR (DESKTOP) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 pointer-events-auto">
        {current.chapters.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => scrollToChapter(idx)}
            className="group flex items-center gap-2.5 text-right focus:outline-none"
          >
            <span className={`text-[10px] font-medium transition-all opacity-0 group-hover:opacity-100 ${currentChapter === idx ? 'opacity-100 text-[#8ab4f8]' : 'text-gray-400'}`}>
              {ch.badge}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentChapter === idx ? 'bg-[#8ab4f8] scale-125 ring-2 ring-[#8ab4f8]/30' : 'bg-white/30 group-hover:bg-white/70'}`} />
          </button>
        ))}
      </aside>

      {/* 4. PINNED MAIN SCROLL EXPERIENCE - DOCKED AT BOTTOM-SIDE TO NEVER BLOCK THE VIDEO */}
      <main ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {/* DOCKED AT BOTTOM-START: Leaves 75% of Upper Screen Free to View the Video Subject! */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-3 sm:p-6 md:p-10 pb-20 md:pb-14 items-start">
          {current.chapters.map((ch, idx) => (
            <div
              key={idx}
              ref={el => { if (slidesRef.current) slidesRef.current[idx] = el; }}
              className={`absolute bottom-20 md:bottom-12 start-3 sm:start-6 md:start-12 w-[calc(100%-1.5rem)] sm:w-auto sm:max-w-md md:max-w-lg p-4 md:p-5 rounded-2xl backdrop-blur-2xl bg-[#131314]/80 border border-white/15 shadow-2xl transition-all ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                pointerEvents: currentChapter === idx ? 'auto' : 'none'
              }}
            >
              {/* Micro Step Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a73e8]/15 border border-[#1a73e8]/30 text-[#8ab4f8] text-[10px] font-semibold tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8] animate-pulse" />
                <span>{ch.step}</span>
                <span className="text-white/40">•</span>
                <span>{ch.badge}</span>
              </div>

              {/* Title & Subtitle with restrained, ultra-clean sizes */}
              <h2 className="text-lg md:text-xl font-extrabold text-white mb-1 leading-snug drop-shadow-sm">
                {ch.title}
              </h2>
              <p className="text-[11px] md:text-xs text-[#8ab4f8] font-medium mb-2 leading-relaxed">
                {ch.subtitle}
              </p>

              {/* Specific Content Type Handler */}
              {ch.type === "condition_selector" ? (
                /* Chapter 3 Interactive Condition Selector */
                <div className="my-2.5">
                  <p className="text-[11px] text-gray-200 font-semibold mb-2 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-[#8ab4f8]" />
                    <span>{ch.prompt}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {current.conditions.map((cond) => {
                      const isSelected = selectedCondition === cond.id;
                      return (
                        <button
                          key={cond.id}
                          onClick={() => {
                            setSelectedCondition(cond.id);
                            setIsBookingOpen(true);
                          }}
                          className={`text-[10px] md:text-[11px] px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-start ${isSelected ? 'border-[#8ab4f8] bg-[#1a73e8]/25 text-white font-bold shadow-[0_0_15px_rgba(138,180,248,0.25)]' : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#8ab4f8]' : 'bg-gray-500'}`} />
                          <span>{cond.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : ch.type === "diagnostics" && ch.tags ? (
                /* Chapter 4 Diagnostics Tags */
                <div className="mb-3">
                  <p className="text-[10px] md:text-[11px] text-gray-300 font-light leading-relaxed mb-2">
                    {ch.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    {ch.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-200 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Standard Description */
                <p className="text-[10px] md:text-[11px] text-gray-300 font-light leading-relaxed mb-3">
                  {ch.desc}
                </p>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                {ch.type === "doctor_intro" ? (
                  <button 
                    onClick={() => setIsDoctorBioOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-4 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{ch.primaryAction}</span>
                  </button>
                ) : ch.type === "proof" ? (
                  <button 
                    onClick={() => setIsProofOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-4 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{ch.primaryAction}</span>
                  </button>
                ) : ch.type === "booking_close" ? (
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-[0_4px_20px_rgba(26,115,232,0.5)] transition-all transform hover:scale-102 animate-pulse"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>{ch.primaryAction}</span>
                  </button>
                ) : idx < 5 ? (
                  <button 
                    onClick={() => scrollToChapter(idx + 1)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-4 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102"
                  >
                    <span>{ch.primaryAction}</span>
                    {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                ) : null}

                {/* Instant WhatsApp Quick Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] md:text-[11px] font-semibold transition-all"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Locations & Before/After CTA on last slide */}
              {idx === 5 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('before-after-cases');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-[#8ab4f8] hover:text-white text-[10px] md:text-[11px] font-bold transition-all shadow-sm group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8ab4f8] group-hover:scale-110 transition-transform" />
                    <span>{isRtl ? 'شاهد نتائج الحالات السريرية (قبل وبعد) ↓' : 'View Clinical Case Results (Before & After) ↓'}</span>
                  </button>
                  <div className="flex flex-wrap gap-2 text-[9px] md:text-[10px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8ab4f8]" />
                      <span>{current.branches.sharjah}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8ab4f8]" />
                      <span>{current.branches.ajman}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 5. BEFORE & AFTER + CONTACT FORM SECTION (below the pinned scroll) */}
      <BeforeAfterSection lang={lang} />

      {/* 6. FLOATING FROSTED GLASS ACTION MENU */}
      <aside 
        aria-label="Clinic Actions Menu"
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <AnimatedSocialIcons 
          icons={floatingActions}
          iconSize={19}
          triggerLabel={lang === 'ar' ? 'القائمة التفاعلية السريعة' : 'Quick Actions'}
        />
      </aside>

      {/* 7. COMPLETE LUXURY DOCTOR PROFILE MODAL */}
      {isDoctorBioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0c1527]/95 border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden max-h-[92vh] flex flex-col">
            
            {/* Modal Header Bar with Close Button */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8ab4f8] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#8ab4f8] tracking-wider uppercase">
                  {current.doctorModal.title}
                </span>
              </div>
              <button 
                onClick={() => setIsDoctorBioOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              
              {/* Doctor Main Showcase & Photo Switcher */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  
                  {/* Large Doctor Photo with Glowing Border */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#8ab4f8]/40 shadow-xl shrink-0 bg-[#040810]">
                    <Image 
                      src={
                        doctorActivePhoto === 'suit' 
                          ? "/doctor/dr-suit.png" 
                          : doctorActivePhoto === 'clinic' 
                          ? "/doctor/dr-clinic.png" 
                          : "/doctor/dr-coat.png"
                      }
                      alt={current.drName}
                      fill
                      priority
                      className="object-cover object-top transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b13]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Doctor Info & Titles */}
                  <div className="text-center sm:text-start flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a73e8]/15 border border-[#1a73e8]/30 text-[#8ab4f8] text-[9px] font-bold mb-1.5">
                      <Award className="w-3 h-3 text-[#8ab4f8]" />
                      <span>{current.doctorModal.experienceBadge}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                      {current.drName}
                    </h2>
                    <p className="text-xs text-gray-300 font-medium mt-1 leading-snug">
                      {current.doctorModal.role}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2 text-[9px] text-gray-400">
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        <MapPin className="w-2.5 h-2.5 text-[#8ab4f8]" />
                        <span>الشارقة • عجمان</span>
                      </span>
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                        <span>MOHAP Certified</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo Switcher Buttons (View All Real Doctor Photos) */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
                  <span className="text-[9px] text-gray-400 font-medium">
                    {lang === 'ar' ? 'معرض الصور:' : 'Photo Views:'}
                  </span>
                  {current.doctorModal.photos.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setDoctorActivePhoto(photo.id as 'coat' | 'suit' | 'clinic')}
                      className={`text-[9px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium flex items-center gap-1 ${
                        doctorActivePhoto === photo.id
                          ? 'bg-[#1a73e8] text-white border-[#8ab4f8] shadow-md font-bold'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{photo.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Medical Philosophy Quote Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1a73e8]/15 to-transparent border border-[#8ab4f8]/30 relative">
                <Quote className="w-5 h-5 text-[#8ab4f8]/40 absolute top-3 end-3" />
                <span className="text-[10px] font-bold text-[#8ab4f8] uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'النهج الطبي والفلسفة السريرية' : 'Clinical Philosophy'}
                </span>
                <p className="text-xs text-gray-200 leading-relaxed font-light italic">
                  &ldquo;{current.doctorModal.philosophy}&rdquo;
                </p>
              </div>

              {/* Accreditations & Credentials */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 px-1">
                  <Award className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{lang === 'ar' ? 'الاعتمادات والمؤهلات الدولية' : 'Credentials & Fellowships'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.doctorModal.credentials.map((cred, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2 text-[10px] text-gray-300 leading-snug">
                      <CheckCircle className="w-3.5 h-3.5 text-[#8ab4f8] shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Subspecialties */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 px-1">
                  <Stethoscope className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{lang === 'ar' ? 'مجالات الاختصاص والتميز السريري' : 'Clinical Subspecialties'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.doctorModal.subspecialties.map((sub, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
                      <span className="text-[10px] font-bold text-[#8ab4f8] block mb-0.5">
                        {sub.title}
                      </span>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hospital Affiliations & Locations */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 px-1">
                  <Building2 className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{lang === 'ar' ? 'المستشفيات والعيادات المعتمدة' : 'Practice Locations'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.doctorModal.hospitals.map((hosp, hIdx) => (
                    <div key={hIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-white">
                          {hosp.name}
                        </span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#1a73e8]/20 text-[#8ab4f8] font-semibold">
                          {hosp.city}
                        </span>
                      </div>
                      <p className="text-[9px] text-gray-400 leading-snug">
                        {hosp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Actions Footer */}
            <div className="p-3 sm:p-4 bg-[#08101e] border-t border-white/10 shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsDoctorBioOpen(false);
                  setIsBookingOpen(true);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-white" />
                <span className="truncate">{current.doctorModal.ctaBooking}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDoctorBioOpen(false);
                  handleWhatsAppClick();
                }}
                className="shrink-0 py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline sm:inline">WhatsApp</span>
              </button>

              <a
                href="tel:+971500000000"
                className="shrink-0 p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                title={current.doctorModal.ctaCall}
              >
                <Phone className="w-3.5 h-3.5 text-[#8ab4f8]" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* 7. MODAL 2: EXPERTISE & PROOF MODAL (CHAPTER 5) */}
      {isProofOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0c1527] border border-white/15 rounded-3xl p-5 md:p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsProofOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#8ab4f8]/40 shrink-0 bg-[#070e1b]">
                <Image 
                  src="/doctor/dr-coat.png" 
                  alt="Dr. Mohamed Kamal Ali Clinical" 
                  fill 
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[#8ab4f8] text-[10px] font-semibold uppercase tracking-wider block">
                  {current.proofModal.subtitle}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {current.proofModal.title}
                </h3>
              </div>
            </div>

            {/* Key Metric Cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {current.proofModal.stats.map((s, sIdx) => (
                <div key={sIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="text-sm md:text-base font-extrabold text-[#8ab4f8] block">{s.num}</span>
                  <span className="text-[9px] font-bold text-white block mt-0.5">{s.title}</span>
                  <span className="text-[8px] text-gray-400 block mt-0.5 leading-tight">{s.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
              {lang === 'ar' 
                ? 'نؤمن في عيادتنا بأن الجراحة هي الخيار الأخير. نبدأ دائماً بالحلول التحفظية والتقنيات التجديدية المعتمدة للحفاظ على مفاصلك الطبيعية.' 
                : 'In our practice, surgery is considered the final resort. We always prioritize conservative and regenerative therapies to preserve your natural joints.'}
            </p>

            <button
              onClick={() => {
                setIsProofOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>{current.proofModal.cta}</span>
            </button>
          </div>
        </div>
      )}

      {/* 8. MODAL 3: EXACT DEVELOPER BRIEF BOOKING MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0a111e] border border-white/15 rounded-3xl p-5 md:p-6 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => { setIsBookingOpen(false); setBookingSubmitted(false); }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1.5">
                  {lang === 'ar' ? 'شكراً لثقتكم' : 'Thank You'}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed mb-2 font-medium">
                  {current.modal.successMsg}
                </p>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-5">
                  {current.modal.successNote}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{current.modal.whatsAppBtn}</span>
                  </button>
                  <button
                    onClick={() => { setIsBookingOpen(false); setBookingSubmitted(false); }}
                    className="w-full py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-[11px] font-semibold transition-all"
                  >
                    {current.modal.closeBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-1.5 text-[#8ab4f8] text-[10px] font-semibold mb-1">
                  <Stethoscope className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{current.drName}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-0.5">
                  {current.modal.title}
                </h3>
                <p className="text-[10px] text-gray-300 mb-4">
                  {current.modal.subtitle}
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!consentChecked) return;
                    setBookingSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  {/* Clinic Location Selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                      {current.modal.branchLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBranch('sharjah')}
                        className={`p-2 rounded-xl border text-[11px] font-medium text-center transition-all flex flex-col items-center gap-0.5 ${selectedBranch === 'sharjah' ? 'border-[#8ab4f8] bg-[#1a73e8]/25 text-[#a8c7fa]' : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'}`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#8ab4f8]" />
                        <span className="font-bold">{lang === 'ar' ? 'الشارقة' : 'Sharjah'}</span>
                        <span className="text-[9px] opacity-75">{lang === 'ar' ? 'مستشفى دار الكمال' : 'Dar Al Kamal'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedBranch('ajman')}
                        className={`p-2 rounded-xl border text-[11px] font-medium text-center transition-all flex flex-col items-center gap-0.5 ${selectedBranch === 'ajman' ? 'border-[#8ab4f8] bg-[#1a73e8]/25 text-[#a8c7fa]' : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'}`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#8ab4f8]" />
                        <span className="font-bold">{lang === 'ar' ? 'عجمان' : 'Ajman'}</span>
                        <span className="text-[9px] opacity-75">{lang === 'ar' ? 'مركز العلاج الطبي' : 'Medical Center'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Condition Selection Dropdown / Radio */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      {current.modal.conditionLabel}
                    </label>
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="w-full bg-[#08101e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8ab4f8]"
                    >
                      {current.conditions.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#08101e] text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      {current.modal.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={current.modal.namePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      {current.modal.phoneLabel}
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder={current.modal.phonePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] transition-colors"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      {current.modal.preferredContactLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredContact('whatsapp')}
                        className={`py-1.5 px-2 rounded-xl border text-[10px] font-medium transition-all flex items-center justify-center gap-1.5 ${preferredContact === 'whatsapp' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300' : 'border-white/10 bg-white/5 text-gray-400'}`}
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>{current.modal.contactWhatsapp}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredContact('call')}
                        className={`py-1.5 px-2 rounded-xl border text-[10px] font-medium transition-all flex items-center justify-center gap-1.5 ${preferredContact === 'call' ? 'border-[#8ab4f8] bg-[#1a73e8]/25 text-[#a8c7fa]' : 'border-white/10 bg-white/5 text-gray-400'}`}
                      >
                        <Phone className="w-3 h-3" />
                        <span>{current.modal.contactCall}</span>
                      </button>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-2 pt-1 cursor-pointer">
                    <input 
                      type="checkbox"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5 accent-[#1a73e8] rounded"
                    />
                    <span className="text-[10px] text-gray-300 leading-snug">
                      {current.modal.consentLabel}
                    </span>
                  </label>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button 
                      type="submit"
                      disabled={!consentChecked}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-extrabold text-xs shadow-[0_4px_20px_rgba(26,115,232,0.4)] transition-all disabled:opacity-50"
                    >
                      {current.modal.submitBtn}
                    </button>

                    <button 
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="w-full py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{current.modal.whatsAppBtn}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
