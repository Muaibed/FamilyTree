import { deletePerson, getPersonById } from '@/lib/person';
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

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
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