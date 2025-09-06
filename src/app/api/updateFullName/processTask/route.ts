// import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { updateFullNames } from "@/lib/updateFullName";

// export async function POST(req: Request) {
//     try {
//         // console.log('PROCESS TASK')
//         const isPermitted = await isAdmin()
        
//         if (!isPermitted) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//         }
        
//         const task = await redis.lpop("task-queue");
        
//         if (!task) {
//             return new Response("No Task Found!", { status: 400});
//         }
        
//         const jsonTask = JSON.parse(task)
//         await updateFullNames(jsonTask.personId)
//         console.log('Processing ...')

//         return NextResponse.json("Task is processed successfully", { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to process task", { status: 500 });
//     }
// }


export async function POST(req: Request) {
    try {
        const isPermitted = await isAdmin()
              
        if (!isPermitted) {
          return new Response("Unauthorized!", { status: 403 });
        }
      
        const task = await req.json(); 
      
        if (!task) {
          return new Response("No Task Found!", { status: 400});
        }
          
        const jsonTask = JSON.parse(task)
        await updateFullNames(jsonTask.personId)
      
        console.log('processing...')

        return NextResponse.json("Task is processed successfully", { status: 201 });
    } catch (err) {
        return new Response("Failed to process task", { status: 500 });
    }

}
