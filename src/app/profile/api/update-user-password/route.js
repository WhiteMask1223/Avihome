import { updateUserPassword_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export async function PUT(request) {
    await dbConnect();

    try {
        const { id, data } = await request.json();
        const response = await updateUserPassword_Controller(id, data);

        if (response.status === 404) {
            return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 404 })
        };

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};