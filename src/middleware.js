import { NextResponse } from "next/server";

export async function middleware(request) {

    const isProduction = process.env.NODE_ENV === "production";

    console.log(process.env.NODE_ENV)

    const cookieName = isProduction ? "__Secure-authjs.session-token:" : "authjs.session-token";

    console.log(cookieName)


    const sessionToken = request.cookies.get(cookieName);

    console.log(sessionToken)

    if (!sessionToken) {    
        // Redirige a /login si no está autenticado
        console.log("Redirigido")
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // Permite el acceso si el usuario está autenticado
    return NextResponse.next();
};

export const config = {
    matcher: ["/profile/:path*", "/offerts/offertsForm"],
};