import { useLanguage } from "@/context/LanguageContext";
import { BookOpenText } from "lucide-react";

interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionAcademicInfo({ form, onChange }: Props) {
  const { t } = useLanguage();

  // List of universities and colleges as keys, actual text localized via t()
  const universities = [
    "university_palestine",
    "birzeit_university",
    "alquds_university",
    "hebron_university",
    "annajah_university",
  ];

  const colleges = [
    "engineering",
    "business",
    "arts",
    "science",
    "law",
    "medicine",
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BookOpenText className="h-5 w-5 me-2" />
        {t("auth.SelectRole.student.studentInfo.academicInfo.title")}
      </h3>

      <div className="space-y-4">
        {/* University Select */}
        <select
          name="universityName"
          value={form.universityName}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">
            {t(
              "auth.SelectRole.student.studentInfo.academicInfo.universityPlaceholder"
            )}
          </option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {t(
                `auth.SelectRole.student.studentInfo.academicInfo.universities.${uni}`
              )}
            </option>
          ))}
        </select>

        {/* College Select */}
        <select
          name="college"
          value={form.college}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">
            {t(
              "auth.SelectRole.student.studentInfo.academicInfo.collegePlaceholder"
            )}
          </option>
          {colleges.map((col) => (
            <option key={col} value={col}>
              {t(
                `auth.SelectRole.student.studentInfo.academicInfo.colleges.${col}`
              )}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Degree Select */}
          <select
            name="degree"
            value={form.degree}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">
              {t(
                "auth.SelectRole.student.studentInfo.academicInfo.degreePlaceholder"
              )}
            </option>
            <option value="bachelor">
              {t("auth.SelectRole.student.studentInfo.academicInfo.bachelor")}
            </option>
            <option value="master">
              {t("auth.SelectRole.student.studentInfo.academicInfo.master")}
            </option>
            <option value="phd">
              {t("auth.SelectRole.student.studentInfo.academicInfo.phd")}
            </option>
            <option value="diploma">
              {t("auth.SelectRole.student.studentInfo.academicInfo.diploma")}
            </option>
            <option value="certificate">
              {t(
                "auth.SelectRole.student.studentInfo.academicInfo.certificate"
              )}
            </option>
          </select>

          {/* Specialization Input */}
          <input
            name="specialization"
            value={form.specialization}
            onChange={onChange}
            placeholder={t(
              "auth.SelectRole.student.studentInfo.academicInfo.specializationPlaceholder"
            )}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}
