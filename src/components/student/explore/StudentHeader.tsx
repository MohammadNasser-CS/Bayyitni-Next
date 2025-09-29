// src/components/student/explore/StudentHeader.tsx
import { useLanguage } from "@/context/LanguageContext";

export default function StudentHeader() {
  const { t } = useLanguage();

  return (
    <div className="mb-8 p-3 text-center sm:text-start">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        {t("student.explore.title")}
      </h1>
      <p className="text-muted-foreground">{t("student.explore.subtitle")}</p>
    </div>
  );
}
