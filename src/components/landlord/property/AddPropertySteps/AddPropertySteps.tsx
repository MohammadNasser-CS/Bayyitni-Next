import { useLanguage } from "@/context/LanguageContext";
import React from "react";

interface AddPropertyStepsProps {
  currentStep: number;
}

const AddPropertySteps = ({ currentStep }: AddPropertyStepsProps) => {
  const { t } = useLanguage();
  const steps = [
    t("navigation.addNewPropertyStep1"),
    t("navigation.addNewPropertyStep2"),
    t("navigation.addNewPropertyStep3"),
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6" dir="rtl">
      <div className="flex items-center justify-end">
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <Step
              number={index + 1}
              label={label}
              active={index <= currentStep}
            />
            {index < steps.length - 1 && <StepLine />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function Step({
  number,
  label,
  active = false,
}: {
  number: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
          active ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        {number}
      </div>
      <span
        className={`text-xs font-medium mt-2 text-center ${
          active ? "text-indigo-600" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StepLine() {
  return <div className="flex-1 h-1 bg-gray-300 mx-2" />;
}

export default AddPropertySteps;
