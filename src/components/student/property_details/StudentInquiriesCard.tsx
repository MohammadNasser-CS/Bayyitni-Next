export default function StudentInquiriesCard() {
  return (
    <>
      {/* <!-- Student Inquiries Card --> */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Student Inquiries
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Is this property still available? I'm interested in the master
                bedroom.
              </p>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Reply
              </button>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-3">
                    AS
                  </div>
                  <div>
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Replied
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                What utilities are included in the rent?
              </p>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View Conversation
              </button>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center"
            >
              View All Inquiries
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
