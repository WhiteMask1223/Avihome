import { getOffertsByUserId_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const userId = await request.json();
        const response = await getOffertsByUserId_Controller(userId);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'status 500: Error Interno' }), { status: 500 })
    };
};