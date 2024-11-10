import { saveOffert_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const requestData = await request.json();
        const response = await saveOffert_Controller(requestData);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'status 500: Error Interno' }), { status: 500 })
    };
};