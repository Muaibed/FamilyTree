import { deletePerson, getPersonById, updatePerson } from '@/lib/person';
import { prisma } from '@/lib/prisma';
import { FamilyTreeData } from '@/types/family';
import { CodeSquare } from 'lucide-react';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Root Person ID is required", { status: 400 });
    }
       const people = await prisma.person.findMany({
         include: {
           father: true,
           mother: true,
           fatherChildren: true,
           motherChildren: true,
           spouseConnections: true,
           spousedByConnections: true,
           family: true,
         },
       });
   
       const familyTreeData: FamilyTreeData = { people: {}, rootPersonId: "" }
   
       people.forEach((person) => {
         let children;
         if (person.gender == 'MALE') 
           children  = person.fatherChildren;
         else if (person.gender == 'FEMALE')
           children = person.motherChildren;
   
         let spouses: [string, boolean][] = person.spouseConnections.map(connection => [`${connection.spouseId}`, connection.isActive])
         person.spousedByConnections.map(connection => spouses.push([`${connection.personId}`, connection.isActive]))
   
        console.log(person.firstName)
         familyTreeData.people[`${person.id}`] = {
           id: `${person.id}`,
           name: person.firstName,
           gender: person.gender,
           phone: `${person.phone}`,
           birthDate: `${person.birthDate?.toISOString().split('T')[0]}`,
           deathDate: `${person.deathDate?.toISOString().split('T')[0]}`,
           fatherId: `${person.fatherId}`,
           motherId: `${person.motherId}`,
           family: person.family,
           spouses,
           childrenIds: children ? children.map(child => `${child.id}`) : []
         };
       });
   
       return NextResponse.json(familyTreeData);
     } catch (err) {
       return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
     }
}