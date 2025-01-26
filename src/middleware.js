import { NextResponse } from "next/server";

export async function middleware(request) {

    //console.log("cookies: ", request.cookies)

    const isProduction = process.env.NODE_ENV === "production";

    const cookieName = isProduction ? "__Secure-authjs.session-token" : "authjs.session-token";

    const sessionToken = request.cookies.get(cookieName);

    //console.log(sessionToken)

    if (!sessionToken) {    
        // Redirige a /login si no está autenticado
        console.log("Redirigido")
        if (!isProduction) return NextResponse.redirect(new URL("/login", request.url));
    }
    // Permite el acceso si el usuario está autenticado
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/profile/:path*", 
        "/offerts/offertsForm",
        "/offerts/edit",
        "/offerts/api/delete-offert",
        "/offerts/api/save-offert",
        "/offerts/api/update-offert",
        "/admin/dashboard/:path*", 
    ],
};