import { getOffertsLocationAndType_Controller } from "@/controllers/locationsAndType.controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const data = await getOffertsLocationAndType_Controller();
        
        return Response.json(data);
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};