import { getOffertsCommentById_Controller } from "@/controllers/comment.controller";
import dbConnect from "@/lib/db";

export async function POST(request) {
    await dbConnect();

    try {
        const { _id } = await request.json();
        const response = await getOffertsCommentById_Controller(_id);

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};