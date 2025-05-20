import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FamilyTreeData } from '@/types/family';

export async function GET() {
  try {
    const people = await prisma.person.findMany({
      include: {
        father: true,
        mother: true,
        fatherChildren: true,
        motherChildren: true,
        spouseConnections: true
      },
    });

    const familyTreeData: FamilyTreeData = { people: {}, rootPersonId: '1'}

    people.forEach((person) => {
      let children;
      if (person.gender == 'MALE') 
        children  = person.fatherChildren;
      else if (person.gender == 'FEMALE')
        children = person.motherChildren;

      familyTreeData.people[`${person.id}`] = {
        id: `${person.id}`,
        name: person.firstName,
        gender: person.gender,
        phone: `${person.phone}`,
        birthDate: `${person.birthDate?.toISOString().split('T')[0]}`,
        deathDate: `${person.deathDate?.toISOString().split('T')[0]}`,
        fatherId: `${person.fatherId}`,
        motherId: `${person.motherId}`,
        familyName: person.familyName,
        spouses: person.spouseConnections.map(connection => `${connection.spouseId}`),
        childrenIds: children ? children.map(child => `${child.id}`) : []
      };
    });

    return NextResponse.json(familyTreeData);
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
