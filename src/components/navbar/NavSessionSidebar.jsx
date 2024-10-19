"use client"

import { useContext } from "react"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { UtilityContex } from "@/contexts/Utility.context"
import { UserContext } from "@/contexts/User.context";

import { NAVBAR_STYLES } from "./navBarStyles";

export default function NavSessionSidebar() {

    const { data: session, status } = useSession();

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex);
    const { initialSession } = useContext(UserContext)

    return (
        <menu>
            <div
            className={NAVBAR_STYLES.SIDEBAR(sessionSidebar)}>
                <h1 className="text-2xl font-semibold mb-4">Menú de Sesión {status}</h1>
                <ul>
                    <li className={NAVBAR_STYLES.SIDEBAR_LI}>
                        <Link href="/login" className="text-lg sm:text-base" onClick={toggleSessionSidebar}>
                            Iniciar Sesión
                        </Link>
                    </li>
                    <li className={NAVBAR_STYLES.SIDEBAR_LI}>
                        <Link href="/signup" className="text-lg sm:text-base" onClick={toggleSessionSidebar}>
                            Registrarse
                        </Link>  
                    </li>
                    <li  className={NAVBAR_STYLES.SIDEBAR_LI}>
                        <button className="text-lg sm:text-base" onClick={() => signOut()}>Logout</button>
                    </li>
                    <li  className={NAVBAR_STYLES.SIDEBAR_LI}>
                        <button className="text-lg sm:text-base" onClick={() => {
                            console.log(initialSession)
                        }}>cumsollog</button>
                    </li>
                </ul>
            </div>
        </menu>
    )
}