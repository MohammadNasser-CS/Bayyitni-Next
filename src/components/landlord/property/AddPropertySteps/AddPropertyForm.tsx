"use client";

import { useState } from "react";
import AddPropertySteps from "./AddPropertySteps";
import { CreatePropertyRequest } from "@/types/property/property";
import Step1 from "./Step1_PropertyType";
import Step2 from "./Step2_PropertyDetails";
import { postProperty } from "@/utils/landlord/createProperty";
import Step3 from "./Step3_AddRooms";
import { CreateBedroomRequest } from "@/types/rooms/rooms";
import { CreateSharedSpaceRequest } from "@/types/rooms/sharedSpaces";
import Step4 from "./Step4_ReviewStep";

const initialFormData: CreatePropertyRequest = {
  landlord_id: "",
  building_name: "",
  building_number: "",
  title: "",
  description: "",
  floor_number: 0,
  number_of_rooms: 0,
  location_lat: 0.0,
  location_lon: 0.0,
  is_active: true,
  gender_preference: "",
  has_gas: false,
  has_electricity: false,
  has_water: false,
  has_internet: false,
  property_type: "",
  city: "",
  country: "",
  property_image: undefined,
  verification_status: "verified",
};

export default function AddPropertyForm() {
  const [createdPropertyId, setCreatedPropertyId] = useState<number | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [propertyData, setPropertyData] =
    useState<CreatePropertyRequest>(initialFormData);
  const [bedRoomsData, setBedRoomsData] = useState<CreateBedroomRequest[]>([]);
  const [sharedSpacesData, setSharedSpacesData] = useState<
    CreateSharedSpaceRequest[]
  >([]);
  const totalSteps = 4;
  const isLastStep = currentStep === totalSteps - 1;

  const next = () =>
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  const back = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const handleSubmitProperty = async () => {
    try {
      const result = await postProperty(propertyData);
      alert("Property created successfully!");
      console.log("Created Property:", result);
      setCreatedPropertyId(result.id);
      // You can now redirect or move to next step (e.g., add rooms)
      next();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleSubmit = async () => {
    try {
      // 1. Create the property
      const propertyResponse = await postProperty(propertyData);
      setCreatedPropertyId(propertyResponse.id);

      // 2. Attach propertyId to bedrooms & shared spaces
      const bedroomsWithId = bedRoomsData.map((b) => ({
        ...b,
        property_listing_id: createdPropertyId,
      }));

      const sharedSpacesWithId = sharedSpacesData.map((s) => ({
        ...s,
        property_id: createdPropertyId,
      }));

      // 3. Create bedrooms
      await fetch("/api/bedrooms/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bedroomsWithId),
      });

      // 4. Create shared spaces
      await fetch("/api/sharedspaces/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sharedSpacesWithId),
      });

      alert("Property created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating property");
    }
  };

  // Conditionally choose next function depending on step
  const handleNext = () => {
    if (isLastStep) {
      // handleSubmitProperty();
    } else {
      next();
    }
  };

  const steps = [
    <Step1
      key="1"
      propertyData={propertyData}
      setPropertyData={setPropertyData}
      onNext={next}
    />,
    <Step2
      key="2"
      propertyData={propertyData}
      setPropertyData={setPropertyData}
      onBack={back}
      onNext={next} // Call submit on next
    />,
    <Step3
      key="3"
      bedRoomsData={bedRoomsData}
      setBedRoomsData={setBedRoomsData}
      sharedSpacesData={sharedSpacesData}
      setSharedSpacesData={setSharedSpacesData}
      onBack={back}
      onNext={next}
    />,
    <Step4
      key="review"
      propertyData={propertyData}
      bedRoomsData={bedRoomsData}
      sharedSpacesData={sharedSpacesData}
      onBack={back}
    />,
    // Step4, Step5 here
  ];

  return (
    <div>
      <AddPropertySteps currentStep={currentStep} />
      {steps[currentStep]}
    </div>
  );
}
