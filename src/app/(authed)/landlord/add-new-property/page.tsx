export default function AddNewPro() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* <!-- Header --> */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              id="back-button"
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              Add New Property
            </h1>
          </div>
          <div>
            <button
              id="save-draft-btn"
              className="text-indigo-600 font-medium text-sm hover:text-indigo-800"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Progress Steps --> */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div id="step-indicator-1" className="step-indicator active">
              1
            </div>
            <span className="text-xs font-medium mt-2 text-indigo-600">
              Property Type
            </span>
          </div>
          <div id="step-line-1" className="step-line"></div>
          <div className="flex flex-col items-center">
            <div id="step-indicator-2" className="step-indicator">
              2
            </div>
            <span className="text-xs font-medium mt-2 text-gray-500">
              Property Details
            </span>
          </div>
          <div id="step-line-2" className="step-line"></div>
          <div className="flex flex-col items-center">
            <div id="step-indicator-3" className="step-indicator">
              3
            </div>
            <span className="text-xs font-medium mt-2 text-gray-500">
              Rooms
            </span>
          </div>
          <div id="step-line-3" className="step-line"></div>
          <div className="flex flex-col items-center">
            <div id="step-indicator-4" className="step-indicator">
              4
            </div>
            <span className="text-xs font-medium mt-2 text-gray-500">
              Photos
            </span>
          </div>
          <div id="step-line-4" className="step-line"></div>
          <div className="flex flex-col items-center">
            <div id="step-indicator-5" className="step-indicator">
              5
            </div>
            <span className="text-xs font-medium mt-2 text-gray-500">
              Review
            </span>
          </div>
        </div>
      </div>

      {/* <!-- Step Content --> */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* <!-- Step 1: Property Type --> */}
        <div id="step-1" className="tab-content active">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Select Property Type
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="room-type-option border-2 rounded-lg p-5 flex items-center selected border-indigo-600">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">House</h4>
                <p className="text-sm text-gray-500">
                  Entire house with multiple rooms
                </p>
              </div>
            </div>

            <div className="room-type-option border-2 rounded-lg p-5 flex items-center border-indigo-600 border-gray-200">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Apartment</h4>
                <p className="text-sm text-gray-500">
                  Flat or apartment in a building
                </p>
              </div>
            </div>

            <div className="room-type-option border-2 border-gray-200 rounded-lg p-5 flex items-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Dormitory</h4>
                <p className="text-sm text-gray-500">
                  Student housing with shared facilities
                </p>
              </div>
            </div>

            <div className="room-type-option border-2 border-gray-200 rounded-lg p-5 flex items-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Other</h4>
                <p className="text-sm text-gray-500">Custom property type</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  The property type helps us optimize your listing for potential
                  tenants. You can add multiple rooms to any property type.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Step 2: Property Details --> */}
        <div id="step-2" className="tab-content">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Property Details
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name*
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Modern Family Home"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={5}
                  placeholder="Describe your property..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Size (sq ft)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 1800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2010"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code*
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Zip code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Included Utilities
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                    Water
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                    Electricity
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                    WiFi
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Gas
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Trash
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Cable TV
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Features
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Parking
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Laundry
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                    Air Conditioning
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                    Heating
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Dishwasher
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Gym
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    Pool
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Step 3: Rooms Setup --> */}
        <div id="step-3" className="tab-content">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Room Configuration
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <div className="flex">
                <button
                  id="bedroom-minus"
                  className="w-10 h-10 bg-gray-100 rounded-l-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    ></path>
                  </svg>
                </button>
                <input
                  id="bedroom-count"
                  type="number"
                  className="w-full h-10 border-y border-gray-300 text-center"
                  value="4"
                  min="1"
                  max="20"
                />
                <button
                  id="bedroom-plus"
                  className="w-10 h-10 bg-gray-100 rounded-r-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <div className="flex">
                <button
                  id="bathroom-minus"
                  className="w-10 h-10 bg-gray-100 rounded-l-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    ></path>
                  </svg>
                </button>
                <input
                  id="bathroom-count"
                  type="number"
                  className="w-full h-10 border-y border-gray-300 text-center"
                  value="2"
                  min="1"
                  max="10"
                />
                <button
                  id="bathroom-plus"
                  className="w-10 h-10 bg-gray-100 rounded-r-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Monthly Rent ($)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 3000"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shared Spaces
            </label>
            <div className="flex flex-wrap gap-2">
              <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                Kitchen
              </div>
              <div className="amenity-tag selected bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm">
                Living Room
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Dining Room
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Laundry Room
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Study Room
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Backyard
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Patio
              </div>
              <div className="amenity-tag bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                Garage
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-700">
              Bedroom Details
            </h3>
            <button
              id="add-bedroom-btn"
              className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add Bedroom
            </button>
          </div>

          <div
            id="bedroom-container"
            className="space-y-5 max-h-96 overflow-y-auto pr-2"
          >
            {/* <!-- Bedroom 1 --> */}
            <div className="bedroom-card border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Bedroom 1</h4>
                <div className="flex items-center">
                  <span className="text-xs text-indigo-600 font-medium mr-2">
                    Master Suite
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Monthly Rate ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="850"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Size (sq ft)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="180"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Bathroom Type
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="private" selected>
                    Private Bathroom
                  </option>
                  <option value="shared">Shared Bathroom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Closet
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Desk
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    TV
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Balcony
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Bedroom 2 --> */}
            <div className="bedroom-card border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Bedroom 2</h4>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Monthly Rate ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="750"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Size (sq ft)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="150"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Bathroom Type
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="private">Private Bathroom</option>
                  <option value="shared" selected>
                    Shared Bathroom
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Closet
                  </div>
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Desk
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    TV
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Balcony
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Bedroom 3 --> */}
            <div className="bedroom-card border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Bedroom 3</h4>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Monthly Rate ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="750"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Size (sq ft)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="145"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Bathroom Type
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="private">Private Bathroom</option>
                  <option value="shared" selected>
                    Shared Bathroom
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Closet
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Desk
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    TV
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Balcony
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Bedroom 4 --> */}
            <div className="bedroom-card border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Bedroom 4</h4>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Monthly Rate ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="750"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Size (sq ft)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value="140"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Bathroom Type
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="private">Private Bathroom</option>
                  <option value="shared" selected>
                    Shared Bathroom
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  <div className="amenity-tag selected bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    Closet
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Desk
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    TV
                  </div>
                  <div className="amenity-tag bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Balcony
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Step 4: Photos Upload --> */}
        <div id="step-4" className="tab-content">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Property Photos
          </h2>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Property Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-sm text-gray-500 mb-2">
                Drag and drop your photos here
              </p>
              <p className="text-xs text-gray-400 mb-4">or</p>
              <button className="bg-indigo-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-indigo-700">
                Browse Files
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Upload up to 10 photos (max 5MB each)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="image-upload-preview">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                alt="Property Photo"
              />
              <div className="image-upload-actions">
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="image-upload-preview">
              <img
                src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
                alt="Property Photo"
              />
              <div className="image-upload-actions">
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="image-upload-preview">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Property Photo"
              />
              <div className="image-upload-actions">
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button className="bg-white p-1.5 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Bedroom Photos</h4>
              <p className="text-xs text-gray-500 mb-4">
                Add photos for each bedroom to showcase them to potential
                tenants
              </p>
              <button className="w-full bg-white border border-gray-300 text-indigo-600 text-sm py-2.5 rounded-md font-medium hover:bg-gray-50">
                Add Bedroom Photos
              </button>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Shared Spaces Photos</h4>
              <p className="text-xs text-gray-500 mb-4">
                Add photos of kitchen, living room, and other shared spaces
              </p>
              <button className="w-full bg-white border border-gray-300 text-indigo-600 text-sm py-2.5 rounded-md font-medium hover:bg-gray-50">
                Add Shared Space Photos
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Step 5: Review --> */}
        <div id="step-5" className="tab-content">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Review Property Details
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  Property Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Property Type:
                    </span>
                    <span className="text-sm font-medium">House</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Property Name:
                    </span>
                    <span className="text-sm font-medium">
                      Modern Family Home
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Address:</span>
                    <span className="text-sm font-medium">
                      123 Main St, San Francisco, CA 94105
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Size:</span>
                    <span className="text-sm font-medium">1,800 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Total Monthly Rent:
                    </span>
                    <span className="text-sm font-medium">$3,100</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  Room Configuration
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Bedrooms:</span>
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Bathrooms:</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Shared Spaces:
                    </span>
                    <span className="text-sm font-medium">
                      Kitchen, Living Room
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  Utilities &amp; Features
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Utilities Included:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      Water
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      Electricity
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      WiFi
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Property Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      Air Conditioning
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      Heating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  Property Photos
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                    alt="Property"
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
                    alt="Property"
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                    alt="Property"
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  Bedroom Details
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Bedroom 1 (Master Suite)
                      </span>
                      <span className="text-sm text-indigo-600 font-medium">
                        $850/month
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      180 sq ft • Private Bathroom
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bedroom 2</span>
                      <span className="text-sm text-indigo-600 font-medium">
                        $750/month
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      150 sq ft • Shared Bathroom
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bedroom 3</span>
                      <span className="text-sm text-indigo-600 font-medium">
                        $750/month
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      145 sq ft • Shared Bathroom
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bedroom 4</span>
                      <span className="text-sm text-indigo-600 font-medium">
                        $750/month
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      140 sq ft • Shared Bathroom
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-indigo-700">
                      After publishing, you can edit property details, add more
                      photos, and manage room availability at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label className="toggle-switch mr-3">
                  <input type="checkbox" checked />
                  <span className="toggle-slider"></span>
                </label>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Publish Property
                  </h4>
                  <p className="text-sm text-gray-500">
                    Make this property visible to potential tenants
                  </p>
                </div>
              </div>
              <div>
                <button
                  id="publish-property-btn"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-md hover:bg-indigo-700"
                >
                  Publish Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Navigation Buttons --> */}
      <div className="flex justify-between mt-6">
        <button
          id="prev-step"
          className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-50 hidden"
        >
          Previous
        </button>
        <button
          id="next-step"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-md hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
