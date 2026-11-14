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
  openGraph: {
    type: "website",
    locale: "ar_AE",
    alternateLocale: ["en_US"],
    url: "https://dr-mohamed-kamal-ali.vercel.app",
    siteName: "Dr. Mohamed Kamal Ali Clinic | عيادة د. محمد كمال علي",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والإصابات والطب الرياضي",
    description: "استشاري جراحة العظام والإصابات والطب الرياضي، حاصل على زمالة المجلس الأوروبي EBOT. خبرة 25+ عاماً في إعادة بناء الأطراف، تصحيح التشوهات، إطالة العظام واستبدال المفاصل — الشارقة وعجمان.",
    images: [
      {
        url: "/og-image.jpg",
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
    "jobTitle": "Consultant Orthopedic, Trauma & Sports Medicine Surgeon | استشاري جراحة العظام والإصابات والطب الرياضي",
    "image": "https://dr-mohamed-kamal-ali.vercel.app/og-image.jpg",
    "medicalSpecialty": [
      "OrthopedicSurgery",
      "SportsMedicine",
      "Arthroscopy",
      "LimbReconstruction",
      "JointReplacement",
      "TraumaSurgery"
    ],
    "description": "استشاري جراحة العظام والإصابات والطب الرياضي، حاصل على زمالة المجلس الأوروبي EBOT. خبرة 25+ عاماً في إعادة بناء الأطراف، تصحيح التشوهات العظمية، إطالة العظام، واستبدال المفاصل — الشارقة وعجمان.",
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
