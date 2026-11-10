import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060b13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-mohamed-kamal-ali.vercel.app"),
  title: {
    default: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والمفاصل وإصابات الملاعب",
    template: "%s | د. محمد كمال علي"
  },
  description: "د. محمد كمال علي: استشاري جراحة العظام والمفاصل وإصابات الملاعب، حاصل على زمالة البورد الأوروبي EBOT وزمالة جامعة دوسلدورف بألمانيا. خبرة تمتد لأكثر من 25 عاماً في تطويل العظام وإعادة بناء الأطراف وتصحيح التشوهات واستبدال المفاصل ومناظير الركبة. احجز استشارتك في الشارقة أو عجمان. | Dr. Mohamed Kamal Ali: EBOT Fellow, 25+ years in bone lengthening, limb reconstruction & joint replacement in Sharjah & Ajman, UAE.",
  keywords: [
    "دكتور محمد كمال علي",
    "استشاري جراحة عظام",
    "جراحة العظام والمفاصل",
    "تطويل العظام",
    "إعادة بناء الأطراف",
    "تصحيح تقوس الساقين",
    "تقوس وتشوهات الأطراف",
    "البورد الأوروبي EBOT",
    "استبدال مفصل الركبة",
    "استبدال مفصل الورك",
    "مناظير الركبة",
    "إصابات الملاعب",
    "الرباط الصليبي",
    "جامعة عين شمس",
    "مستشفى دار الكمال الشارقة",
    "مركز العلاج الطبي عجمان",
    "Dr Mohamed Kamal Ali",
    "Orthopedic Consultant UAE",
    "EBOT Fellowship",
    "Bone Lengthening UAE",
    "Limb Reconstruction",
    "Limb Deformity Correction",
    "Knee Replacement Sharjah",
    "Hip Replacement UAE",
    "Knee Arthroscopy Sharjah",
    "Sports Injuries Ajman"
  ],
  authors: [{ name: "Dr. Mohamed Kamal Ali" }],
  creator: "Dr. Mohamed Kamal Ali",
  publisher: "Dr. Mohamed Kamal Ali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    alternateLocale: ["en_US"],
    url: "https://dr-mohamed-kamal-ali.vercel.app",
    siteName: "Dr. Mohamed Kamal Ali Clinic | عيادة د. محمد كمال علي",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والمفاصل",
    description: "استشاري جراحة العظام والمفاصل وإصابات الملاعب، حاصل على زمالة البورد الأوروبي EBOT. خبرة 25+ عاماً في تطويل العظام وإعادة بناء الأطراف واستبدال المفاصل — الشارقة وعجمان. | EBOT Fellow, 25+ years — Bone Lengthening, Limb Reconstruction & Joint Replacement in Sharjah & Ajman.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "د. محمد كمال علي - استشاري جراحة العظام والمفاصل وإصابات الملاعب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali",
    description: "استشاري جراحة العظام والمفاصل وإصابات الملاعب — زمالة البورد الأوروبي EBOT — مستشفى دار الكمال (الشارقة) ومركز العلاج الطبي (عجمان).",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/doctor-emblem.png",
    apple: "/doctor-emblem.png",
  },
  other: {
    "darkreader-lock": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Mohamed Kamal Ali | د. محمد كمال علي",
    "jobTitle": "Consultant Orthopedic & Joint Surgeon | استشاري جراحة العظام والمفاصل وإصابات الملاعب",
    "image": "https://dr-mohamed-kamal-ali.vercel.app/og-image.jpg",
    "medicalSpecialty": [
      "OrthopedicSurgery",
      "SportsMedicine",
      "Arthroscopy",
      "LimbReconstruction",
      "JointReplacement"
    ],
    "description": "استشاري جراحة العظام والمفاصل وإصابات الملاعب، حاصل على زمالة البورد الأوروبي EBOT. خبرة 25+ عاماً في تطويل العظام وإعادة بناء الأطراف واستبدال المفاصل — الشارقة وعجمان.",
    "telephone": "+971545650678",
    "url": "https://dr-mohamed-kamal-ali.vercel.app",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Ain Shams University",
        "address": { "@type": "PostalAddress", "addressLocality": "Cairo", "addressCountry": "EG" }
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "University of Düsseldorf",
        "address": { "@type": "PostalAddress", "addressLocality": "Düsseldorf", "addressCountry": "DE" }
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Board Certification",
        "name": "European Board of Orthopaedics and Traumatology (EBOT)",
        "dateCreated": "2012"
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Dar Al Kamal Hospital (Hospital Booking)",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      },
      {
        "@type": "PostalAddress",
        "name": "Medical Treatment Center (Clinic / Medical Centre Booking)",
        "addressLocality": "Ajman",
        "addressCountry": "AE"
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${cairo.variable} ${inter.variable} font-inter antialiased bg-[#060b13] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
