import { getLogEntries_Service } from "@/services/log.service";
import dbConnect from "@/lib/db";

export async function GET() {
    await dbConnect();

    try {
        const data = await getLogEntries_Service();
        
        return Response.json(data);
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};