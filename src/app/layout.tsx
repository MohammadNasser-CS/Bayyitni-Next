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
      ? "بيتتني – منصّة السكن الطلابي"
      : "Bayyitni – Student Housing & Rentals",

    description: isAR
      ? "بيتتني هي المنصة الأولى لسكن الطلاب في فلسطين والمنطقة العربية. اعثر على غرف وشقق قريبة من الجامعات مع معلومات كاملة وصور وحجز سهل."
      : "Bayyitni is the leading platform for student housing, rentals, and verified listings across Palestine and the Arab region.",

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
        ? "بيتتني – اعثر على سكنك الطلابي المثالي"
        : "Bayyitni – Find Your Perfect Student Housing",
      description: isAR
        ? "اكتشف غرف وشقق طلابية موثوقة وقريبة من الجامعات في فلسطين والمنطقة العربية."
        : "Discover verified student housing, affordable rooms, and university-near rentals across Palestine and the Arab world.",
      url: "https://bayyitni.com",
      siteName: isAR ? "بيتتني" : "Bayyitni",
      locale: isAR ? "ar_PS" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isAR
        ? "بيتتني – منصة السكن الطلابي"
        : "Bayyitni – Student Housing Platform",
      description: isAR
        ? "اعثر على غرف وشقق طلابية موثوقة عبر فلسطين والمنطقة العربية."
        : "Find student rooms, apartments, and verified landlords across Palestine.",
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
