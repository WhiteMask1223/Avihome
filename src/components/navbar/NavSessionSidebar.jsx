"use client"

import { useContext } from "react"

import Link from "next/link";

import { UtilityContex } from "@/contexts/Utility.context"

export default function NavSessionSidebar() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex)

    return (
        <div>
            <div
            className={`fixed right-0 h-full w-screen sm:w-64 bg-sectionThemeBackground p-6 transform ${
            sessionSidebar ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-40`}>
                <h2 className="text-2xl font-semibold mb-4">Menú de Sesión</h2>
                <ul>
                    <li className="w-full items-center py-2 border border-transparent border-b-sectionThemeShadow">
                        <Link href="/login" className="py-2" onClick={toggleSessionSidebar}>
                            Iniciar Sesión
                        </Link>
                    </li>
                    <li className="w-full items-center py-2 border border-transparent border-b-sectionThemeShadow">
                        <Link href="/signin" className="py-2" onClick={toggleSessionSidebar}>
                            Registrarse
                        </Link>  
                    </li>
                </ul>
            </div>
        </div>
    )
}