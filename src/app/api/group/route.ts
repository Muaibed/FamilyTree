import { NextResponse } from 'next/server';
import { getUserId, isPro } from '@/lib/session';
import { createGroup, getGroupsForUser } from '@/lib/db/group';
import { canDoGroupPermission } from '@/lib/permissions';
import { GroupPermission } from '@/generated/prisma';

export async function GET(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const permission = searchParams.get('permission') as GroupPermission | null;

    const groups = await getGroupsForUser(userId);

    if (permission) {
      const results = await Promise.all(
        groups.map(async (g) => {
          const allowed = await canDoGroupPermission(userId, g.id, permission);
          return allowed ? g : null;
        })
      );
      return NextResponse.json(results.filter(Boolean));
    }

    return NextResponse.json(groups);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const pro = await isPro();
    if (!pro) return NextResponse.json({ error: 'PRO subscription required to create groups.' }, { status: 403 });

    const { name, description } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const group = await createGroup({ name, description, creatorId: userId });
    return NextResponse.json(group, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}