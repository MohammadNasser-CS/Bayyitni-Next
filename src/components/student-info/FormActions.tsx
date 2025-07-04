"use client";
import { useRouter } from "next/navigation";

export default function FormActions() {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-100 py-3 px-6 rounded-lg"
      >
        ← Back to Role Selection
      </button>
      <button
        type="submit"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
      >
        Complete Registration →
      </button>
    </div>
  );
}
