import { getMainPageOfferts_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const offerts = await getMainPageOfferts_Controller();
        return Response.json(offerts);
    } catch (error) {
        console.log(error);

        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};