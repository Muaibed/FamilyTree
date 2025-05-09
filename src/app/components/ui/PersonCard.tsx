// components/PersonCard.tsx
import React from 'react';
import Image from 'next/image';
import { Person } from '@/app/types/family';

interface PersonCardProps {
  person: Person;
  onClick: (id: string) => void;
  isSelected?: boolean;
}

export default function PersonCard({ person, onClick, isSelected = false }: PersonCardProps) {
  return (
    <div 
      className={`p-4 border rounded-lg ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      onClick={() => onClick(person.id)}
    >
      <h3 className="font-bold text-center">{person.name}</h3>
    </div>
  );
}