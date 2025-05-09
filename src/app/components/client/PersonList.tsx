// src/app/components/PersonList.tsx

'use client';

import { useEffect, useState } from 'react';

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch('api/person');
      if (response.ok) {
        const data = await response.json();
        setPeople(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h2>List of People</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {people.map((person: any) => (
          <li key={person.id}>
            {person.firstName} - {person.gender} - {person.birthDate}
            <br />
            Father: {person.father?.name || 'N/A'}, Mother: {person.mother?.name || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
