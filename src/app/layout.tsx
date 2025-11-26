import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { WhatsAppFloat } from "@/components/whatsapp/WhatsAppFloat";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css"; // <-- important, global import
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bayyitni | Student Housing & Rentals Platform in Palestine and MENA",
  description:
    "Bayyitni is the leading platform for student housing, room rentals, apartments, and shared accommodation in Palestine and the Arab world. Find verified landlords, trusted listings, affordable rooms, university-near apartments, female-only housing, and fully detailed property info with reviews, photos, maps, and online booking.",
  keywords: [
    // -------------------------------------------------------
    // 🔵 Brand Keywords
    // -------------------------------------------------------
    "Bayyitni",
    "Bayyitni platform",
    "Bayyitni housing",
    "بيتتني",
    "منصة بيتتني",

    // -------------------------------------------------------
    // 🔵 General Student Housing Keywords (Arabic)
    // -------------------------------------------------------
    "فلسطين سكن طلاب",
    "سكن للطلاب",
    "سكن طلاب",
    "سكن",
    "طلاب",
    "طالبات",
    "سكن للطالبات",
    "سكن طالبات",
    "سكنات طالبات",
    "سكن جامعي",
    "سكن جامعات",
    "سكن مشترك",
    "سكن شبابي",
    "سكن بنات",
    "سكن قريب من الجامعة",
    "غرف للإيجار",
    "غرف مفروشة",
    "استوديو",
    "استوديو للطالبات",
    "استوديو للإيجار",
    "تأجير شقق",
    "سكن مفروش",
    "سكن رخيص للطلاب",
    "شقق مفروشة",
    "غرفة طلابية",
    "سكن طلابي في فلسطين",
    "أفضل سكن طلاب",
    "سكن طلاب آمن",
    "سكن طلاب جديد",
    "سكن خاص للطلاب",

    // -------------------------------------------------------
    // 🔵 General Student Housing Keywords (English)
    // -------------------------------------------------------
    "student housing Palestine",
    "student accommodation",
    "student rooms",
    "student apartments",
    "student rentals Palestine",
    "shared accommodation",
    "rent rooms near university",
    "affordable student rooms",
    "girls student housing Palestine",
    "boys housing Palestine",
    "furnished student rooms",
    "student private rooms",
    "off-campus housing Palestine",
    "student dorm alternatives",
    "Arab housing marketplace",
    "MENA student housing",

    // -------------------------------------------------------
    // 🔵 An-Najah University Keywords (HIGH VALUE)
    // -------------------------------------------------------
    "جامعة النجاح",
    "جامعة النجاح الوطنية",
    "سكنات النجاح",
    "سكن النجاح",
    "سكن جامعة النجاح",
    "سكنات جامعة النجاح",
    "غرف لطلاب جامعة النجاح",
    "سكن للطالبات قرب النجاح",

    // Campus-specific
    "الحرم القديم",
    "سكن الحرم القديم",
    "سكنات الحرم القديم",
    "الحرم الجديد",
    "سكن الحرم الجديد",
    "سكنات الحرم الجديد",
    "الأكاديمية",
    "سكن الأكاديمية",
    "سكنات الأكاديمية",

    // -------------------------------------------------------
    // 🔵 City-Specific Keywords (Arabic)
    // -------------------------------------------------------
    "سكن نابلس",
    "نابلس سكن طلاب",
    "سكن رام الله",
    "سكن القدس",
    "سكن الخليل",
    "سكن طولكرم",
    "سكن جنين",
    "سكن قلقيلية",
    "سكن سلفيت",
    "سكن غزة",
    "سكن رفح",
    "سكن خان يونس",
    "سكن بيت لحم",

    // -------------------------------------------------------
    // 🔵 City-Specific Keywords (English)
    // -------------------------------------------------------
    "student housing Nablus",
    "student housing Ramallah",
    "student housing Hebron",
    "student housing Jerusalem",
    "student housing Gaza",
    "rooms for rent Nablus",
    "rooms for rent Palestine",
  ]
  ,
  authors: [{ name: "Senwan Devs Team" }],
  generator: "Senwan Devs Team",
  applicationName: "Bayyitni",
  openGraph: {
    title: "Bayyitni – Find Your Perfect Student Housing",
    description:
      "Discover verified student housing, affordable rental rooms, and university-near apartments. The trusted platform for students in Palestine and the Arab region.",
    url: "https://bayyitni.com",
    siteName: "Bayyitni",
    locale: "ar_PS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayyitni – Student Housing Platform",
    description:
      "Find student rooms, apartments, and verified landlords across Palestine and the Arab world.",
    creator: "@Bayyitni",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <ClerkProvider afterSignOutUrl="/">
        <AuthProvider>
          <body
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} bg-background`}
          >
            <LanguageProvider>
              {children}
              <WhatsAppFloat />
            </LanguageProvider>
            <Toaster position="top-right" reverseOrder={false} />
          </body>
        </AuthProvider>
      </ClerkProvider>
    </html>
  );
}
