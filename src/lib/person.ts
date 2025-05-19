// src/lib/person.ts
import { FamilyTreeData } from '@/types/family';
import { prisma } from './prisma';

export const createPerson = async (data: {
  firstName: string;
  familyName: string;
  gender: 'MALE' | 'FEMALE';
  birthDate?: Date;
  fatherId?: number;
  motherId?: number;
}) => {
  return prisma.person.create({
    data: {
      firstName: data.firstName,
      familyName: data.familyName,
      gender: data.gender,
      birthDate: data.birthDate ? data.birthDate : null,
      father: data.fatherId ? { connect: { id: data.fatherId } } : undefined,
      mother: data.motherId ? { connect: { id: data.motherId } } : undefined,
    },
  });
};

export const getPersonById = async (id: number) => {
  return prisma.person.findUnique({
    where: { id },
    include: {
      father: true,
      mother: true,
      fatherChildren: true,
      motherChildren: true,
      spouseConnections: true,
    },
  });
};

export const getAllPersons = async () => {
  return prisma.person.findMany({
    include: {
      father: true,
      mother: true,
      fatherChildren: true,
      motherChildren: true,
      spouseConnections: true
    }
  });
};

export const getAncestors = (
  data: FamilyTreeData,
  personId: string
): string | null => {
  // const data = await getFamilyTreeData();
  let person = personId ? data.people[personId] : null;
  if (!person) return null;
  const familyName = person.familyName;
  let theChildOf = person.gender === "MALE" ? " بن " : " بنت ";
  let fullName = "";

  let counter = 0;

  while (person.fatherId && counter < 5) {
    person = data.people[person.fatherId];
    if (!person) break;

    if (!person.fatherId) break;

    fullName += theChildOf + person.name;
    theChildOf = person.gender === "MALE" ? " بن " : " بنت ";
    counter++;
  }

  if (counter > 0) return fullName + " " + familyName;

  return "";
};

export const getAllMales = async () => {
  return prisma.person.findMany({
    where: {
      gender: "MALE",
    },
  });
};

export const getAllFemales = async () => {
  return prisma.person.findMany({
    where: {
      gender: "FEMALE",
    },
  });
};

export const getAllSpouses = async (personId: number) => {
  const person = await prisma.person.findUnique({
    where: { 
      id: personId 
    },
    include: {
      spouseConnections: {
        include: {
          spouse: true 
        }
      }
    }
  });

  if (!person) {
    return null;
  }

  const spouses = person.spouseConnections.map(connection => connection.spouse);
  
  return spouses;
};

export const updatePerson = async (id: number, data: {
  fistName?: string;
  familyName?: string;
  gender?: 'MALE' | 'FEMALE';
  fatherId?: number;
  motherId?: number;
  birthDate?: Date;
  deathDate?: Date;
}) => {
  return prisma.person.update({
    where: { id },
    data: {
      firstName: data.fistName,
      familyName: data.familyName,
      gender: data.gender,
      birthDate: data.birthDate,
      deathData: data.deathDate,
      father: data.fatherId ? { connect: { id: data.fatherId } } : undefined,
      mother: data.motherId ? { connect: { id: data.motherId } } : undefined,
    },
  });
};

export const deletePerson = async (id: number) => {
  return prisma.person.delete({
    where: { id },
  });
};
