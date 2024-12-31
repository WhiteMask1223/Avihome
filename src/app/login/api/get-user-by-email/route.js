import { getUserByEmail_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request) {
    await dbConnect();

    try {
        const requestData = await request.json();

        const user = await getUserByEmail_Controller(requestData);
        
        return Response.json(user);
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 });
    };
};