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
    default: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والمناظير",
    template: "%s | د. محمد كمال علي"
  },
  description: "د. محمد كمال علي: استشاري جراحة العظام والمناظير وإصابات الملاعب وتصحيح تقوس وتشوهات الأطراف. احجز استشارتك في الشارقة (مستشفى دار الكمال) وعجمان (مركز العلاج الطبي). | Dr. Mohamed Kamal Ali: Consultant Orthopedic, Arthroscopy & Joint Care Surgeon in Sharjah & Ajman.",
  keywords: [
    "دكتور محمد كمال علي",
    "استشاري جراحة عظام",
    "مناظير الركبة",
    "إصابات الملاعب",
    "الرباط الصليبي",
    "تصحيح تقوس الساقين",
    "تطويل الأطراف",
    "مستشفى دار الكمال الشارقة",
    "مركز العلاج الطبي عجمان",
    "Dr Mohamed Kamal Ali",
    "Orthopedic Consultant UAE",
    "Knee Arthroscopy Sharjah",
    "Limb Deformity Correction",
    "Joint Preservation"
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
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali — استشاري جراحة العظام والمناظير",
    description: "استشاري جراحة العظام والمفاصل والطب الرياضي ومناظير الركبة وتقويم تشوهات الأطراف في الشارقة وعجمان. احجز استشارتك الآن عبر واتساب. | Consultant Orthopedic Surgeon, Arthroscopy & Joint Care in Sharjah & Ajman.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "د. محمد كمال علي - استشاري جراحة العظام والمفاصل والمناظير",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "د. محمد كمال علي | Dr. Mohamed Kamal Ali",
    description: "استشاري جراحة العظام والمناظير وإصابات الملاعب — مستشفى دار الكمال (الشارقة) ومركز العلاج الطبي (عجمان).",
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
    "jobTitle": "Consultant Orthopedic Surgeon | استشاري جراحة العظام والمناظير",
    "image": "https://dr-mohamed-kamal-ali.vercel.app/og-image.jpg",
    "medicalSpecialty": [
      "OrthopedicSurgery",
      "SportsMedicine",
      "Arthroscopy",
      "JointPreservation"
    ],
    "description": "استشاري جراحة العظام والمفاصل والطب الرياضي ومناظير الركبة وتقويم تشوهات الأطراف في الشارقة وعجمان.",
    "telephone": "+971501234567",
    "url": "https://dr-mohamed-kamal-ali.vercel.app",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Dar Al Kamal Hospital",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      },
      {
        "@type": "PostalAddress",
        "name": "Medical Treatment Center",
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
