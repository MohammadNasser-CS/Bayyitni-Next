interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionPersonalInfo({ form, onChange }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  );
}
