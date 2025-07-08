import { FamilyTreeData } from '@/types/family';
import { prisma } from './prisma';
import isValidDateString from './date';

export const createPerson = async (data: {
  firstName: string;
  familyId: string;
  gender: 'MALE' | 'FEMALE';
  phone?: string;
  birthDate?: Date;
  deathDate?: Date;
  fatherId?: number;
  motherId?: number;
}) => {
  const { firstName, familyId, gender, phone, birthDate, deathDate, fatherId, motherId } = data;

  return prisma.person.create({
    data: {
      firstName: firstName,
      family: { connect: { id: +familyId } },
      gender: gender,
      phone: phone,
      birthDate: birthDate,
      deathDate: deathDate,
      father: fatherId ? { connect: { id: fatherId } } : undefined,
      mother: motherId ? { connect: { id: motherId } } : undefined,
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
      family: true,
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
      spouseConnections: true,
      family: true,
    }
  });
};

export const getAncestors = (
  data: FamilyTreeData,
  personId: string
): string | null => {
  let person = personId ? data.people[personId] : null;
  if (!person) return null;
  const familyName = person.family.name;
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

  if (counter >= 0) return fullName + " " + familyName;

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
  firstName?: string;
  familyId?: number;
  gender?: 'MALE' | 'FEMALE';
  phone?: string;
  fatherId?: number;
  motherId?: number;
  birthDate?: string;
  deathDate?: string;
}) => {
  const { firstName, familyId, gender, phone, birthDate, deathDate, fatherId, motherId } = data;
  return prisma.person.update({
    where: { id },
    data: {
      firstName,
      family: familyId ? { connect: { id: familyId } } : undefined,
      gender,
      phone,
      birthDate: birthDate && isValidDateString(birthDate) ? new Date(birthDate) : null,
      deathDate: deathDate && isValidDateString(deathDate) ? new Date(deathDate) : null,
      father: fatherId ? { connect: { id: fatherId } } : undefined,
      mother: motherId ? { connect: { id: motherId } } : undefined,
    },
  });
};

export const deletePerson = async (id: number) => {
  return prisma.person.delete({
    where: { id },
  });
};