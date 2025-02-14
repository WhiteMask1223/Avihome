import { getOffertById_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request) {
    await dbConnect();

    try {
        const { id } = await request.json();
        const response = await getOffertById_Controller(id);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};