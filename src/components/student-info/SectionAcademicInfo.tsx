interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionAcademicInfo({ form, onChange }: Props) {
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        Academic Information
      </h3>
      <div className="space-y-4">
        <input
          name="universityName"
          value={form.universityName}
          onChange={onChange}
          placeholder="University"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        <input
          name="college"
          value={form.college}
          onChange={onChange}
          placeholder="College/School"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="degree"
            value={form.degree}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">Select degree level</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="diploma">Diploma</option>
            <option value="certificate">Certificate</option>
          </select>
          <input
            name="specialization"
            value={form.specialization}
            onChange={onChange}
            placeholder="Specialization / Major"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}
