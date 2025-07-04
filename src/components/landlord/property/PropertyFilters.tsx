// src/components/landlord/property/PropertyFilters.tsx
export default function PropertyFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <select className="form-select">
            <option>All Properties</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Pending</option>
          </select>
          <select className="form-select">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Dormitory</option>
          </select>
          <select className="form-select">
            <option>Sort By: Newest</option>
            <option>Oldest</option>
            <option>Price (High to Low)</option>
            <option>Price (Low to High)</option>
          </select>
        </div>

        <div className="relative w-full lg:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>
    </div>
  );
}
