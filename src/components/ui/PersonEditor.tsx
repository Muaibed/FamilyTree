// components/PersonEditor.tsx
import React, { useState } from "react";
import { Person } from "@/types/family";

interface PersonEditorProps {
  person?: Person;
  allPeople: Record<string, Person>;
  onSave: (person: Person) => void;
  onCancel: () => void;
}

export default function PersonEditor({
  person,
  allPeople,
  onSave,
  onCancel,
}: PersonEditorProps) {
  const isNewPerson = !person;

  const [formData, setFormData] = useState<Partial<Person>>(
    person || {
      id: crypto.randomUUID(),
      name: "",
      gender: "MALE",
      parentIds: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Person);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isNewPerson ? "Add New Person" : `Edit ${person?.name}`}
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select
          name="gender"
          value={formData.gender || "other"}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Other fields can be added here */}

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
