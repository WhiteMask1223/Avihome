import { getTotalUsers_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const usersTotal = await getTotalUsers_Controller();
        
        return Response.json(usersTotal);
    } catch (error) {
        console.log(error);

        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};