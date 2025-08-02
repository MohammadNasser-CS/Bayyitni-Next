// src/app/landlord/properties/add/page.tsx
"use client";

import AddPropertyForm from "@/components/landlord/property/AddPropertySteps/AddPropertyForm";
import { useState } from "react";

export default function AddNewPropertyPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="max-w-5xl mx-auto">
      <AddPropertyForm />
    </div>
  );
}
