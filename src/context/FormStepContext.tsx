// src/context/FormStepContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface StepContextProps {
  currentStep: number;
  next: () => void;
  back: () => void;
  goToStep: (step: number) => void;
}

const StepContext = createContext<StepContextProps | null>(null);

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) throw new Error("useStep must be used within StepProvider");
  return context;
};

export const StepProvider = ({
  children,
  totalSteps,
}: {
  children: React.ReactNode;
  totalSteps: number;
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () =>
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  const back = () => setCurrentStep((step) => Math.max(step - 1, 0));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <StepContext.Provider value={{ currentStep, next, back, goToStep }}>
      {children}
    </StepContext.Provider>
  );
};
