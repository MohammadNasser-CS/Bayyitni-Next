// src/components/landlord/property/Pagination.tsx
export default function Pagination() {
  return (
    <div className="mt-10 flex justify-center">
      <nav
        className="inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <a
          href="#"
          className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="px-3 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
        >
          1
        </a>
        <a
          href="#"
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          2
        </a>
        <a
          href="#"
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          3
        </a>
        <a
          href="#"
          className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Next
        </a>
      </nav>
    </div>
  );
}
