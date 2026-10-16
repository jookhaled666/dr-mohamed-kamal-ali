import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "Dr. Mohamed Kamal Ali | Consultant Orthopedic Surgeon",
  description: "Interactive digital clinic experience and booking funnel for Dr Mohamed Kamal Ali.",
  other: {
    "darkreader-lock": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
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
