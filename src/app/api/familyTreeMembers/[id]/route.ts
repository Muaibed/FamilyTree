import { getFamilyById } from '@/lib/family';
import { getAllPersons, getAllPersonsWithSameOwner } from '@/lib/person';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params } : { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
        return new Response("Family ID is required", { status: 400 });
    }
    const family = await getFamilyById(id)

    if (!family) 
      return NextResponse.json("Family Not Found", { status: 404 });

    const ownerId = family.ownerId;
    if (!ownerId) 
      return NextResponse.json("Owner Not Found", { status: 404 });

    const members = await getAllPersonsWithSameOwner(ownerId)
   
      return NextResponse.json(members);
    } catch (err) {
      return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
    }
}