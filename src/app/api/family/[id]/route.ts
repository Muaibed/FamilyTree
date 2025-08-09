import { deleteFamily, getFamilyById, updateFamily } from '@/lib/family';
import { isAdmin } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Family ID is required", { status: 400 });
    }

    const family = await getFamilyById(id);

    return NextResponse.json(family);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isPermitted = await isAdmin();
    const { id } = await params;

    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    const { name, rootPersonId, isDisplayed } = await req.json();

    const data = {
      name,
      rootPersonId,
      isDisplayed
    }

    if (!id) {
      return new Response("Family ID is required", { status: 400});
    }

    await updateFamily(id, data);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to update family" + error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {

      const isPermitted = await isAdmin();
      const { id } = await params;

      if (!isPermitted) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
      
      if (!id) {
        return new Response("Family ID is required", { status: 400 });
      }
  
      await deleteFamily(id);
  
      return new Response("Family deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete family", { status: 500 });
    }
  }
