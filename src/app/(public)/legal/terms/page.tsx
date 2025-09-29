// app/(public)/legal/terms/page.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl shadow-md mt-8">
        <header className="w-full px-6 py-4 flex justify-center mb-8">
          <img
            src="/images/branding/Bayyitni_logo_transparent_1.png"
            alt="Bayyitni Logo"
            className="w-60 h-26"
          />
        </header>

        <h1 className="text-3xl font-bold mb-6">{t("legal.terms.title")}</h1>
        <p className="text-sm text-gray-600 mb-8">
          {t("legal.terms.effectiveDate")}
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.accounts.title")}
            </h2>
            <p>{t("legal.terms.accounts.text")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.roles.title")}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: t("legal.terms.roles.text") }}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.platformRole.title")}
            </h2>
            <p>{t("legal.terms.platformRole.text")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.prohibitedUse.title")}
            </h2>
            <p>{t("legal.terms.prohibitedUse.text")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.liability.title")}
            </h2>
            <p>{t("legal.terms.liability.text")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {t("legal.terms.changes.title")}
            </h2>
            <p>{t("legal.terms.changes.text")}</p>
          </div>
        </section>

        {/* Back Button at Bottom */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => router.back()}
            className="text-sm bg-secondary hover:bg-labels text-white py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
          >
            {t("legal.backButton")}
          </button>
        </div>
      </main>
    </div>
  );
}
