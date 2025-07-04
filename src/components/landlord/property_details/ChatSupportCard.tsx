export default function ChatSupportCard() {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-indigo-600 p-4">
          <h2 className="text-lg font-bold text-white">
            Customer Support Chat
          </h2>
        </div>
        <div className="p-4 h-80 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            <div className="flex justify-start">
              <div className="chat-message bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">
                  Hello! How can I help you with your property today?
                </p>
                <p className="text-xs text-gray-500 mt-1">Support • 10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="chat-message bg-indigo-100 rounded-lg p-3">
                <p className="text-sm">
                  I need help with updating my property photos.
                </p>
                <p className="text-xs text-gray-500 mt-1">You • 10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="chat-message bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">
                  I'd be happy to help with that! You can add or update photos
                  in the Bedrooms or Shared Spaces sections.
                </p>
                <p className="text-xs text-gray-500 mt-1">Support • 10:35 AM</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
