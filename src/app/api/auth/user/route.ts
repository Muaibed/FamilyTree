import { getAdminNumber } from '@/lib/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const phone = await getAdminNumber();

    return NextResponse.json(phone);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}