// src/app/api/person/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createPerson, getAllPersons } from '@/lib/person';

export async function POST(req: NextRequest) {
  try {
    const { firstName, familyName, gender, birthDate, fatherId, motherId } = await req.json();

    const newPerson = await createPerson({
      firstName,
      familyName,
      gender,
      ...(birthDate ? { birthDate: new Date(birthDate) } : {}),
      ...(fatherId ? { fatherId: Number(fatherId) } : {}),
      ...(motherId ? { motherId: Number(motherId) } : {})
    });

    return NextResponse.json(newPerson, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const persons = await getAllPersons();
    return NextResponse.json(persons);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}