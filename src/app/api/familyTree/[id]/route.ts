import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/session';
import { getFamilyTreeById, updateFamilyTree, deleteFamilyTree } from '@/lib/db/familyTree';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tree = await getFamilyTreeById(id);
    if (!tree) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(tree);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const body = await request.json();
    const tree = await updateFamilyTree(id, body);
    return NextResponse.json(tree);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    await deleteFamilyTree(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
