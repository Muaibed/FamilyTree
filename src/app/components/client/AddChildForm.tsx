// src/app/components/AddChildForm.tsx

'use client';

import { FamilyTreeData, Person } from '@/app/types/family';
import { getAllFemales, getAllMales } from '@/lib/person';
import { useState } from 'react';

const AddChildForm = ({FID, MID, members}:{FID?:string, MID?:string, members:FamilyTreeData}) => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [fatherId, setFatherId] = useState<string | undefined>(FID);
  const [motherId, setMotherId] = useState<string | undefined>(MID);
  const [birthDate, setbirthDate] = useState();
  const [deathDate, setDeathDate] = useState();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('api/person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, familyName, gender, fatherId, motherId }),
    });

    if (response.ok) {
      setSuccess(true);
      setError(null);
      setFirstName('');
      setFamilyName('');
      setGender('MALE');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Create Person</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="First Name"
      required
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      value={familyName}
      onChange={(e) => setFamilyName(e.target.value)}
      placeholder="Family Name"
      required
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE')}
      required
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
    </select>
  
    {fatherId && (
      <select
      value={motherId ?? ''}
      onChange={(e) => setMotherId(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Mother (optional)</option>
      {members.people[fatherId].spouses && (
        members.people[fatherId].spouses.map(spouse => {
          return(
          <option>
            {spouse}
          </option>
          )
        }))
      }
    </select>
    )}

    {motherId && (
      <select
      value={fatherId ?? ''}
      onChange={(e) => setMotherId(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Father</option>
      {members.people[motherId].spouses && (
        members.people[motherId].spouses.map(spouse => {
          return(
          <option>
            {spouse}
          </option>
          )
        }))
      }
    </select>
    )}
    <input
      type="date"
      value={birthDate}
      onChange={(e) => setFamilyName(e.target.value)}
      placeholder="Birth Date"
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    <input
      type="date"
      value={deathDate}
      onChange={(e) => setFamilyName(e.target.value)}
      placeholder="Death Date"
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
    >
      Submit
    </button>
  </form>

  {error && <div className="mt-4 text-red-500">{error}</div>}
  {success && <div className="mt-4 text-green-500">Person added successfully!</div>}
</div>

  );
};

export default AddChildForm;
