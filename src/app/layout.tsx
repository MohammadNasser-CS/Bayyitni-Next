import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { WhatsAppFloat } from "@/components/whatsapp/WhatsAppFloat";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ------------------------------
   ⭐ DYNAMIC BILINGUAL METADATA
--------------------------------*/
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "ar";

  const isAR = lang === "ar";

  return {
    title: isAR
      ? "بيتني | منصة السكن الطلابي في فلسطين"
      : "Bayyitni | Student Housing Platform In Palestine",

    description: isAR
      ? "بيتتني هي المنصة الأولى لسكن الطلاب في فلسطين. اعثر على غرف وشقق قريبة من الجامعات مع معلومات كاملة وصور وحجز سهل."
      : "Bayyitni is the leading platform for student housing, rentals, and verified listings across Palestine",
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
    icons: {
      icon: [
        {
          url: "/images/branding/Bayyitni_logo_master.png",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/images/branding/Bayyitni_logo_master.png",
          type: "image/png",
        },
      ],
    },

    openGraph: {
      title: isAR
        ? "بيتني | منصة السكن الطلابي في فلسطين"
        : "Bayyitni | Student Housing Platform In Palestine",
      description: isAR
        ? "بيتتني هي المنصة الأولى لسكن الطلاب في فلسطين. اعثر على غرف وشقق قريبة من الجامعات مع معلومات كاملة وصور وحجز سهل."
        : "Bayyitni is the leading platform for student housing, rentals, and verified listings across Palestine",
      url: "https://bayyitni.com",
      siteName: isAR ? "بيتتني" : "Bayyitni",
      locale: isAR ? "ar_PS" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isAR
        ? "بيتني | منصة السكن الطلابي في فلسطين"
        : "Bayyitni | Student Housing Platform In Palestine",
      description: isAR
        ? "بيتتني هي المنصة الأولى لسكن الطلاب في فلسطين. اعثر على غرف وشقق قريبة من الجامعات مع معلومات كاملة وصور وحجز سهل."
        : "Bayyitni is the leading platform for student housing, rentals, and verified listings across Palestine",
      creator: "@Bayyitni",
    },
  };
}

/* ------------------------------ 
  ⭐ ROOT LAYOUT 
--------------------------------*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: <html lang> will be controlled by the client LanguageProvider
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
