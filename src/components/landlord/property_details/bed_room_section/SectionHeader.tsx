import { Plus } from "lucide-react";

export default function SectionHeader({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 text-secondary">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="add-room-btn bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm flex items-center">
          <Plus className="w-4 h-4 me-2" />
          {action}
        </button>
      </div>
    </>
  );
}
