"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ProgressBar() {
  const { t } = useLanguage();

  const steps = [
    { label: t("auth.SelectRole.roleSelected") },
    { label: t("auth.SelectRole.studentInfoStep") },
    { label: t("auth.SelectRole.completeStep") },
  ];

  const currentStep = 2; // 1-based index of current step

  return (
    <div className="mb-8 p-6">
      <div className="flex items-center justify-between relative">
        {/* Horizontal line connecting steps */}
        <div className="absolute top-3.5 left-0 w-full h-1 bg-gray-300 rounded-full z-0"></div>
        <div
          className="absolute top-3.5 left-0 h-1 bg-blue-500 rounded-full z-10"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const status =
            index + 1 < currentStep
              ? "completed"
              : index + 1 === currentStep
              ? "current"
              : "upcoming";

          const circleClasses =
            status === "completed"
              ? "bg-green-500 text-white"
              : status === "current"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-400";

          const textClasses =
            status === "completed"
              ? "text-green-500 font-semibold"
              : status === "current"
              ? "text-blue-600 font-semibold"
              : "text-gray-400";

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-20"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${circleClasses}`}
              >
                {status === "completed" ? "✓" : index + 1}
              </div>
              <span className={`mt-2 text-sm text-center ${textClasses}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
