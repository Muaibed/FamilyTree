import { getAllPersons } from '@/lib/person';
import { prisma } from '@/lib/prisma';
import { FamilyTreeData } from '@/types/family';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Root Person ID is required", { status: 400 });
    }
       const members = await getAllPersons()
   
       return NextResponse.json(members);
     } catch (err) {
       return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
     }
}