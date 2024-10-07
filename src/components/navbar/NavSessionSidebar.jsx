"use client"

import { useContext } from "react"
import Link from "next/link";

import { UtilityContex } from "@/contexts/Utility.context"

import { NAVBAR_STYLES } from "./navBarStyles";

export default function NavSessionSidebar() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex)

    return (
        <menu>
            <div
            className={NAVBAR_STYLES.SIDEBAR(sessionSidebar)}>
                <h2 className="text-2xl font-semibold mb-4">Menú de Sesión</h2>
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
                </ul>
            </div>
        </menu>
    )
}