"use client"

import { useContext } from "react"

import Link from "next/link";

import { UtilityContex } from "@/contexts/Utility.context"

export default function NavSessionSidebar() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex)

    return (
        <div>
            <div
            className={`fixed right-0 h-full w-full sm:w-64 bg-sectionThemeBackground p-6 transform ${
            sessionSidebar ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-40`}>
                <h2 className="text-2xl font-semibold mb-4">Menú de Sesión</h2>
                <ul>
                    <li className="w-full items-center py-2 border border-transparent border-b-sectionThemeShadow">
                        <Link href="/login" className="py-2">
                            Iniciar Sesión
                        </Link>
                    </li>
                    <li className="w-full items-center py-2 border border-transparent border-b-sectionThemeShadow">
                        <Link href="/signin" className="py-2">
                            Registrarse
                        </Link>  
                    </li>
                </ul>
            </div>

        {/* Fondo oscuro cuando el panel está abierto */}
        {sessionSidebar && (
            <div
                className="fixed inset-0 bg-black opacity-50 z-30"
                onClick={toggleSessionSidebar}></div>)}
        </div>
    )
}