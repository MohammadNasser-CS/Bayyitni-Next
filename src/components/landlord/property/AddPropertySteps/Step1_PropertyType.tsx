"use client";

import { PropertyType } from "@/lib/enum/property_enums";
import { CreatePropertyRequest } from "@/types/property/property";
import { Dispatch, SetStateAction, useState } from "react";

interface Step1Props {
  propertyData: CreatePropertyRequest;
  setPropertyData: Dispatch<SetStateAction<CreatePropertyRequest>>;
  onNext: () => void;
}

const propertyTypes = [
  {
    label: "منزل مستقل",
    value: "house",
    bgColor: "bg-green-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    description: "منزل مستقل للتأجير لطلاب يبحثون عن سكن جامعي",
  },
  {
    label: "شقة",
    value: "apartment",
    bgColor: "bg-purple-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    description: "شقة في عمارة سكنية",
  },
  {
    label: "أستوديو",
    value: "studio",
    bgColor: "bg-yellow-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-yellow-600"
        viewBox="0 0 422.207 422.207"
        fill="currentColor"
      >
        <path
          d="M117.035,253.415c1.475-2.278,1.692-5.149,0.58-7.625l-19.836-44.147c-1.29-2.873-4.147-4.721-7.297-4.721h-30.94
          c-3.149,0-6.007,1.848-7.298,4.722L32.41,245.791c-1.111,2.475-0.893,5.346,0.581,7.624c1.475,2.279,4.003,3.654,6.717,3.654
          h11.069c-1.363,3.18-2.119,6.681-2.119,10.354v4.355c0,3.674,0.756,7.174,2.119,10.354H8c-4.418,0-8,3.582-8,8v113.762
          c0,4.418,3.582,8,8,8h101.552c4.418,0,8-3.582,8-8V290.133c0-4.418-3.582-8-8-8H99.248c1.364-3.18,2.12-6.681,2.12-10.354v-4.355
          c0-3.674-0.756-7.174-2.12-10.354h11.07C113.032,257.069,115.561,255.693,117.035,253.415z M64.718,212.921h20.589l12.646,28.147
          h-22.94h-22.94L64.718,212.921z M85.368,267.423v4.355c0,5.709-4.646,10.354-10.355,10.354s-10.354-4.645-10.354-10.354v-4.355
          c0-5.709,4.645-10.354,10.354-10.354S85.368,261.714,85.368,267.423z M101.552,298.133v23.059h-31.83c-4.418,0-8,3.582-8,8
          s3.582,8,8,8h31.83v19.645h-31.83c-4.418,0-8,3.582-8,8s3.582,8,8,8h31.83v23.058H16v-97.762H101.552z M212.727,211.364
          c0,4.418-3.582,8-8,8h-1.983c-4.418,0-8-3.582-8-8s3.582-8,8-8h1.983C209.145,203.364,212.727,206.945,212.727,211.364z
          M351.945,176.296c0,4.418-3.582,8-8,8h-1.982c-4.418,0-8-3.582-8-8s3.582-8,8-8h1.982
          C348.363,168.296,351.945,171.878,351.945,176.296z M379.79,211.364c0,4.418-3.582,8-8,8h-1.982c-4.418,0-8-3.582-8-8
          s3.582-8,8-8h1.982C376.208,203.364,379.79,206.945,379.79,211.364z M394.526,135.054h-40.07c0.332-0.879,0.514-1.832,0.514-2.827
          c0-4.418-3.582-8-8-8h-50.775c-4.418,0-8,3.582-8,8c0,0.995,0.182,1.948,0.514,2.827H163.434c3.104-5.068,4.895-11.023,4.895-17.389
          c0-18.41-14.978-33.387-33.387-33.387H65.809c-6.365,0-12.32,1.791-17.388,4.895v-54.65c0-13.35-10.861-24.21-24.211-24.21
          S0,21.173,0,34.522V251.4c0,4.418,3.582,8,8,8s8-3.582,8-8V34.522c0-4.527,3.684-8.21,8.212-8.21c4.526,0,8.209,3.683,8.209,8.21
          v137.848c0,4.418,3.582,8,8,8s8-3.582,8-8v-21.316h103.907v68.76c0,18.082,14.71,32.792,32.792,32.792h221.087v34.776H140.811
          c-4.418,0-8,3.582-8,8s3.582,8,8,8h232.976v17.387c0,4.418,3.582,8,8,8h32.421c4.418,0,8-3.582,8-8V162.735
          C422.207,147.472,409.789,135.054,394.526,135.054z M134.941,135.054H65.809c-9.588,0-17.388-7.8-17.388-17.389
          c0-9.587,7.8-17.387,17.388-17.387h69.133c9.587,0,17.387,7.8,17.387,17.389C152.328,127.254,144.528,135.054,134.941,135.054z
          M406.207,312.769h-16.421v-9.387h16.421V312.769z M406.207,236.606H185.12c-9.259,0-16.792-7.533-16.792-16.792v-68.76h226.198
          c6.44,0,11.681,5.24,11.681,11.681V236.606z M324.104,211.364c0,4.418-3.582,8-8,8h-1.983c-4.418,0-8-3.582-8-8
          s3.582-8,8-8h1.983C320.521,203.364,324.104,206.945,324.104,211.364z M240.57,176.296c0,4.418-3.582,8-8,8h-1.983
          c-4.418,0-8-3.582-8-8s3.582-8,8-8h1.983C236.988,168.296,240.57,171.878,240.57,176.296z M296.259,176.296c0,4.418-3.582,8-8,8
          h-1.983c-4.418,0-8-3.582-8-8s3.582-8,8-8h1.983C292.677,168.296,296.259,171.878,296.259,176.296z M268.415,211.364
          c0,4.418-3.582,8-8,8h-1.983c-4.418,0-8-3.582-8-8s3.582-8,8-8h1.983C264.833,203.364,268.415,206.945,268.415,211.364z"
        />
      </svg>
    ),
    description: "أستوديو مخصص لإسكان الطلاب",
  },
  {
    label: "نوع آخر",
    value: "other",
    bgColor: "bg-orange-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    description: "إضافة سكن طلابي مختلف",
  },
];

export default function Step1({
  propertyData,
  setPropertyData,
  onNext,
}: Step1Props) {
  const [selectedType, setSelectedType] = useState(
    propertyData.property_type || ""
  );

  const handleSelect = (value: PropertyType) => {
    setSelectedType(value);
  };

  const handleNext = () => {
    if (selectedType) {
      setPropertyData((prev) => ({ ...prev, property_type: selectedType }));

      console.log(propertyData.property_type);

      onNext();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6" dir="rtl">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        قم بتحديد نوع السكن الطلابي الذي تريد إضافته
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {propertyTypes.map((type) => {
          const isSelected = selectedType === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => handleSelect(type.value as PropertyType)}
              className={`room-type-option border-2 rounded-lg p-5 flex items-center transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50"
                }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ml-4 ${type.bgColor}`}
              >
                {type.icon}
              </div>
              <div className="text-right">
                <h4 className="font-medium text-gray-800">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0 ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-700">
              نوع السكن يساعدنا على تحسين عرض العقار للطلاب المهتمين. يمكنك
              إضافة عدة غرف لأي نوع سكن.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={handleNext}
          disabled={!selectedType}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors duration-200
            ${
              selectedType
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          التالي
        </button>
      </div>
    </div>
  );
}
