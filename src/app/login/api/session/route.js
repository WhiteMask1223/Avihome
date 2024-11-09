import { getSession_Controller } from "@/controllers/auth.controller"
import dbConnect from "@/lib/db";

export async function GET() {
    await dbConnect();

    try {
        const userSession = await getSession_Controller();
        
        return Response.json(userSession);
    } catch (error) {
        console.log(error);

        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};