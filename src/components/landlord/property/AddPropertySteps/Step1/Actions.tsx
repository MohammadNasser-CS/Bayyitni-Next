// components/property/Step1/Actions.tsx
interface Props {
  canProceed: boolean;
  handleNext: () => void;
}

export default function Actions({ canProceed, handleNext }: Props) {
  return (
    <div className="flex justify-end px-4 mt-6">
      <button
        onClick={() => canProceed && handleNext()}
        disabled={!canProceed}
        className={`px-6 py-2 rounded-lg font-medium text-white transition-colors duration-200
            ${
              canProceed
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
      >
        Next
      </button>
    </div>
  );
}
