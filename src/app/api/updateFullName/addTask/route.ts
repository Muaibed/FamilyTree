import { redis } from "@/lib/redis";
import { isAdmin } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // console.log('ADD TASK')
        const isPermitted = await isAdmin()

        if (!isPermitted) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        
        let { task } = await req.json();

        if (!task) {
            return new Response("Task is required", { status: 400});
        }

        await redis.rpush("task-queue", JSON.stringify(task));

        return NextResponse.json("Task is added successfully", { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to add task", { status: 500 });
    }
}
