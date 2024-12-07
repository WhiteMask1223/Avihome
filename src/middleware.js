import { NextResponse } from "next/server";

export async function middleware(request) {
    const sessionToken = request.cookies.get("authjs.session-token");

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