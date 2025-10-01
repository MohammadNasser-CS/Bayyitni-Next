import { Plus } from "lucide-react";
interface SectionHeaderProps {
  title: string;
  action?: string;
  onActionClick?: () => void; // <-- new
}

export default function SectionHeader({
  title,
  action,
  onActionClick,
}: SectionHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 text-secondary">
        <h2 className="text-xl font-bold">{title}</h2>
        {action && (
          <button
            onClick={onActionClick} // <-- handle navigation
            className="text-sm bg-primary text-white hover:bg-orange-500 flex items-center rounded-lg px-3 py-1 gap-1 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            {action}
          </button>
        )}
      </div>
    </>
  );
}
