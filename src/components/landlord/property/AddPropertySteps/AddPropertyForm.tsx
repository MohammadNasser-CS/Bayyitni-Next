"use client";

import { useState } from "react";
import AddPropertySteps from "./AddPropertySteps";
import Step2 from "./Step2_PropertyDetails";
import Step3 from "./Step3_AddRooms";
import { addNewProperty } from "@/utils/landlord/addNewProperty";
import { CreatePropertyRequest } from "@/types/property/property";
import {
  PropertyGenderPreference,
  PropertyStatus,
  PropertyType,
} from "@/lib/enum/property_enums";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { useRouter } from "next/navigation";
import { CityEnum, CountryEnum } from "@/lib/enum/location_enums";

const initialFormData: CreatePropertyRequest = {
  landlord_id: "",
  building_name: "",
  building_number: "",
  title: "",
  description: "",
  floor_number: 0,
  rooms_count: 0,
  location_lat: 0.0,
  location_lon: 0.0,
  status: PropertyStatus.Pending,
  gender_preference: PropertyGenderPreference.Any,
  has_gas: false,
  has_electricity: false,
  has_water: false,
  has_internet: false,
  property_type: PropertyType.Apartment,
  city: CityEnum.NABLUS,
  country: CountryEnum.PALESTINE,
  images: [],
  rooms: [], // will be filled after Step 2
};

export default function AddPropertyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [propertyData, setPropertyData] =
    useState<CreatePropertyRequest>(initialFormData);
  const [bedRoomsData, setBedRoomsData] = useState<CreateRoomRequest[]>([]);
  const totalSteps = 2; // only two steps now
  const isLastStep = currentStep === totalSteps - 1;

  const next = () =>
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  const back = () => setCurrentStep((step) => Math.max(step - 1, 0));

  /**
   * Final submit: combines property details with all added rooms
   * and sends one payload to backend.
   */
  const handleSubmit = async () => {
    try {
      const payload: CreatePropertyRequest = {
        ...propertyData,
        rooms: bedRoomsData,
        rooms_count: bedRoomsData.length,
      };

      console.log("Created Property:", payload);
      const result = await addNewProperty(payload);

      alert("Property with rooms created successfully!");
      console.log("Created Property:", result);

      // Optionally reset or redirect here
      setPropertyData(initialFormData);
      setBedRoomsData([]);
      setCurrentStep(0);
      router.replace("/landlord/");
    } catch (err) {
      console.error(err);
      alert("Error creating property");
    }
  };

  // Determine what to do when "Next" or "Submit" is pressed
  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      next();
    }
  };

  const steps = [
    <Step2
      key="property"
      propertyData={propertyData}
      setPropertyData={setPropertyData}
      onBack={back}
      onNext={next}
    />,
    <Step3
      key="rooms"
      bedRoomsData={bedRoomsData}
      setBedRoomsData={setBedRoomsData}
      onBack={back}
      onNext={handleNext} // final submit on this step
    />,
  ];

  return (
    <div>
      <AddPropertySteps currentStep={currentStep} />
      {steps[currentStep]}
    </div>
  );
}
