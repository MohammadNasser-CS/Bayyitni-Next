export default function ProgressBar() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3">
            ✓
          </div>
          <span className="text-white font-medium">Role Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
            2
          </div>
          <span className="text-white font-medium">Student Information</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-sm font-bold mr-3">
            3
          </div>
          <span className="text-white opacity-60 font-medium">Complete</span>
        </div>
      </div>
      <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: "66%" }}
        />
      </div>
    </div>
  );
}
