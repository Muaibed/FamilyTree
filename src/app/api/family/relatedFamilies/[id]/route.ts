import { getAllFamiliesFromOwnerId, getAllFamiliesWithSameOwner, getFamilyById } from '@/lib/db/family';
import { FamilyWithRootPerson } from '@/types/family';
import { NextResponse } from 'next/server';


export async function GET(req:Request, { params } : { params: Promise<{ id: string }> }) {
  try { 
    const { id } = await params;
    let families:FamilyWithRootPerson[];

    if (!id) {
        return new Response("Family ID is required", { status: 400 });
    }
    const family = await getFamilyById(id)
    
    if (!family) 
      return NextResponse.json("Family Not Found", { status: 404 });

    const ownerId = family.ownerId;
    if (!ownerId) 
      return NextResponse.json("Owner Not Found", { status: 404 });

    families = await getAllFamiliesFromOwnerId(ownerId)

    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}