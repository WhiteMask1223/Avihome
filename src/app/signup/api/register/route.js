import { registerUser_Controller } from "@/controllers/user.controller";

export async function POST(request) {
    try {
        const requestData = await request.json();
        const response = await registerUser_Controller(requestData);

        return Response.json(response);
    } catch (error) {
        console.log(error);
    };
};