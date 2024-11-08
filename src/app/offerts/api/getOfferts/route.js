import { getMainPageOfferts_Controller } from "@/controllers/offerts.controller";
import dbConnect from "@/lib/db";

export async function GET() {
    await dbConnect();

    try {
        const offerts = await getMainPageOfferts_Controller()
        
        return Response.json(offerts);
    } catch (error) {
        console.log(error);
    };
};