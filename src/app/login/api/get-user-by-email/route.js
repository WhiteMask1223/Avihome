import { getUserByEmail_Controller } from "@/controllers/user.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const requestData = await request.json();
        console.log("get User", requestData)
        const user = await getUserByEmail_Controller(requestData);
        
        return Response.json(user);
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: true, message: 'status 500: Error Interno'});
    };
};