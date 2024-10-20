import { getSession_Controller } from "@/controllers/auth.controller"

export async function GET() {
    try {
        const userSession = await getSession_Controller();
        
        return Response.json(userSession)
    } catch (error) {
        console.log(error)
    }
}