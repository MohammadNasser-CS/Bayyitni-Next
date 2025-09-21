// src/app/landlord/properties/add/page.tsx
"use client";

import AddPropertyForm from "@/components/landlord/property/AddPropertySteps/AddPropertyForm";
export default function AddNewPropertyPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <AddPropertyForm />
    </div>
  );
}
