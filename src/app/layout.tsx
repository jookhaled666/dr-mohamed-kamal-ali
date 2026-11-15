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
  metadataBase: new URL("https://www.drmohamedkamal.me"),
  title: {
    default: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والإصابات والطب الرياضي",
    template: "%s | د. محمد كمال علي"
  },
  description: "د. محمد كمال علي: استشاري جراحة العظام والإصابات والطب الرياضي، حاصل على زمالة المجلس الأوروبي لجراحة العظام والإصابات EBOT. خبرة أكثر من 25 عاماً وأكثر من 500 عملية ناجحة في إعادة بناء الأطراف وتصحيح التشوهات وإطالة العظام واستبدال المفاصل — الشارقة (مستشفى دار الكمال) وعجمان (مركز العلاج الطبي). | Dr. Mohamed Kamal Ali: EBOT Fellow, Consultant Orthopedic, Trauma & Sports Medicine Surgeon. 25+ years in limb reconstruction, bone lengthening, deformity correction & joint replacement.",
  keywords: [
    "دكتور محمد كمال علي",
    "استشاري جراحة العظام والإصابات",
    "الطب الرياضي",
    "إعادة بناء الأطراف بالمثبتات الخارجية",
    "تصحيح التشوهات بالإطارات سداسية المحاور",
    "إطالة الأطراف التجميلية",
    "تصحيح تقوس الساقين",
    "علاج الكسور غير الملتئمة",
    "المجلس الأوروبي EBOT",
    "استبدال مفصل الركبة",
    "استبدال مفصل الورك",
    "مناظير الركبة والكاحل",
    "الرباط الصليبي",
    "مستشفى دار الكمال الشارقة",
    "مركز العلاج الطبي عجمان",
    "Dr Mohamed Kamal Ali",
    "Orthopedic Trauma Surgeon UAE",
    "Sports Medicine UAE",
    "Hexapod Deformity Correction",
    "Limb Reconstruction UAE",
    "Cosmetic Limb Lengthening",
    "EBOT Fellow UAE"
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
  alternates: {
    canonical: "https://www.drmohamedkamal.me/",
    languages: {
      "ar": "https://www.drmohamedkamal.me/?lang=ar",
      "en": "https://www.drmohamedkamal.me/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    alternateLocale: ["en_US"],
    url: "https://www.drmohamedkamal.me/",
    siteName: "Dr. Mohamed Kamal Ali Clinic | عيادة د. محمد كمال علي",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والإصابات والطب الرياضي",
    description: "استشاري جراحة العظام والإصابات والطب الرياضي، حاصل على زمالة المجلس الأوروبي EBOT. خبرة 25+ عاماً في إعادة بناء الأطراف، تصحيح التشوهات، إطالة العظام واستبدال المفاصل — الشارقة وعجمان.",
    images: [
      {
        url: "https://www.drmohamedkamal.me/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "د. محمد كمال علي - استشاري جراحة العظام والإصابات والطب الرياضي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali",
    description: "استشاري جراحة العظام والإصابات والطب الرياضي — زمالة المجلس الأوروبي EBOT — مستشفى دار الكمال (الشارقة) ومركز العلاج الطبي (عجمان).",
    images: ["https://www.drmohamedkamal.me/og-image.jpg"],
  },
  icons: {
    icon: "/doctor-emblem.png",
    apple: "/doctor-emblem.png",
  },
  verification: {
    google: "nMn0klvRAmOdlI4zEFLAqSYnnVez0ZXDrGeykfxw52E",
  },
  other: {
    "darkreader-lock": "",
    "google-site-verification": "nMn0klvRAmOdlI4zEFLAqSYnnVez0ZXDrGeykfxw52E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    // ===== Schema 1: Physician (Person) =====
    {
      "@context": "https://schema.org",
      "@type": ["Physician", "Person"],
      "@id": "https://www.drmohamedkamal.me/#physician",
      "name": "Dr. Mohamed Kamal Ali",
      "alternateName": ["د. محمد كمال علي", "Mohamed Kamal Ali", "دكتور محمد كمال"],
      "jobTitle": "Consultant Orthopedic, Trauma & Sports Medicine Surgeon",
      "description": "Consultant Orthopedic, Trauma & Sports Medicine Surgeon with 25+ years of experience. EBOT Fellow. Specialist in limb reconstruction, deformity correction, bone lengthening, joint replacement, and sports injuries. Practicing in Sharjah (Dar Al Kamal Hospital) and Ajman (Medical Treatment Center), UAE.",
      "image": "https://www.drmohamedkamal.me/og-image.jpg",
      "url": "https://www.drmohamedkamal.me/",
      "telephone": "+971545650678",
      "sameAs": [
        "https://wa.me/971545650678",
        "https://www.drmohamedkamal.me/"
      ],
      "medicalSpecialty": [
        "Orthopedic Surgery",
        "Trauma Surgery",
        "Sports Medicine",
        "Limb Reconstruction",
        "Deformity Correction",
        "Bone Lengthening",
        "Joint Replacement",
        "Arthroscopy"
      ],
      "knowsLanguage": ["ar", "en", "de"],
      "nationality": { "@type": "Country", "name": "Egypt" },
      "worksFor": [
        {
          "@type": "Hospital",
          "name": "Dar Al Kamal Hospital",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "addressCountry": "AE"
          }
        },
        {
          "@type": "MedicalClinic",
          "name": "Medical Treatment Center (Elaj Medical Center)",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ajman",
            "addressRegion": "Ajman",
            "addressCountry": "AE"
          }
        }
      ],
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
          "credentialCategory": "degree",
          "name": "MBBCh — Bachelor of Medicine and Surgery",
          "educationalLevel": "Bachelor",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Ain Shams University" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "MSc Orthopedic Surgery",
          "educationalLevel": "Master",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Ain Shams University" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "MD — Doctorate in Orthopedic Surgery",
          "educationalLevel": "Doctorate",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Ain Shams University" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "fellowship",
          "name": "Orthopedic Surgery Fellowship",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "University of Düsseldorf, Germany" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Board Certification",
          "name": "European Board of Orthopaedics and Traumatology (EBOT)",
          "dateCreated": "2012",
          "recognizedBy": { "@type": "Organization", "name": "European Board of Orthopaedics and Traumatology" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "fellowship",
          "name": "Fellow of the Royal College of Surgeons in Ireland (FRCSI)",
          "recognizedBy": { "@type": "Organization", "name": "Royal College of Surgeons in Ireland" }
        }
      ]
    },
    // ===== Schema 2: MedicalBusiness (Sharjah) =====
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "Hospital"],
      "@id": "https://www.drmohamedkamal.me/#hospital-sharjah",
      "name": "Dr. Mohamed Kamal Ali — Dar Al Kamal Hospital | د. محمد كمال علي — مستشفى دار الكمال",
      "description": "Orthopedic consultant clinic of Dr. Mohamed Kamal Ali at Dar Al Kamal Hospital, Sharjah, UAE. Specializing in limb reconstruction, joint replacement, and sports injuries.",
      "url": "https://www.drmohamedkamal.me/",
      "telephone": "+971545650678",
      "image": "https://www.drmohamedkamal.me/og-image.jpg",
      "medicalSpecialty": "Orthopedic Surgery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dar Al Kamal Hospital",
        "addressLocality": "Sharjah",
        "addressRegion": "Sharjah",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "AE"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "$$",
      "currenciesAccepted": "AED",
      "paymentAccepted": "Cash, Card",
      "hasMap": "https://www.google.com/maps/search/Dar+Al+Kamal+Hospital+Sharjah",
      "employee": { "@id": "https://www.drmohamedkamal.me/#physician" }
    },
    // ===== Schema 3: MedicalBusiness (Ajman) =====
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "MedicalClinic"],
      "@id": "https://www.drmohamedkamal.me/#clinic-ajman",
      "name": "Dr. Mohamed Kamal Ali — Medical Treatment Center | د. محمد كمال علي — مركز العلاج الطبي",
      "description": "Orthopedic consultant clinic of Dr. Mohamed Kamal Ali at Medical Treatment Center (Elaj Medical Center), Ajman, UAE.",
      "url": "https://www.drmohamedkamal.me/",
      "telephone": "+971545650678",
      "image": "https://www.drmohamedkamal.me/og-image.jpg",
      "medicalSpecialty": "Orthopedic Surgery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Medical Treatment Center (Elaj Medical Center)",
        "addressLocality": "Ajman",
        "addressRegion": "Ajman",
        "addressCountry": "AE"
      },
      "employee": { "@id": "https://www.drmohamedkamal.me/#physician" }
    },
    // ===== Schema 4: WebSite =====
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.drmohamedkamal.me/#website",
      "url": "https://www.drmohamedkamal.me/",
      "name": "د. محمد كمال علي | Dr. Mohamed Kamal Ali",
      "description": "الموقع الرسمي لدكتور محمد كمال علي — استشاري جراحة العظام والإصابات والطب الرياضي في الإمارات",
      "inLanguage": ["ar", "en"],
      "publisher": { "@id": "https://www.drmohamedkamal.me/#physician" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.drmohamedkamal.me/"
      }
    }
  ];

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="nMn0klvRAmOdlI4zEFLAqSYnnVez0ZXDrGeykfxw52E" />
        {/* DNS Prefetch & Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Geo Tags for UAE */}
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Sharjah, Ajman, United Arab Emirates" />
        <meta name="language" content="Arabic" />
        <meta name="revisit-after" content="7 days" />
        {/* JSON-LD Structured Data — Multi-Schema */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
