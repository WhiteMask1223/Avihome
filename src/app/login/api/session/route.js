import { getSession_Controller } from "@/controllers/auth.controller"
import dbConnect from "@/lib/db";

export async function GET() {
    await dbConnect();

    try {
        const userSession = await getSession_Controller();

        if (!userSession) {
            return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 });
        };

        return Response.json(userSession);
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 });
    };
};