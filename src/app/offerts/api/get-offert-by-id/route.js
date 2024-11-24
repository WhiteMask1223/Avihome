import { getOffertById_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const { id } = await request.json();
        console.log(id)
        const response = await getOffertById_Controller(id);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};