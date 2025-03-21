import { saveReport_Controller } from "@/controllers/reports .controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const requestData = await request.json();
        const response = await saveReport_Controller(requestData);

        if (response.error) {
            return new Response(JSON.stringify({ message: response.message }), { status: response.status })
        };

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};