import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { updateFullNames } from "@/lib/updateFullName";

export async function POST(req: NextRequest) {
    try {
        // console.log('PROCESS TASK')
        const isPermitted = await isAdmin()
        
        if (!isPermitted) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        
        const task = await redis.lpop("task-queue");
        
        if (!task) {
            return new Response("No Task Found!", { status: 400});
        }
        
        const jsonTask = JSON.parse(task)
        updateFullNames(jsonTask.personId)
        console.log('Processing ...')

        return NextResponse.json("Task is processed successfully", { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to process task", { status: 500 });
    }
}
