import { deletePerson, getPersonById, updatePerson } from '@/lib/person';
import { isAdmin } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Person ID is required", { status: 400 });
    }

    const person = await getPersonById(+id);

    return NextResponse.json(person);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isPermitted = await isAdmin()

    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    const id = Number(params.id);

    const { firstName, familyName, gender, fatherId, motherId, birthDate, deathDate } = await req.json();

    const data = {
      firstName,
      familyName,
      gender,
      birthDate,
      deathDate,
      ...(fatherId ? { fatherId: Number(fatherId) } : {}),
      ...(motherId ? { motherId: Number(motherId) } : {}),
    }

    if (!id) {
      return new Response("Person ID is required", { status: 400});
    }

    await updatePerson(+id, data);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update person", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const isPermitted = await isAdmin()

      if (!isPermitted) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    
      const id = Number(params.id);

      if (!id) {
        return new Response("Person ID is required", { status: 400 });
      }
  
      await deletePerson(+id);
  
      return new Response("Person deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete person", { status: 500 });
    }
  }