interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionPreferences({ form, onChange }: Props) {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Housing Preferences{" "}
        <span className="text-sm text-gray-500 ml-1">(Optional)</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="budgetRange"
          value={form.budgetRange}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">Select budget range</option>
          <option value="under-500">Under $500/month</option>
          <option value="500-750">$500 - $750/month</option>
          <option value="750-1000">$750 - $1000/month</option>
          <option value="over-1000">Over $1000/month</option>
        </select>
        <select
          name="roomType"
          value={form.roomType}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">Select room type</option>
          <option value="single">Single Room</option>
          <option value="shared">Shared Room</option>
          <option value="studio">Studio Apartment</option>
          <option value="no-preference">No Preference</option>
        </select>
      </div>
    </div>
  );
}
