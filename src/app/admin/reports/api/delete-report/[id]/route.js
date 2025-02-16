import { deleteReportById_Controller } from "@/controllers/reports .controller";
import dbConnect from "@/lib/db";

export async function DELETE(request) {
    await dbConnect();

    try {
        const { pathname } = new URL(request.url);
        const parts = pathname.split("/");

        const id = parts[parts.length -1];

        if (!id) {
            return new Response(JSON.stringify({ message: "ID es requerido" }), { status: 400 });
        }
        
        const response = await deleteReportById_Controller( id );

        return Response.json(response);
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ message: 'Error Interno' }), { status: 500 })
    };
};