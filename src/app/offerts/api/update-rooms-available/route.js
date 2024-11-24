import { changeRoomsAvailable_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function PUT(request) {
    await dbConnect();

    try {
        const { id, newAvailabilityValue } = await request.json();
        const response = await changeRoomsAvailable_Controller( id, newAvailabilityValue );

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};