//src/components/landlord/property/LandlordHeader.tsx
export default function LandlordHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
      <button
        id="add-property-btn"
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow hover:bg-primary transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        Add New Property
      </button>
    </div>
  );
}
