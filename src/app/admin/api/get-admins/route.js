import { getAdmins_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const admins = await getAdmins_Controller();
        
        return Response.json(admins);
    } catch (error) {
        console.log(error);

        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};