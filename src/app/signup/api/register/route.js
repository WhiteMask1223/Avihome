import { registerUser_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request) {
    await dbConnect();

    try {
        const requestData = await request.json();
        const response = await registerUser_Controller(requestData);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};