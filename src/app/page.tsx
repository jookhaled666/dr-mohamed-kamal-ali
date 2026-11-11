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

  // Multi-language data conforming 100% to developer brief & official PDF content
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
          // Chapter 1: Reception Arrival (PDF Page 2)
          step: "01 / 06",
          badge: "الاستقبال والترحيب",
          title: "الحركة هي الحياة",
          subtitle: "د. محمد كمال علي — استشاري جراحة العظام والمفاصل وإصابات الملاعب",
          desc: "أهلاً بك في عيادتي الرقمية. أنا الدكتور محمد كمال علي، ويسعدني أن أصطحبك في جولة تتعرّف خلالها على خبرتي الطبية، ومجالات تخصصي، وكيف نصل إلى التشخيص الدقيق ونختار العلاج الأنسب لكل حالة.",
          note: "أؤمن بأن الحفاظ على الحركة يبدأ بفهم المشكلة، وأن القرار العلاجي الصحيح يقوم على المعرفة الطبية والخبرة الجراحية والتقييم الدقيق.",
          primaryAction: "ابدأ الجولة الطبية",
          secondaryAction: "حجز موعد سريع",
          type: "standard"
        },
        {
          // Chapter 2: Doctor Office (PDF Page 3)
          step: "02 / 06",
          badge: "السيرة والنهج الطبي",
          title: "خبرة علمية وجراحية تمتد لأكثر من 25 عاماً",
          subtitle: "حاصل على زمالة البورد الأوروبي لجراحة العظام والكسور (EBOT)",
          desc: "أنا الدكتور محمد كمال علي، استشاري جراحة العظام والمفاصل. امتدت مسيرتي عبر مصر والسعودية وسلطنة عُمان والإمارات، وتولّيت خلالها مسؤوليات طبية وجراحية وقيادية بمستشفى خولة، والإدارة الطبية لمستشفى أمينة، والتدريس بكلية الخليج الطبية. هدفي أن يفهم كل مريض حالته والخيارات المتاحة له.",
          primaryAction: "تعرّف على التخصصات الطبية",
          secondaryAction: "السيرة والنهج الطبي",
          type: "doctor_intro"
        },
        {
          // Chapter 3: From Office to Clinical Care (PDF Pages 4 & 5)
          step: "03 / 06",
          badge: "التشخيص واختيار المسار",
          title: "كل حالة لها طبيعتها… ولكل علاج معاييره",
          subtitle: "والآن، دعنا نتعرّف على أبرز الحالات التي أتعامل معها. تختلف أمراض وإصابات العظام والمفاصل في أسبابها ودرجة تعقيدها، ولذلك لا توجد خطة علاجية واحدة تناسب جميع المرضى.",
          prompt: "ما الذي تعاني منه؟",
          primaryAction: "ننتقل الآن إلى مرحلة الفحص والتشخيص",
          type: "condition_selector"
        },
        {
          // Chapter 4: Diagnostic Facilities (PDF Page 6)
          step: "04 / 06",
          badge: "مرافق الفحص والتشخيص",
          title: "التشخيص الدقيق هو أساس القرار العلاجي",
          subtitle: "بعد التعرّف على الأعراض، ننتقل إلى مرحلة التقييم الطبي السريري.",
          desc: "أبدأ بمراجعة التاريخ المرضي، وطبيعة الألم أو الإصابة، ومدى تأثيرها على الحركة والأنشطة اليومية، ثم أُجري الفحص السريري لتقييم وظيفة المفصل، واستقامة الطرف، وثبات الأربطة، ومدى الحركة. بعد ذلك، أُحدد الفحوصات التصويرية المناسبة لكل حالة.",
          diagnosticItems: [
            {
              title: "الأشعة السينية (X-Ray)",
              shortDesc: "تقييم الكسور واستقامة العظام ودرجة تآكل المفاصل، وصور الوقوف لتقييم المحور الميكانيكي وقياس درجة الانحراف بدقة."
            },
            {
              title: "التصوير بالرنين المغناطيسي (MRI)",
              shortDesc: "يُستخدم لتقييم الأربطة والغضاريف والأنسجة الرخوة، خصوصاً في إصابات الملاعب وحالات عدم ثبات الركبة والكاحل."
            },
            {
              title: "من التشخيص إلى الخطة العلاجية",
              shortDesc: "مناقشة الخيارات والفوائد والمخاطر؛ فليست كل إصابة بحاجة لجراحة، وتأخير التدخل الجراحي قد يؤثر على وظيفة المفصل."
            }
          ],
          primaryAction: "متابعة الجولة",
          type: "diagnostics"
        },
        {
          // Chapter 5: Expertise and Proof (PDF Page 7)
          step: "05 / 06",
          badge: "الخبرة والنتائج",
          title: "خبرة جراحية في التعامل مع الحالات المعقدة",
          subtitle: "أكثر من 500 عملية في مجال إعادة بناء الأطراف وتطويل العظام",
          desc: "على مدار مسيرتي الطبية، أجريت أكثر من 500 عملية شملت تصحيح التشوهات العظمية المعقدة، واختلاف طول الأطراف، وعدم التئام الكسور. لا يقتصر الهدف على الشكل الظاهري، بل تحسين استقامة الطرف ومحوره الميكانيكي ووظيفته.",
          highlight: "في حالات خشونة الركبة وإصابات المفاصل، أحرص على تقييم الخيارات العلاجية غير الجراحية أولاً، وتحديد التدخل الجراحي عند وجود تلف متقدم بناءً على التشخيص والحالة الوظيفية.",
          primaryAction: "شاهد الحالات الطبية قبل وبعد",
          secondaryAction: "أرقام ومعايير الخبرة",
          type: "proof"
        },
        {
          // Chapter 6: Return to Reception and Booking Close (PDF Page 8)
          step: "06 / 06",
          badge: "الاستقبال وحجز الموعد",
          title: "وصلنا إلى نهاية جولتنا… وقد تكون هذه بداية رحلتك العلاجية",
          subtitle: "أتمنى أن تكون هذه الجولة قد منحتك تصوراً أوضح عن طبيعة عملنا، وأهمية التشخيص الدقيق في اختيار العلاج المناسب.",
          desc: "إذا كنت تعاني من مشكلة في العظام أو المفاصل، أو ترغب في تقييم حالة تحتاج إلى تدخل جراحي متخصص، يسعدني استقبالكم ومناقشة الخيارات العلاجية المتاحة.",
          languagesNote: "اللغات المتاحة: العربية، الإنجليزية، الألمانية.",
          primaryAction: "احجز موعدك الآن",
          secondaryAction: "واتساب مباشر",
          type: "booking_close"
        }
      ],
      conditions: [
        {
          id: 'limb_deformity',
          label: 'تقوس وتشوهات الأطراف',
          desc: 'أتعامل مع حالات تقوس الساقين، وانحراف المحور الميكانيكي للأطراف، والتشوهات الخلقية أو المكتسبة، باستخدام تقنيات التصحيح العظمي والتثبيت الداخلي والخارجي، بما فيها تقنية إليزاروف والمثبتات الدائرية متعددة المحاور.'
        },
        {
          id: 'limb_lengthening',
          label: 'تطويل الأطراف وإعادة بناء العظام',
          desc: 'أُجري جراحات تطويل العظام لعلاج اختلاف طول الأطراف وحالات قصر العظام، إضافة إلى حالات إعادة البناء بعد الإصابات، وعدم التئام الكسور، وفقدان أجزاء من العظام، باستخدام تقنيات التطويل التدريجي ونقل العظام عند الحاجة.'
        },
        {
          id: 'knee_osteoarthritis',
          label: 'خشونة الركبة واستبدال المفاصل',
          desc: 'أُقيّم حالات خشونة الركبة وتآكل الغضروف المفصلي، وأحدد مدى ملاءمة العلاجات غير الجراحية أو الحقن داخل المفصل. وفي الحالات المتقدمة التي تستدعي التدخل الجراحي، تشمل خبرتي جراحات استبدال مفصل الركبة والورك.'
        },
        {
          id: 'sports_injuries',
          label: 'إصابات الملاعب والرباط الصليبي',
          desc: 'أعالج إصابات الرباط الصليبي، وتمزقات الغضروف الهلالي، وإصابات الأربطة وعدم ثبات المفاصل. ويعتمد قرار إصلاح الأربطة أو إعادة بنائها على طبيعة الإصابة ودرجة عدم الثبات واحتياجات المريض الوظيفية.'
        },
        {
          id: 'arthroscopy',
          label: 'مناظير الركبة والكاحل',
          desc: 'أستخدم المناظير الجراحية في علاج الحالات المناسبة من إصابات الغضاريف والأربطة والمشكلات داخل المفصل، عبر فتحات جراحية صغيرة، مع تحديد الإجراء وفق التشخيص ونتائج الفحوصات.'
        },
        {
          id: 'fractures',
          label: 'الكسور وإعادة بناء العظام',
          desc: 'علاج الكسور بمختلف أنواعها، والكسور المعقدة وحالات عدم الالتئام وفقدان أجزاء من العظام، مع إعادة البناء الوظيفي للطرف المصاب.'
        },
        {
          id: 'general_consultation',
          label: 'استشارة عامة في جراحة العظام',
          desc: 'تشمل خبرتي أيضاً جراحات القدم والكاحل، والكتف، واليد والرسغ، وجراحة أورام العظام والأنسجة الرخوة، بالإضافة إلى تقييم وعلاج هشاشة العظام.'
        },
      ],
      modal: {
        badge: "نموذج حجز الاستشارة",
        title: "احجز استشارتك مع الدكتور",
        subtitle: "يسعدني استقبالكم لتقييم حالتكم الطبية ومناقشة الخيارات العلاجية المناسبة. يرجى تعبئة البيانات التالية، وسيتواصل معكم فريق المواعيد لتنسيق الزيارة.",
        nameLabel: "الاسم الكامل",
        namePlaceholder: "أدخل اسمك الكريم",
        phoneLabel: "رقم الهاتف / واتساب",
        phonePlaceholder: "مثال: 0545650678 أو 971545650678+",
        branchLabel: "اختر العيادة المفضلة",
        conditionLabel: "الحالة التي ترغب في استشارة الدكتور بشأنها",
        notesLabel: "ملاحظات إضافية أو وقت مفضل (اختياري)",
        notesPlaceholder: "مثال: أفضل المواعيد المسائية...",
        preferredContactLabel: "طريقة التواصل المفضلة",
        contactWhatsapp: "رسالة واتساب",
        contactCall: "اتصال هاتفي",
        consentLabel: "أوافق على التواصل معي بخصوص طلب الموعد",
        submitBtn: "إرسال طلب الحجز",
        whatsAppBtn: "إرسال طلب الحجز عبر واتساب",
        successMsg: "استلمنا طلبك بنجاح. سيتواصل معكم فريق المواعيد لتنسيق الزيارة.",
        successNote: "ملاحظة: هذا طلب موعد وسيقوم فريق العيادة بتأكيد الموعد النهائي معكم.",
        closeBtn: "إغلاق",
        doctorSignoff: "د. محمد كمال علي — استشاري جراحة العظام والمفاصل وإصابات الملاعب | الحركة هي الحياة"
      },
      doctorModal: {
        title: "السيرة والنهج الطبي",
        subtitle: "د. محمد كمال علي",
        role: "استشاري جراحة العظام والمفاصل وإصابات الملاعب",
        experienceBadge: "خبرة علمية وجراحية تمتد لأكثر من 25 عاماً",
        bio: "أنا الدكتور محمد كمال علي، استشاري جراحة العظام والمفاصل، حاصل على زمالة البورد الأوروبي لجراحة العظام والكسور (EBOT) عام 2012، وأكملت زمالة جراحة العظام في جامعة دوسلدورف بألمانيا، بعد دراستي الطبية والعليا في جامعة عين شمس بالقاهرة. امتدت مسيرتي المهنية عبر مصر والسعودية وسلطنة عُمان والإمارات، وتولّيت خلالها مسؤوليات طبية وجراحية وقيادية، من بينها العمل في مجال إعادة بناء الأطراف وتصحيح التشوهات بمستشفى خولة في عُمان، ومنصب المدير الطبي لمستشفى أمينة بعجمان، والعمل أستاذاً زائراً لجراحة العظام في كلية الخليج الطبية. تتركز خبرتي الجراحية في تطويل العظام وإعادة بناء الأطراف وتصحيح التشوهات، إلى جانب استبدال مفاصل الركبة والورك، ومناظير الركبة والكاحل، وعلاج الإصابات الرياضية والكسور المعقدة.",
        credentialsTitle: "المؤهلات العلمية",
        credentials: [
          "زمالة البورد الأوروبي لجراحة العظام والكسور (EBOT) – 2012",
          "زمالة جراحة العظام – جامعة دوسلدورف، ألمانيا",
          "دراسات الدكتوراه في جراحة العظام (أطروحة دكتوراه) – جامعة عين شمس، مصر",
          "الماجستير في جراحة العظام – جامعة عين شمس، مصر",
          "بكالوريوس الطب والجراحة – جامعة عين شمس، مصر"
        ],
        philosophyTitle: "نهجي في العلاج",
        philosophy: "لا يعتمد اختيار العلاج على نتائج الأشعة وحدها، بل على الفحص السريري، وطبيعة الأعراض، ودرجة الإصابة، وتأثيرها على وظيفة المفصل والحركة. هدفي أن يفهم كل مريض حالته والخيارات المتاحة له، وأن يكون القرار العلاجي مبنياً على أسس طبية واضحة، سواء كان العلاج تحفظياً أو جراحياً.",
        subspecialtiesTitle: "مجالات الاختصاص والتميز السريري",
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
            desc: "علاج إصابات الرباط الصليبي وتمزقات الغضروف الهلالي وعدم ثبات المفاصل، ومناظير الركبة والكاحل عبر فتحات جراحية صغيرة."
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
        subtitle: "أكثر من 500 عملية في مجال إعادة بناء الأطراف وتطويل العظام",
        body1: "على مدار مسيرتي الطبية، أجريت أكثر من 500 عملية في مجال إعادة بناء الأطراف وتطويل العظام، شملت تصحيح التشوهات العظمية المعقدة، واختلاف طول الأطراف، وحالات عدم التئام الكسور.",
        body2: "في هذه الجراحات، لا يقتصر الهدف على تصحيح الشكل الظاهري للعظم، بل يمتد إلى تحسين استقامة الطرف ومحوره الميكانيكي ووظيفته، مع مراعاة حالة المفاصل والأنسجة المحيطة. تعتمد جراحات إعادة البناء على تخطيط دقيق يشمل قياس التشوه، واختيار التقنية الجراحية المناسبة، ومتابعة التئام العظام والتأهيل خلال مراحل العلاج.",
        body3: "الحفاظ على المفصل متى كان ذلك ممكناً: في حالات خشونة الركبة وإصابات المفاصل، أحرص على تقييم الخيارات العلاجية غير الجراحية أولاً عندما تكون مناسبة للحالة. أما عند وجود تلف مفصلي متقدم أو إصابة تستدعي التدخل الجراحي، فيُحدَّد الإجراء المناسب بناءً على التشخيص والحالة الوظيفية للمريض.",
        stats: [
          { num: "500+", title: "عملية إعادة بناء", desc: "في تطويل العظام وتصحيح التشوهات" },
          { num: "+25", title: "عاماً من الخبرة", desc: "في جراحة العظام والمفاصل والملاعب" },
          { num: "100%", title: "تقييم مخصص", desc: "خطة علاجية مبنية على الفحص السريري" },
        ],
        cta: "شاهد الحالات الطبية قبل وبعد"
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
          subtitle: "Dr. Mohamed Kamal Ali — Consultant Orthopedic & Joint Surgeon",
          desc: "Welcome to my digital clinic. I am Dr. Mohamed Kamal Ali, and I am pleased to take you on a tour to explore my medical expertise, specializations, and how we achieve accurate diagnosis to choose the most appropriate treatment for each case.",
          note: "I believe that preserving mobility begins with understanding the root cause, and that the right clinical decision is built on medical knowledge, surgical expertise, and thorough evaluation.",
          primaryAction: "Begin Clinic Tour",
          secondaryAction: "Quick Booking",
          type: "standard"
        },
        {
          step: "02 / 06",
          badge: "CLINICAL BACKGROUND & APPROACH",
          title: "Over 25 Years of Scientific & Surgical Excellence",
          subtitle: "Fellow of the European Board of Orthopaedics & Traumatology (EBOT)",
          desc: "I am Dr. Mohamed Kamal Ali, Consultant Orthopedic & Joint Surgeon. My career spans Egypt, Saudi Arabia, Oman, and the UAE, where I have held clinical, surgical, and leadership roles including reconstructive work at Khoula Hospital in Oman, Medical Director at Amina Hospital in Ajman, and Visiting Professor at Gulf Medical College.",
          primaryAction: "Explore Medical Specialties",
          secondaryAction: "Doctor Bio & Approach",
          type: "doctor_intro"
        },
        {
          step: "03 / 06",
          badge: "DIAGNOSIS & PATHWAYS",
          title: "Every Condition Has Its Nature… Every Treatment Has Its Criteria",
          subtitle: "Now, let us explore the key conditions I treat. Bone and joint disorders vary in etiology and complexity; hence, no single treatment plan fits all patients.",
          prompt: "What condition are you experiencing?",
          primaryAction: "Proceed to Examination & Diagnosis",
          type: "condition_selector"
        },
        {
          step: "04 / 06",
          badge: "DIAGNOSTIC FACILITIES",
          title: "Accurate Diagnosis Is the Foundation of Treatment Decisions",
          subtitle: "After reviewing symptoms, we move to clinical and imaging evaluation.",
          desc: "I begin with a thorough medical history, assessing pain nature and functional mobility impact, followed by clinical examination to assess joint stability, limb alignment, ligament integrity, and range of motion before ordering targeted imaging.",
          diagnosticItems: [
            {
              title: "Digital X-Ray",
              shortDesc: "Evaluates fractures, bone alignment, joint degeneration, and standing long-leg films for precision mechanical axis measurement."
            },
            {
              title: "High-Resolution MRI",
              shortDesc: "Employed to evaluate ligaments, cartilage, and soft tissues, particularly in sports injuries and knee or ankle instability."
            },
            {
              title: "From Diagnosis to Treatment Plan",
              shortDesc: "Discussing options, benefits, and risks with each patient; not all injuries require surgery, yet delaying indicated surgery may impair function."
            }
          ],
          primaryAction: "Continue Journey",
          type: "diagnostics"
        },
        {
          step: "05 / 06",
          badge: "EXPERTISE & PROVEN OUTCOMES",
          title: "Surgical Expertise in Complex Cases",
          subtitle: "Over 500 procedures in limb reconstruction & bone lengthening",
          desc: "Throughout my medical career, I have performed over 500 surgeries in limb reconstruction and bone lengthening, encompassing complex deformities, limb length discrepancies, and nonunion fractures. The objective extends beyond cosmetic appearance to restoring limb alignment, mechanical axis, and function.",
          highlight: "Joint preservation when possible: In knee osteoarthritis and joint injuries, non-surgical and biologic options are prioritized first whenever appropriate.",
          primaryAction: "View Before & After Cases",
          secondaryAction: "Outcomes & Track Record",
          type: "proof"
        },
        {
          step: "06 / 06",
          badge: "RECEPTION & CONSULTATION BOOKING",
          title: "Our Tour Concludes Here… Your Healing Journey May Begin",
          subtitle: "I hope this tour has provided clearer insight into our clinical philosophy and the pivotal role of precise diagnosis.",
          desc: "If you are suffering from a bone or joint condition, or wish to seek a specialized surgical assessment, I welcome you at our Sharjah or Ajman facilities to discuss suitable treatment pathways.",
          languagesNote: "Languages spoken: Arabic, English, German.",
          primaryAction: "Book Consultation Now",
          secondaryAction: "Direct WhatsApp",
          type: "booking_close"
        }
      ],
      conditions: [
        {
          id: 'limb_deformity',
          label: 'Limb Deformity Correction',
          desc: 'Treatment of bow legs (genu varum), knock knees (genu valgum), mechanical axis deviations, and congenital or acquired deformities using osteotomy and internal/external fixation, including Ilizarov multiaxial circular frames.'
        },
        {
          id: 'limb_lengthening',
          label: 'Bone Lengthening & Reconstruction',
          desc: 'Bone lengthening procedures for limb length discrepancy and short stature, post-trauma reconstruction, nonunion fractures, and segmental bone defects using gradual distraction osteogenesis and bone transport.'
        },
        {
          id: 'knee_osteoarthritis',
          label: 'Knee Osteoarthritis & Joint Replacement',
          desc: 'Evaluation of knee wear and cartilage degeneration, determining suitability for conservative biologics or targeted injections, and advanced knee and hip arthroplasty when surgical replacement is indicated.'
        },
        {
          id: 'sports_injuries',
          label: 'Sports Injuries & ACL Ligaments',
          desc: 'Management of anterior cruciate ligament (ACL) injuries, meniscus tears, multi-ligament instability, and individualized reconstruction tailored to athletic demands.'
        },
        {
          id: 'arthroscopy',
          label: 'Knee & Ankle Arthroscopy',
          desc: 'Minimally invasive keyhole arthroscopy for intra-articular cartilage, ligament, and loose body conditions with expedited recovery.'
        },
        {
          id: 'fractures',
          label: 'Complex Fractures & Reconstruction',
          desc: 'Management of acute and complex fractures, delayed union, nonunion, and post-traumatic structural bone reconstruction.'
        },
        {
          id: 'general_consultation',
          label: 'General Orthopedic Consultation',
          desc: 'Comprehensive clinical assessment and expert opinion for foot and ankle, shoulder, hand, bone tumors, and osteoporosis.'
        },
      ],
      modal: {
        badge: "Consultation Booking Form",
        title: "Book Your Consultation with the Doctor",
        subtitle: "We look forward to receiving you to evaluate your condition and discuss suitable treatment plans. Please complete the form below, and our coordination team will reach out to confirm your visit.",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your full name",
        phoneLabel: "Phone / WhatsApp Number",
        phonePlaceholder: "e.g. +971 54 565 0678",
        branchLabel: "Select Preferred Facility",
        conditionLabel: "Condition you wish to consult about",
        notesLabel: "Additional notes or preferred time (optional)",
        notesPlaceholder: "e.g. Afternoon appointment preferred...",
        preferredContactLabel: "Preferred Contact Method",
        contactWhatsapp: "WhatsApp Message",
        contactCall: "Phone Call",
        consentLabel: "I agree to be contacted regarding this appointment request",
        submitBtn: "Submit Booking Request",
        whatsAppBtn: "Send Booking Request via WhatsApp",
        successMsg: "Your request has been received. Our appointments team will contact you to coordinate your visit.",
        successNote: "Note: This is an initial appointment request; final scheduling will be confirmed by the clinic team.",
        closeBtn: "Close",
        doctorSignoff: "Dr. Mohamed Kamal Ali — Consultant Orthopedic & Joint Surgeon | Movement Is Life"
      },
      doctorModal: {
        title: "Clinical Background & Medical Approach",
        subtitle: "Dr. Mohamed Kamal Ali",
        role: "Consultant Orthopedic & Joint Surgeon — Sports Injuries",
        experienceBadge: "Over 25 Years of Scientific & Surgical Excellence",
        bio: "I am Dr. Mohamed Kamal Ali, Consultant Orthopedic Surgeon, Fellow of the European Board of Orthopaedics & Traumatology (EBOT 2012) and Orthopedic Surgery Fellow from the University of Düsseldorf, Germany, following medical and postgraduate degrees at Ain Shams University in Cairo. My career spans Egypt, Saudi Arabia, Oman, and the UAE, including deformity correction and limb reconstruction at Khoula Hospital in Oman, Medical Director at Amina Hospital in Ajman, and Visiting Professor at Gulf Medical College. My surgical focus centers on bone lengthening, limb reconstruction, deformity correction, knee and hip arthroplasty, and arthroscopic management of sports injuries.",
        credentialsTitle: "Academic Qualifications & Fellowships",
        credentials: [
          "Fellow of the European Board of Orthopaedics & Traumatology (EBOT) – 2012",
          "Fellowship in Orthopedic Surgery – University of Düsseldorf, Germany",
          "Doctorate Studies in Orthopedic Surgery (Thesis) – Ain Shams University, Egypt",
          "Master of Science (M.Sc.) in Orthopedic Surgery – Ain Shams University, Egypt",
          "MBBCh (Bachelor of Medicine & Surgery) – Ain Shams University, Egypt"
        ],
        philosophyTitle: "Clinical Treatment Philosophy",
        philosophy: "Treatment decisions are not made on imaging reports alone, but on comprehensive clinical examination, symptom characteristics, functional impairment, and joint biomechanics. My objective is for each patient to fully understand their pathology and therapeutic choices, ensuring clinical decisions are grounded in sound medical principles—whether conservative or surgical.",
        subspecialtiesTitle: "Clinical Subspecialties & Focus",
        subspecialties: [
          {
            title: "Bone Lengthening & Limb Reconstruction",
            desc: "Limb length discrepancy correction, congenital and post-traumatic shortening, and nonunion repair using gradual distraction osteogenesis."
          },
          {
            title: "Limb Deformity & Alignment Correction",
            desc: "Bow legs, knock knees, and angular deformities using osteotomies and Ilizarov multiaxial circular fixation."
          },
          {
            title: "Knee Osteoarthritis & Joint Arthroplasty",
            desc: "Cartilage assessment, intra-articular biologics, and precision total knee and hip replacement surgery."
          },
          {
            title: "Sports Medicine & Keyhole Arthroscopy",
            desc: "ACL reconstruction, meniscus suturing, joint stabilization, and minimally invasive knee and ankle arthroscopy."
          }
        ],
        hospitals: [
          {
            name: "Dar Al Kamal Hospital",
            city: "Sharjah",
            badge: "Hospital Booking Option (Surgeries & Consultations)",
            desc: "Advanced digital operating suites and comprehensive imaging facilities for surgical procedures and specialist consultations."
          },
          {
            name: "Medical Treatment Center",
            city: "Ajman",
            badge: "Clinic / Medical Centre Booking Option",
            desc: "Specialized clinical examination, customized conservative protocols, and guided joint injection units."
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
        subtitle: "Over 500 procedures in limb reconstruction & bone lengthening",
        body1: "Throughout my medical career, I have performed over 500 surgeries in limb reconstruction and bone lengthening, encompassing complex deformities, limb length discrepancies, and nonunion fractures.",
        body2: "In these procedures, the goal extends beyond cosmetic realignment to restoring mechanical axes, weight-bearing distribution, and joint protection, backed by meticulous pre-operative planning and structured rehabilitation.",
        body3: "Joint preservation when possible: Non-surgical modalities are evaluated first whenever indicated, proceeding to surgical intervention only when advanced cartilage loss or instability necessitates it.",
        stats: [
          { num: "500+", title: "Reconstructive Surgeries", desc: "In bone lengthening & deformity correction" },
          { num: "+25", title: "Years of Experience", desc: "In orthopedic surgery, joints & sports injuries" },
          { num: "100%", title: "Tailored Assessment", desc: "Individualized plan based on clinical exam" },
        ],
        cta: "View Before & After Cases"
      }
    }
  };

  const current = t[lang];
  const selectedConditionObj = current.conditions.find(c => c.id === selectedCondition) || current.conditions[0];

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
                /* Chapter 3 Interactive Condition Selector with PDF Pages 4 & 5 medical content */
                <div className="my-2">
                  <p className="text-[11px] text-gray-200 font-semibold mb-1.5 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-[#8ab4f8]" />
                    <span>{ch.prompt}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 touch-pan-y mb-2 max-h-24 overflow-y-auto">
                    {current.conditions.map((cond) => {
                      const isSelected = selectedCondition === cond.id;
                      return (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => setSelectedCondition(cond.id)}
                          className={`text-[10px] md:text-[11px] px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1.5 text-start cursor-pointer active:scale-98 ${
                            isSelected 
                              ? 'border-[#8ab4f8] bg-[#1a73e8]/30 text-white font-bold shadow-[0_0_15px_rgba(138,180,248,0.25)]' 
                              : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#8ab4f8]' : 'bg-gray-500'}`} />
                          <span>{cond.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected condition clinical description card from PDF Pages 4 & 5 */}
                  {selectedConditionObj && (
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 mb-2 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#8ab4f8]">
                          {selectedConditionObj.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsBookingOpen(true)}
                          className="text-[9px] text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer"
                        >
                          {lang === 'ar' ? 'طلب استشارة للحالة ←' : 'Consult for this condition →'}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-relaxed font-light">
                        {selectedConditionObj.desc}
                      </p>
                    </div>
                  )}
                </div>
              ) : ch.type === "diagnostics" && (ch as any).diagnosticItems ? (
                /* Chapter 4 Diagnostics from PDF Page 6 */
                <div className="mb-2.5 space-y-2">
                  <p className="text-[10px] md:text-[11px] text-gray-300 font-light leading-relaxed">
                    {ch.desc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {((ch as any).diagnosticItems as Array<{ title: string; shortDesc: string }>).map((item, dIdx) => (
                      <div key={dIdx} className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-[10px] font-bold text-[#8ab4f8] block mb-0.5">
                          {item.title}
                        </span>
                        <p className="text-[9px] text-gray-300 leading-snug font-light">
                          {item.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Standard Description & Optional Highlight */
                <div className="mb-2.5 space-y-1.5">
                  <p className="text-[10px] md:text-[11px] text-gray-300 font-light leading-relaxed">
                    {ch.desc}
                  </p>
                  {(ch as any).note && (
                    <p className="text-[10px] md:text-[11px] text-[#8ab4f8]/95 italic border-s-2 border-[#8ab4f8]/50 ps-2 leading-relaxed">
                      &ldquo;{(ch as any).note}&rdquo;
                    </p>
                  )}
                  {(ch as any).highlight && (
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[9px] md:text-[10px] text-gray-300 leading-snug">
                      <span className="font-bold text-[#8ab4f8]">{lang === 'ar' ? 'الحفاظ على المفصل: ' : 'Joint Preservation: '}</span>
                      <span>{(ch as any).highlight}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/5 flex-wrap">
                {ch.type === "doctor_intro" ? (
                  <>
                    <button 
                      onClick={() => scrollToChapter(2)}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-3.5 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102 cursor-pointer active:scale-98"
                    >
                      <span>{ch.primaryAction}</span>
                      {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={() => setIsDoctorBioOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-200 text-[10px] md:text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#8ab4f8]" />
                      <span>{(ch as any).secondaryAction}</span>
                    </button>
                  </>
                ) : ch.type === "proof" ? (
                  <>
                    <button 
                      onClick={() => {
                        const el = document.getElementById('before-after-cases');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-3.5 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102 cursor-pointer active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8ab4f8]" />
                      <span>{ch.primaryAction}</span>
                    </button>
                    <button 
                      onClick={() => setIsProofOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-200 text-[10px] md:text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-[#8ab4f8]" />
                      <span>{(ch as any).secondaryAction}</span>
                    </button>
                  </>
                ) : ch.type === "booking_close" ? (
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-[0_4px_20px_rgba(26,115,232,0.5)] transition-all transform hover:scale-102 animate-pulse cursor-pointer active:scale-98"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>{ch.primaryAction}</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => scrollToChapter(idx + 1)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold px-4 py-1.5 rounded-xl text-[11px] md:text-xs shadow-[0_4px_16px_rgba(26,115,232,0.35)] transition-all transform hover:scale-102 cursor-pointer active:scale-98"
                  >
                    <span>{ch.primaryAction}</span>
                    {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                )}

                {/* Instant WhatsApp Quick Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] md:text-[11px] font-semibold transition-all cursor-pointer"
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
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-[#8ab4f8] hover:text-white text-[10px] md:text-[11px] font-bold transition-all shadow-sm group cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8ab4f8] group-hover:scale-110 transition-transform" />
                    <span>{isRtl ? 'شاهد نتائج الحالات السريرية (قبل وبعد) ↓' : 'View Clinical Case Results (Before & After) ↓'}</span>
                  </button>
                  <div className="flex flex-col gap-1 text-[9px] md:text-[10px] text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8ab4f8] shrink-0" />
                      <span>{current.branches.sharjah}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8ab4f8] shrink-0" />
                      <span>{current.branches.ajman}</span>
                    </div>
                    {(ch as any).languagesNote && (
                      <div className="flex items-center gap-1 text-[#8ab4f8] font-medium pt-0.5">
                        <Globe className="w-3 h-3 text-[#8ab4f8] shrink-0" />
                        <span>{(ch as any).languagesNote}</span>
                      </div>
                    )}
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

              {/* Doctor Medical Bio Narrative from PDF Page 3 */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[10px] font-bold text-[#8ab4f8] uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'نبذة عن المسيرة الطبية والجراحية' : 'Medical & Surgical Background'}
                </span>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  {current.doctorModal.bio}
                </p>
              </div>

              {/* Accreditations & Credentials */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 px-1">
                  <Award className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{current.doctorModal.credentialsTitle || (lang === 'ar' ? 'المؤهلات العلمية' : 'Academic Credentials')}</span>
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

              {/* Medical Philosophy Quote Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1a73e8]/15 to-transparent border border-[#8ab4f8]/30 relative">
                <Quote className="w-5 h-5 text-[#8ab4f8]/40 absolute top-3 end-3" />
                <span className="text-[10px] font-bold text-[#8ab4f8] uppercase tracking-wider block mb-1">
                  {current.doctorModal.philosophyTitle || (lang === 'ar' ? 'نهجي في العلاج' : 'Clinical Philosophy')}
                </span>
                <p className="text-xs text-gray-200 leading-relaxed font-light italic">
                  &ldquo;{current.doctorModal.philosophy}&rdquo;
                </p>
              </div>

              {/* Core Subspecialties */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 px-1">
                  <Stethoscope className="w-3.5 h-3.5 text-[#8ab4f8]" />
                  <span>{current.doctorModal.subspecialtiesTitle || (lang === 'ar' ? 'مجالات الاختصاص والتميز السريري' : 'Clinical Subspecialties')}</span>
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
                      {(hosp as any).badge && (
                        <span className="inline-block text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30 mb-1">
                          {(hosp as any).badge}
                        </span>
                      )}
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

            {/* Detailed Clinical Narrative from PDF Page 7 */}
            <div className="space-y-2 mb-4">
              {current.proofModal.body1 && (
                <p className="text-[11px] text-gray-200 leading-relaxed p-2.5 rounded-xl bg-white/5 border border-white/5">
                  {current.proofModal.body1}
                </p>
              )}
              {current.proofModal.body2 && (
                <p className="text-[11px] text-gray-300 leading-relaxed p-2.5 rounded-xl bg-white/5 border border-white/5">
                  {current.proofModal.body2}
                </p>
              )}
              {current.proofModal.body3 && (
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1a73e8]/15 to-transparent border border-[#8ab4f8]/30">
                  <span className="text-[10px] font-bold text-[#8ab4f8] block mb-0.5">
                    {lang === 'ar' ? 'الحفاظ على المفصل متى كان ذلك ممكناً' : 'Joint Preservation Philosophy'}
                  </span>
                  <p className="text-[10px] text-gray-200 leading-relaxed">
                    {current.proofModal.body3}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsProofOpen(false);
                  const el = document.getElementById('before-after-cases');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1a73e8] via-[#155fc3] to-[#0c4186] hover:from-[#1b66ca] hover:to-[#0c4186] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>{current.proofModal.cta}</span>
              </button>

              <button
                onClick={() => {
                  setIsProofOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-gray-300 hover:text-white font-semibold text-[11px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#8ab4f8]" />
                <span>{current.modal.title}</span>
              </button>
            </div>
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a73e8]/20 border border-[#8ab4f8]/30 text-[#8ab4f8] text-[10px] font-semibold mb-2">
                  <CalendarCheck className="w-3 h-3 text-[#8ab4f8]" />
                  <span>{current.modal.badge}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#8ab4f8] text-[10px] font-semibold mb-0.5">
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

                  {/* Official Doctor Signature Footer from PDF Page 10 */}
                  <div className="pt-2.5 text-center border-t border-white/10 mt-2">
                    <p className="text-[9px] text-[#8ab4f8]/90 font-medium leading-relaxed">
                      {current.modal.doctorSignoff}
                    </p>
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
