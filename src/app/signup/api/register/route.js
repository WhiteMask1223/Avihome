import { registerUser_Controller } from "@/controllers/auth.controller";

export async function POST(request) {
    const requestData = await request.json();
    const response = await registerUser_Controller(requestData);

    console.log(response);
    
    return Response.json({message: 'hola'});
}