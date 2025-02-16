import { getReports_Controller } from "@/controllers/reports .controller";
import dbConnect from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const data = await getReports_Controller();
        
        return Response.json(data);
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};