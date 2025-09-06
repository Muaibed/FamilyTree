import { updateFullNames } from "@/lib/updateFullName";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs"

export const POST = verifySignatureAppRouter(async (req: Request) => {
    try {
        const body = await req.json()
        const { personId } = body as { personId: string }

        if (!personId) {
            return new Response("Person ID is required", { status: 400 });
        }
          
        await updateFullNames(personId)
      
        return new Response(`Task is processed successfully.`)
    } catch (err) {
        return new Response("Failed to process task", { status: 500 });
    }
})
