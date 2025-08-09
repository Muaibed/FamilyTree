import { isAdmin } from '@/lib/session';
import { deleteUser, getUserById, updateUser } from '@/lib/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const isPermitted = await isAdmin();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!id) {
        return new Response("User ID is required", { status: 400 });
    }

    const user = await getUserById(id);

    return NextResponse.json(user);
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

    const { email, phone, name } = await req.json();

    const data = {
      email,
      phone,
      name,
    }

    if (!id) {
      return NextResponse.json("User ID is required", { status: 400});
    }

    await updateUser(id, data);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to update user", { status: 500 });
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
        return new Response("User ID is required", { status: 400 });
      }
  
      await deleteUser(id);
  
      return new Response("Person deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete person", { status: 500 });
    }
  }