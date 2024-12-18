import { NextResponse } from "next/server";

export async function middleware(request) {

    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = isProduction ? "__Secure-authjs.session-token:" : "authjs.session-token";


    const sessionToken = request.cookies.get(cookieName);

    if (!sessionToken) {    
        // Redirige a /login si no está autenticado
        return NextResponse.redirect(new URL("/", request.url));
    }
    // Permite el acceso si el usuario está autenticado
    return NextResponse.next();
};

export const config = {
    matcher: ["/profile/:path*", "/offerts/offertsForm"],
};