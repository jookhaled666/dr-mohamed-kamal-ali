# د. محمد كمال علي — تجربة العيادة الرقمية التفاعلية
# Dr. Mohamed Kamal Ali — Interactive Digital Clinic & Booking Funnel

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green?logo=greensock)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 🌟 نظرة عامة | Overview

صفحة هبوط طبية تفاعلية سريرية فائقة الفخامة لاستشاري جراحة العظام والمناظير ورعاية المفاصل المتقدمة **د. محمد كمال علي**، مبنية بالكامل لتوفير تجربة مستخدم سينمائية تبدأ من دخول العيادة وحتى إتمام حجز الموعد الطبي عبر الواتساب.

A state-of-the-art interactive medical clinic experience and high-conversion booking funnel for **Dr. Mohamed Kamal Ali** — Consultant Orthopedic Surgeon, Arthroscopy & Sports Medicine Specialist.

---

## ✨ المميزات الرئيسية | Core Features

### 🎬 1. جولة سريرية سينمائية بالتحكم التمريري (GSAP Scroll-Scrubbing Tour)
* فيديو متكامل عالي الوضوح يتفاعل بسلاسة مع تمرير المستخدم (Scroll-Scrubbed) بسرعة 60 إطاراً في الثانية.
* تقسيم سردي منظم في 6 فصول زمنية متدرجة:
  1. **الاستقبال والترحيب**: التعريف بالدكتور ورسالته *"الحركة هي الحياة"*.
  2. **اللقاء بالمكتب**: الاستشارة المباشرة بالبدلة الرسمية وشرح الفلسفة العلاجية.
  3. **المعطف الأبيض والتشخيص**: الانتقال السلس من السيرة المهنية إلى التخصصات الدقيقة.
  4. **مرافق التشخيص الرقمية**: غرف الرنين المغناطيسي والأشعة التخصصية.
  5. **رعاية المفاصل والطب التجديدي**: بروتوكولات الحقن التجديدي (PRP) والتعافي الرياضي.
  6. **العودة للاستقبال**: إتاحة الحجز الفوري واختيار العيادة.

### 🔬 2. سيكشن الحالات السريرية الواقعية (Interactive Before & After)
* معرض تفاعلي يوثق حالات حقيقية لتقويم تشوهات الأطراف واستقامة محور الساقين (*Genu Varum / Genu Valgum*).
* سلايدر مقارنة انسيابي مع إمكانية التبديل بنقرة واحدة (*Slider / Before / After*) بدقة متوافقة مع شاشات الهواتف بنسبة 100%.

### 💬 3. قمع حجز مباشر وفوري عبر واتساب (WhatsApp Booking Funnel)
* استمارة حجز زجاجية سريعة ومريحة مخصصة للهواتف.
* تحديد العيادة المفضلة:
  * **الشارقة** — مستشفى دار الكمال.
  * **عجمان** — مركز العلاج الطبي.
* إنشاء رسالة واتساب منسقة ومجدولة تلقائياً بالاسم ورقم الهاتف والحالة والملاحظات للتأكيد الفوري مع طاقم الاستقبال.

### 💎 4. عناصر واجهة متطورة (Luxury Frosted Glass & Dynamic Icons)
* هيدر جزيري زجاجي معلق بشعار وخاتم الدكتور الطبي.
* قائمة عائمة سريعة زجاجية (**Floating Action Menu**) مزودة بأيقونات حية ترسم خطوطها تلقائياً عبر مكتبة **Anime.js**.
* شاشة تحميل مخصصة بالهوية الطبية (**Preloader**) تضمن اكتمال تنزيل إطارات الفيديو الحيوية قبل العرض لمنع أي شاشات سوداء.
* دعم كامل للغتين العربية والإنجليزية (**Bilingual AR / EN**)، مع خطوط عربية ملكية (`Cairo`) وخطوط لاتينية حديثة (`Inter`).

---

## 🛠️ التقنيات المستخدمة | Tech Stack

* **Framework:** [Next.js 16.4](https://nextjs.org/) (App Router & Turbopack)
* **Library:** React 19
* **Styling:** Tailwind CSS v4 & Vanilla CSS Variables
* **Scroll & Motion:** GSAP 3 (ScrollTrigger) & Framer Motion
* **Vector Path Animation:** Anime.js v4 (`svg.createDrawable`)
* **Icons:** Lucide React
* **Typography:** Google Fonts (`Cairo` & `Inter`)

---

## 🚀 التشغيل محلياً | Local Development

```bash
# تثبيت الاعتماديات
npm install

# تشغيل خادم التطوير
npm run dev

# فتح المتصفح على:
# http://localhost:3000
```

---

## 📦 البناء للإنتاج | Production Build

```bash
# إنشاء حزمة الإنتاج
npm run build

# تشغيل خادم الإنتاج
npm run start
```

---

## 👨‍⚕️ الطبيب والمشروع | Medical Practice

* **الاسم:** د. محمد كمال علي (Dr. Mohamed Kamal Ali)
* **التخصص:** استشاري جراحة العظام والمفاصل والمناظير وإصابات الملاعب
* **الخبرة:** أكثر من 20 عاماً من الخبرة الجراحية والسريرية المعتمدة
* **الاعتمادات:** ترخيص وزارة الصحة ووقاية المجتمع (MOHAP) وعضو الجمعية الدولية لجراحة الركبة والمناظير (ISAKOS)
