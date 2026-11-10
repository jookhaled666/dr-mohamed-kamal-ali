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
  Globe,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { AnimatedSocialIcons, ActionIcon } from '@/components/ui/floating-action-button';
import { Preloader } from '@/components/ui/preloader';
import { BeforeAfterSection } from '@/components/ui/before-after-section';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

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
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  
  // Interactive Glassy Navigation Arrows (Glow with scroll direction)
  const [activeDirection, setActiveDirection] = useState<'down' | 'up' | null>(null);
  const directionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setScrollDir = (dir: 'down' | 'up') => {
    setActiveDirection(dir);
    if (directionTimerRef.current) clearTimeout(directionTimerRef.current);
    directionTimerRef.current = setTimeout(() => {
      setActiveDirection(null);
    }, 650);
  };
  
  // Booking Form State (matching Developer Brief exactly)
  const [selectedBranch, setSelectedBranch] = useState<'sharjah' | 'ajman'>('sharjah');
  const [selectedCondition, setSelectedCondition] = useState('knee_osteoarthritis');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call'>('whatsapp');
  const [consentChecked, setConsentChecked] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
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
      drTitle: "استشاري جراحة العظام والمفاصل وإصابات الملاعب",
      bookConsultation: "احجز استشارتك",
      navHome: "الرئيسية",
      navDoctor: "الدكتور",
      navDiagnostics: "التشخيص",
      navBooking: "حجز موعد",
      langSwitch: "EN",
      branches: {
        sharjah: "الشارقة: مستشفى دار الكمال (خيار حجز المستشفى)",
        ajman: "عجمان: مركز العلاج الطبي (خيار حجز العيادة / المركز الطبي)",
      },
      chapters: [
        {
          // Chapter 1: Reception Arrival
          step: "01 / 06",
          badge: "الاستقبال والترحيب",
          title: "الحركة هي الحياة",
          subtitle: "استشاري جراحة العظام والمفاصل وإصابات الملاعب",
          desc: "أهلاً بك في عيادتي الرقمية. أنا الدكتور محمد كمال علي، يسعدني أن أصطحبك في جولة تتعرّف خلالها على خبرتي الطبية ومجالات تخصصي، وكيف نصل إلى التشخيص الدقيق ونختار العلاج الأنسب لكل حالة.",
          primaryAction: "ابدأ الجولة الطبية",
          secondaryAction: "حجز موعد سريع",
          type: "standard"
        },
        {
          // Chapter 2: Doctor Office
          step: "02 / 06",
          badge: "السيرة والنهج الطبي",
          title: "خبرة علمية وجراحية تمتد لأكثر من 25 عاماً",
          subtitle: "حاصل على زمالة البورد الأوروبي لجراحة العظام والكسور (EBOT)",
          desc: "امتدت مسيرتي المهنية عبر مصر والسعودية وسلطنة عُمان والإمارات، وتولّيت خلالها مسؤوليات طبية وجراحية وقيادية متعددة. هدفي أن يفهم كل مريض حالته والخيارات المتاحة له.",
          primaryAction: "تعرّف على الدكتور",
          type: "doctor_intro"
        },
        {
          // Chapter 3: From Office to Clinical Care
          step: "03 / 06",
          badge: "التشخيص واختيار المسار",
          title: "كل حالة لها طبيعتها… ولكل علاج معاييره",
          subtitle: "تختلف أمراض وإصابات العظام والمفاصل في أسبابها ودرجة تعقيدها، ولذلك لا توجد خطة علاجية واحدة تناسب جميع المرضى",
          prompt: "ما الذي تعاني منه؟",
          type: "condition_selector"
        },
        {
          // Chapter 4: Diagnostic Facilities
          step: "04 / 06",
          badge: "الفحص والتشخيص الدقيق",
          title: "التشخيص الدقيق هو أساس القرار العلاجي",
          subtitle: "لا يعتمد اختيار العلاج على نتائج الأشعة وحدها، بل على الفحص السريري وطبيعة الأعراض ودرجة الإصابة",
          desc: "نبدأ بالتقييم السريري الشامل، ثم الفحوصات التكميلية عند الحاجة. الهدف هو الوصول لتشخيص دقيق يحدد المسار العلاجي الصحيح لكل حالة.",
          tags: ["الرنين المغناطيسي MRI", "الأشعة السينية X-Ray", "التقييم السريري"],
          primaryAction: "متابعة الجولة",
          type: "diagnostics"
        },
        {
          // Chapter 5: Expertise and Proof
          step: "05 / 06",
          badge: "الخبرة والنتائج",
          title: "خبرة جراحية في التعامل مع الحالات المعقدة",
          subtitle: "أكثر من 500 عملية في مجال إعادة بناء الأطراف وتصحيح التشوهات",
          desc: "تتركز خبرتي في تطويل العظام وإعادة بناء الأطراف وتصحيح التشوهات، إلى جانب استبدال مفاصل الركبة والورك، ومناظير الركبة والكاحل، وعلاج الإصابات الرياضية والكسور المعقدة.",
          primaryAction: "شاهد معايير التعافي والخبرة",
          type: "proof"
        },
        {
          // Chapter 6: Return to Reception and Booking Close
          step: "06 / 06",
          badge: "الاستقبال وحجز الموعد",
          title: "وصلنا إلى نهاية جولتنا… وقد تكون هذه بداية رحلتك العلاجية",
          subtitle: "إذا كنت تعاني من مشكلة في العظام أو المفاصل، أو ترغب في رأي طبي متخصص",
          desc: "يمكنك حجز استشارة في أحد فروعنا بالشارقة أو عجمان. يسعدني تقييم حالتك ومساعدتك في اتخاذ القرار العلاجي المناسب.",
          primaryAction: "احجز موعدك الآن",
          secondaryAction: "واتساب مباشر",
          type: "booking_close"
        }
      ],
      conditions: [
        { id: 'limb_deformity', label: 'تقوس وتشوهات الأطراف' },
        { id: 'limb_lengthening', label: 'تطويل العظام واختلاف طول الأطراف' },
        { id: 'knee_osteoarthritis', label: 'خشونة الركبة واستبدال المفاصل' },
        { id: 'sports_injuries', label: 'إصابات الملاعب والأربطة' },
        { id: 'arthroscopy', label: 'مناظير الركبة والكاحل' },
        { id: 'fractures', label: 'الكسور وإعادة بناء العظام' },
        { id: 'general_consultation', label: 'استشارة عامة في جراحة العظام' },
      ],
      modal: {
        title: "طلب حجز استشارة طبية",
        subtitle: "مع د. محمد كمال علي - استشاري جراحة العظام والمفاصل",
        nameLabel: "الاسم الكامل",
        namePlaceholder: "أدخل اسمك الكريم",
        phoneLabel: "رقم الهاتف / الواتساب",
        phonePlaceholder: "مثال: 0545650678 أو 971545650678+",
        branchLabel: "اختر مكان الموعد",
        conditionLabel: "ما هي الحالة التي ترغب في استشارة الدكتور بشأنها؟",
        notesLabel: "ملاحظات إضافية أو وقت مفضل (اختياري)",
        notesPlaceholder: "مثال: أفضل المواعيد المسائية",
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
        role: "استشاري جراحة العظام والمفاصل وإصابات الملاعب",
        experienceBadge: "أكثر من 25 عاماً من الخبرة الجراحية والعلمية",
        philosophy: "لا يعتمد اختيار العلاج على نتائج الأشعة وحدها، بل على الفحص السريري، وطبيعة الأعراض، ودرجة الإصابة، وتأثيرها على وظيفة المفصل والحركة. هدفي أن يفهم كل مريض حالته والخيارات المتاحة له، وأن يكون القرار العلاجي مبنياً على أسس طبية واضحة.",
        credentials: [
          "زمالة البورد الأوروبي لجراحة العظام والكسور (EBOT) — 2012",
          "زمالة جراحة العظام — جامعة دوسلدورف، ألمانيا",
          "دراسات الدكتوراه في جراحة العظام — جامعة عين شمس، مصر",
          "الماجستير في جراحة العظام — جامعة عين شمس، مصر",
          "بكالوريوس الطب والجراحة — جامعة عين شمس، مصر"
        ],
        subspecialties: [
          {
            title: "تطويل العظام وإعادة بناء الأطراف",
            desc: "جراحات تطويل العظام لعلاج اختلاف طول الأطراف وحالات قصر العظام، وإعادة البناء بعد الإصابات وعدم التئام الكسور وفقدان أجزاء من العظام."
          },
          {
            title: "تقوس وتشوهات الأطراف",
            desc: "تقوس الساقين وانحراف المحور الميكانيكي للأطراف والتشوهات الخلقية أو المكتسبة، باستخدام تقنية إليزاروف والمثبتات الدائرية متعددة المحاور."
          },
          {
            title: "خشونة الركبة واستبدال المفاصل",
            desc: "تقييم حالات خشونة الركبة وتآكل الغضروف المفصلي، والعلاجات غير الجراحية والحقن داخل المفصل، وجراحات استبدال مفصل الركبة والورك."
          },
          {
            title: "إصابات الملاعب والمناظير الجراحية",
            desc: "علاج إصابات الرباط الصليبي وتمزقات الغضروف الهلالي وعدم ثبات المفاصل، بالإضافة إلى مناظير الركبة والكاحل عبر فتحات جراحية صغيرة."
          }
        ],
        hospitals: [
          {
            name: "مستشفى دار الكمال",
            city: "الشارقة",
            badge: "خيار حجز المستشفى (عمليات واستشارات)",
            desc: "أجنحة جراحية مجهزة بأعلى معايير التعقيم ومراكز أشعة متقدمة لإجراء العمليات الجراحية والاستشارات التخصصية."
          },
          {
            name: "مركز العلاج الطبي",
            city: "عجمان",
            badge: "خيار حجز العيادة / المركز الطبي",
            desc: "فحص سريري متقدم، تخطيط علاجي مخصص، واستشارات وحقن المفاصل الموجه."
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
        title: "خبرة جراحية في التعامل مع الحالات المعقدة",
        subtitle: "نتائج حقيقية مبنية على خبرة طبية متراكمة",
        stats: [
          { num: "500+", title: "عملية إعادة بناء", desc: "في مجال تطويل العظام وتصحيح التشوهات" },
          { num: "+25", title: "عاماً من الخبرة", desc: "في جراحة العظام والمفاصل والإصابات الرياضية" },
          { num: "100%", title: "تقييم مخصص", desc: "خطة علاجية مفصلة لكل مريض على حدة" },
        ],
        cta: "ابدأ استشارتك اليوم"
      }
    },
    en: {
      drName: "Dr. Mohamed Kamal Ali",
      drTitle: "Consultant Orthopedic & Joint Surgeon — Sports Injuries",
      bookConsultation: "Book Appointment",
      navHome: "HOME",
      navDoctor: "DOCTOR",
      navDiagnostics: "DIAGNOSTICS",
      navBooking: "BOOKING",
      langSwitch: "العربية",
      branches: {
        sharjah: "Sharjah: Dar Al Kamal Hospital (Hospital Booking Option)",
        ajman: "Ajman: Medical Treatment Center (Clinic / Medical Centre Booking Option)",
      },
      chapters: [
        {
          step: "01 / 06",
          badge: "WELCOME TO THE CLINIC",
          title: "Movement Is Life",
          subtitle: "Consultant Orthopedic & Joint Surgeon — Sports Injuries",
          desc: "Welcome to my digital clinic. I'm Dr. Mohamed Kamal Ali. Join me on a tour to learn about my medical expertise, specializations, and how we reach accurate diagnosis to choose the most appropriate treatment for each case.",
          primaryAction: "Begin Clinic Tour",
          secondaryAction: "Quick Booking",
          type: "standard"
        },
        {
          step: "02 / 06",
          badge: "CLINICAL BACKGROUND",
          title: "Over 25 Years of Scientific & Surgical Excellence",
          subtitle: "European Board of Orthopaedics & Traumatology (EBOT) Fellow",
          desc: "My career spans Egypt, Saudi Arabia, Oman, and the UAE, holding leadership and surgical roles including Medical Director of Amina Hospital, Ajman, and visiting professor at Gulf Medical College.",
          primaryAction: "Meet the Doctor",
          type: "doctor_intro"
        },
        {
          step: "03 / 06",
          badge: "DIAGNOSIS & PATHWAYS",
          title: "Every Condition Has Its Nature… Every Treatment Has Its Criteria",
          subtitle: "Bone and joint conditions vary in causes and complexity — there is no one-size-fits-all treatment plan",
          prompt: "What are you experiencing?",
          type: "condition_selector"
        },
        {
          step: "04 / 06",
          badge: "EXAMINATION & DIAGNOSIS",
          title: "Accurate Diagnosis Is the Foundation of Treatment Decisions",
          subtitle: "Treatment isn't based on imaging alone — it requires clinical exam, symptom analysis, and functional assessment",
          desc: "We begin with comprehensive clinical evaluation, followed by complementary investigations when needed. The goal is precise diagnosis that determines the right treatment pathway for each case.",
          tags: ["MRI Imaging", "Digital X-Ray", "Clinical Assessment"],
          primaryAction: "Continue Journey",
          type: "diagnostics"
        },
        {
          step: "05 / 06",
          badge: "EXPERTISE & RESULTS",
          title: "Surgical Expertise in Complex Cases",
          subtitle: "Over 500 procedures in limb reconstruction & deformity correction",
          desc: "My expertise centers on bone lengthening, limb reconstruction, and deformity correction, alongside knee and hip replacement, knee and ankle arthroscopy, sports injury treatment, and complex fracture management.",
          primaryAction: "View Credentials & Proof",
          type: "proof"
        },
        {
          step: "06 / 06",
          badge: "RECEPTION & BOOKING",
          title: "Our Tour Ends Here… Your Treatment Journey May Begin",
          subtitle: "If you have a bone or joint condition, or seek an expert medical opinion",
          desc: "Book a consultation at our Sharjah or Ajman clinic. I look forward to evaluating your condition and helping you make the right treatment decision.",
          primaryAction: "Book Consultation Now",
          secondaryAction: "Direct WhatsApp",
          type: "booking_close"
        }
      ],
      conditions: [
        { id: 'limb_deformity', label: 'Limb Deformity & Alignment' },
        { id: 'limb_lengthening', label: 'Bone Lengthening & Limb Length Discrepancy' },
        { id: 'knee_osteoarthritis', label: 'Knee Osteoarthritis & Joint Replacement' },
        { id: 'sports_injuries', label: 'Sports Injuries & Ligaments' },
        { id: 'arthroscopy', label: 'Knee & Ankle Arthroscopy' },
        { id: 'fractures', label: 'Fractures & Bone Reconstruction' },
        { id: 'general_consultation', label: 'General Orthopedic Consultation' },
      ],
      modal: {
        title: "Request a Consultation",
        subtitle: "With Dr. Mohamed Kamal Ali — Consultant Orthopedic & Joint Surgeon",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your full name",
        phoneLabel: "Phone / WhatsApp Number",
        phonePlaceholder: "e.g. +971 54 565 0678",
        branchLabel: "Select Appointment Location",
        conditionLabel: "What condition do you wish to consult about?",
        notesLabel: "Additional notes or preferred time (optional)",
        notesPlaceholder: "e.g. I prefer evening appointments",
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
        role: "Consultant Orthopedic & Joint Surgeon — Sports Injuries",
        experienceBadge: "Over 25 Years of Scientific & Surgical Excellence",
        philosophy: "Treatment decisions are not based on imaging alone, but on clinical examination, symptom nature, injury severity, and impact on joint function and mobility. My goal is that every patient understands their condition and available options, with treatment decisions built on clear medical foundations.",
        credentials: [
          "European Board of Orthopaedics & Traumatology (EBOT) — 2012",
          "Orthopedic Surgery Fellowship — University of Düsseldorf, Germany",
          "Doctoral Studies in Orthopedic Surgery — Ain Shams University, Egypt",
          "Master's in Orthopedic Surgery — Ain Shams University, Egypt",
          "MBBCh (Bachelor of Medicine & Surgery) — Ain Shams University, Egypt"
        ],
        subspecialties: [
          {
            title: "Bone Lengthening & Limb Reconstruction",
            desc: "Bone lengthening surgery for limb length discrepancy and short stature, post-trauma reconstruction, nonunion fractures, and bone loss using gradual distraction techniques."
          },
          {
            title: "Limb Deformity & Alignment Correction",
            desc: "Bow legs, mechanical axis deviation, and congenital or acquired deformities using Ilizarov technique and multiaxial circular fixators."
          },
          {
            title: "Knee Osteoarthritis & Joint Replacement",
            desc: "Assessment of knee osteoarthritis and cartilage degeneration, non-surgical treatments and intra-articular injections, and knee and hip replacement surgery."
          },
          {
            title: "Sports Injuries & Surgical Arthroscopy",
            desc: "ACL injuries, meniscal tears, joint instability, and knee and ankle arthroscopy through minimally invasive approaches."
          }
        ],
        hospitals: [
          {
            name: "Dar Al Kamal Hospital",
            city: "Sharjah",
            badge: "Hospital Booking Option",
            desc: "Fully equipped surgical suites with advanced sterilization standards and imaging centers for surgeries and specialist consultations."
          },
          {
            name: "Medical Treatment Center",
            city: "Ajman",
            badge: "Clinic / Medical Centre Booking Option",
            desc: "Advanced clinical examination, customized treatment planning, consultations, and guided joint injection units."
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
        title: "Surgical Expertise in Complex Cases",
        subtitle: "Real Results Built on Accumulated Medical Experience",
        stats: [
          { num: "500+", title: "Reconstruction Surgeries", desc: "In bone lengthening & deformity correction" },
          { num: "+25", title: "Years Experience", desc: "In orthopedic surgery, joints & sports injuries" },
          { num: "100%", title: "Tailored Assessment", desc: "Individualized treatment plan for each patient" },
        ],
        cta: "Start Your Consultation Today"
      }
    }
  };

  const current = t[lang];

  // Scroll to chapter in timeline with direction trigger
  const scrollToChapter = (chapterIndex: number) => {
    const st = ScrollTrigger.getById("main-experience");
    if (st) {
      const progress = chapterIndex / 5;
      const targetY = st.start + (st.end - st.start) * progress;
      if (typeof window !== 'undefined') {
        if (targetY > window.scrollY) {
          setScrollDir('down');
        } else {
          setScrollDir('up');
        }
      }
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // WhatsApp click handler with pre-filled message matching Developer Brief exactly:
  const handleWhatsAppClick = () => {
    const branchName = selectedBranch === 'sharjah' 
      ? (lang === 'ar' ? 'الشارقة — مستشفى دار الكمال (خيار حجز المستشفى)' : 'Sharjah — Dar Al Kamal Hospital (Hospital Booking Option)') 
      : (lang === 'ar' ? 'عجمان — مركز العلاج الطبي (خيار حجز العيادة / المركز الطبي)' : 'Ajman — Medical Treatment Center (Clinic / Medical Centre Booking Option)');
    const conditionObj = current.conditions.find(c => c.id === selectedCondition);
    const conditionText = conditionObj ? conditionObj.label : (lang === 'ar' ? 'استشارة عظام ومفاصل' : 'Orthopedic Consultation');
    
    const message = lang === 'ar'
      ? encodeURIComponent(`مرحباً د. محمد كمال علي. أرغب في حجز موعد استشارة.\nالمكان: ${branchName}\nالحالة: ${conditionText}`)
      : encodeURIComponent(`Hello Dr. Mohamed Kamal Ali. I would like to request a consultation appointment.\nLocation: ${branchName}\nCondition: ${conditionText}`);
    
    window.open(`https://wa.me/971545650678?text=${message}`, '_blank');
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
      href: 'tel:+971545650678',
      label: lang === 'ar' ? 'اتصال بالعيادة' : 'Call Clinic',
      className: 'hover:border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10',
    },
  ];

  // Show scroll hint once preloader finishes; auto-dismiss on scroll, touch, or after 5.5s
  useEffect(() => {
    if (!preloaderDone) return;

    const showTimer = setTimeout(() => {
      setShowScrollHint(true);
    }, 300);

    const hideTimer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5500);

    const dismissHint = () => {
      setShowScrollHint(false);
    };

    window.addEventListener('scroll', dismissHint, { passive: true, once: true });
    window.addEventListener('touchmove', dismissHint, { passive: true, once: true });
    window.addEventListener('wheel', dismissHint, { passive: true, once: true });

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', dismissHint);
      window.removeEventListener('touchmove', dismissHint);
      window.removeEventListener('wheel', dismissHint);
    };
  }, [preloaderDone]);

  // Ensure scroll hint is hidden as soon as user advances past chapter 0
  useEffect(() => {
    if (currentChapter > 0 && showScrollHint) {
      setShowScrollHint(false);
    }
  }, [currentChapter, showScrollHint]);

  // Track native window scroll direction to illuminate left/right glassy arrows
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    const handleNativeScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY;
      if (Math.abs(diff) > 4) {
        if (diff > 0) {
          setScrollDir('down');
        } else {
          setScrollDir('up');
        }
        lastY = currentY;
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      if (directionTimerRef.current) clearTimeout(directionTimerRef.current);
    };
  }, []);

  // GSAP ScrollTrigger and Single Video Scrubbing
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    
    // Explicitly set DOM properties for bulletproof mobile/desktop permission
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.currentTime = 0.001; // Force display of frame 1 immediately

    // Crucial for Mobile iOS & Android: Safely warm video decoder once without interrupting playback
    let isUnlocked = false;
    const unlockVideo = () => {
      if (isUnlocked) return;
      isUnlocked = true;
      try {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => video.pause()).catch(() => {});
        }
      } catch {}
    };

    window.addEventListener('touchstart', unlockVideo, { passive: true, once: true });
    window.addEventListener('click', unlockVideo, { passive: true, once: true });

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? 3000 : 4500;
      const scrubSpeed = isMobile ? 0.6 : 0.9;

      // Ultra-smooth non-blocking video seek manager
      // Prevents mobile browser from stalling the main thread during rapid touch scrolls
      let targetTime = 0;
      let isSeeking = false;
      let seekTimeout: ReturnType<typeof setTimeout> | null = null;

      const performSeek = () => {
        if (!video) return;
        isSeeking = true;
        
        // Safety fallback so isSeeking never stays true indefinitely
        if (seekTimeout) clearTimeout(seekTimeout);
        seekTimeout = setTimeout(() => {
          isSeeking = false;
        }, 120);

        try {
          // If browser supports fastSeek (Safari iOS), use it for zero-lag hardware seeking
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        } catch {
          isSeeking = false;
        }
      };

      const handleSeeked = () => {
        isSeeking = false;
        if (seekTimeout) clearTimeout(seekTimeout);
        // If the user continued scrolling while the previous frame decoded, catch up immediately
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          performSeek();
        }
      };

      video.addEventListener('seeked', handleSeeked);

      const tl = gsap.timeline({
        id: "main-experience",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: scrubSpeed, // Perfectly tuned: never lags or locks
          anticipatePin: 1,
          onUpdate: (self) => {
            const vidDuration = (video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : 26;
            targetTime = self.progress * vidDuration;
            if (!isSeeking) {
              performSeek();
            }
            const idx = Math.min(Math.floor(self.progress * 6), 5);
            setCurrentChapter(idx);

            // Light up left arrow on scroll down, right arrow on scroll up
            if (self.direction === 1) {
              setScrollDir('down');
            } else if (self.direction === -1) {
              setScrollDir('up');
            }
          }
        }
      });

      // Animate the 6 slides over the 12-second virtual timeline
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
    };
  }, [lang]);

  return (
    <div 
      suppressHydrationWarning
      className={`min-h-screen text-white selection:bg-[#1a73e8] selection:text-white font-inter overflow-x-hidden ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 0. LUXURY PRELOADER (AWAITING VIDEO & CRITICAL ASSETS) */}
      <Preloader 
        videoRef={videoRef} 
        lang={lang} 
        onComplete={() => setPreloaderDone(true)} 
      />

      {/* 1. FIXED BACKGROUND VIDEO (SINGLE HIGH-PERFORMANCE PLAYER) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none will-change-transform">
        <video
          ref={videoRef}
          src="/videos/dr.mohamed kamal ali video.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover select-none pointer-events-none"
          style={{ 
            willChange: 'transform', 
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
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
      <aside className="fixed right-6 top-[30%] -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 pointer-events-auto">
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
      <main ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden touch-pan-y">
        {/* DOCKED AT BOTTOM-START: Leaves 75% of Upper Screen Free to View the Video Subject! */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-3 sm:p-6 md:p-10 pb-20 md:pb-14 items-start">
          {current.chapters.map((ch, idx) => (
            <div
              key={idx}
              ref={el => { if (slidesRef.current) slidesRef.current[idx] = el; }}
              className={`absolute bottom-20 md:bottom-12 start-3 sm:start-6 md:start-12 w-[calc(100%-1.5rem)] sm:w-auto sm:max-w-md md:max-w-lg p-4 md:p-5 rounded-2xl backdrop-blur-xl sm:backdrop-blur-2xl bg-[#131314]/80 border border-white/15 shadow-2xl will-change-transform ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                pointerEvents: currentChapter === idx ? 'auto' : 'none',
                touchAction: 'pan-y'
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
                  <div className="flex flex-wrap gap-1.5 touch-pan-y">
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

      {/* 4.5. GLASSY SIDE NAVIGATION ARROWS (Interactive & Glow with Scroll Direction) */}
      {/* Left Glassy Arrow: Lights up on scroll DOWN, clicks to advance to next chapter */}
      <button
        type="button"
        onClick={() => {
          if (currentChapter < 5) {
            scrollToChapter(currentChapter + 1);
          } else {
            const el = document.getElementById('before-after-cases');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label={lang === 'ar' ? 'التالي (مرر لأسفل)' : 'Next (Scroll Down)'}
        title={lang === 'ar' ? 'التالي (مرر لأسفل)' : 'Next (Scroll Down)'}
        className={`fixed left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95 ${
          activeDirection === 'down'
            ? 'bg-[#1a73e8]/35 border-[#8ab4f8] text-white shadow-[0_0_24px_rgba(138,180,248,0.7)] scale-110 ring-2 ring-[#8ab4f8]/50'
            : 'bg-black/25 hover:bg-black/45 border-white/15 text-white/60 hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-white/30'
        }`}
        style={{ touchAction: 'manipulation' }}
      >
        <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${activeDirection === 'down' ? 'scale-115 text-[#8ab4f8]' : ''}`} />
      </button>

      {/* Right Glassy Arrow: Lights up on scroll UP, clicks to go back */}
      <button
        type="button"
        onClick={() => {
          if (currentChapter > 0) {
            scrollToChapter(currentChapter - 1);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        aria-label={lang === 'ar' ? 'السابق (مرر لأعلى)' : 'Previous (Scroll Up)'}
        title={lang === 'ar' ? 'السابق (مرر لأعلى)' : 'Previous (Scroll Up)'}
        className={`fixed right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95 ${
          activeDirection === 'up'
            ? 'bg-[#1a73e8]/35 border-[#8ab4f8] text-white shadow-[0_0_24px_rgba(138,180,248,0.7)] scale-110 ring-2 ring-[#8ab4f8]/50'
            : 'bg-black/25 hover:bg-black/45 border-white/15 text-white/60 hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-white/30'
        }`}
        style={{ touchAction: 'manipulation' }}
      >
        <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${activeDirection === 'up' ? 'scale-115 text-[#8ab4f8]' : ''}`} />
      </button>

      {/* SCROLL HINT — Minimalist, chic floating indicator with two downward arrows */}
      <div 
        onClick={() => {
          scrollToChapter(1);
          setShowScrollHint(false);
        }}
        style={{ touchAction: 'pan-y' }}
        className={`fixed top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 select-none cursor-pointer group ${
          showScrollHint && currentChapter === 0
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        aria-label={lang === 'ar' ? 'مرر للأسفل للتعرف علي الخدمات الطبيه' : 'Scroll down to explore medical services'}
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#070e1c]/75 hover:bg-[#070e1c]/90 backdrop-blur-xl border border-white/15 hover:border-[#8ab4f8]/50 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] transition-all transform group-hover:scale-105 active:scale-95">
          <span className="text-[11px] sm:text-xs font-semibold text-gray-100 group-hover:text-white tracking-wide whitespace-nowrap">
            {lang === 'ar' ? 'مرر للأسفل للتعرف علي الخدمات الطبيه' : 'Scroll down to explore medical services'}
          </span>

          {/* Two elegant downward arrows */}
          <div className="flex flex-col items-center justify-center -space-y-2 shrink-0">
            <ChevronDown className="w-3.5 h-3.5 text-[#8ab4f8] animate-bounce" />
            <ChevronDown className="w-3.5 h-3.5 text-[#8ab4f8]/60 animate-bounce [animation-delay:150ms]" />
          </div>
        </div>
      </div>

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
                href="tel:+971545650678"
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
                ? 'تتركز خبرتي في تطويل العظام وإعادة بناء الأطراف وتصحيح التشوهات، باستخدام تقنيات إليزاروف والمثبتات الدائرية متعددة المحاور. القرار العلاجي يكون مبنياً على الفحص السريري والتقييم الدقيق لكل حالة.' 
                : 'My expertise centers on bone lengthening, limb reconstruction, and deformity correction using Ilizarov technique and multiaxial circular fixators. Treatment decisions are built on clinical examination and thorough assessment of each case.'}
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
                        <span className="text-[10px] font-semibold text-white/95">{lang === 'ar' ? 'مستشفى دار الكمال' : 'Dar Al Kamal Hospital'}</span>
                        <span className="text-[8px] px-1.5 py-0.5 mt-0.5 rounded-full bg-[#1a73e8]/25 text-[#8ab4f8] font-medium border border-[#8ab4f8]/30">
                          {lang === 'ar' ? 'خيار حجز المستشفى' : 'Hospital Booking Option'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedBranch('ajman')}
                        className={`p-2 rounded-xl border text-[11px] font-medium text-center transition-all flex flex-col items-center gap-0.5 ${selectedBranch === 'ajman' ? 'border-[#8ab4f8] bg-[#1a73e8]/25 text-[#a8c7fa]' : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'}`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#8ab4f8]" />
                        <span className="font-bold">{lang === 'ar' ? 'عجمان' : 'Ajman'}</span>
                        <span className="text-[10px] font-semibold text-white/95">{lang === 'ar' ? 'مركز العلاج الطبي' : 'Medical Treatment Center'}</span>
                        <span className="text-[8px] px-1.5 py-0.5 mt-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                          {lang === 'ar' ? 'خيار حجز العيادة / المركز الطبي' : 'Clinic / Medical Centre'}
                        </span>
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

                  {/* Additional Notes (Optional) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      {current.modal.notesLabel}
                    </label>
                    <textarea 
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder={current.modal.notesPlaceholder}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8ab4f8] transition-colors resize-none"
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
