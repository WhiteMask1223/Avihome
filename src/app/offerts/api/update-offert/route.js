import { updateOffert_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function PUT(request) {
    await dbConnect();

    try {
        const { id, newOffert } = await request.json();
        const response = await updateOffert_Controller( id, newOffert );

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};