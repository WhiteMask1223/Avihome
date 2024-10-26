import { getUserByEmail_Controller } from "@/controllers/user.controller";

export async function POST(request) {
    try {
        const requestData = await request.json();
        console.log(requestData)
        const user = await getUserByEmail_Controller(requestData);
        
        return Response.json(user);
    } catch (error) {
        console.log(error);
    };
};