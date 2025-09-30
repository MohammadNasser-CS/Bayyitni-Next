interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 ps-1 text-secondary">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </>
  );
}
