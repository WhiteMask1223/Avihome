import { getUserById_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const { id } = await request.json();

        const user = await getUserById_Controller(id);
        
        return Response.json(user);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 });
    };
};