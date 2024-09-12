"use client"

import { useContext } from "react"

import { SidebarsContext } from "@/contexts/Sidebars.context"

export default function NavSessionSidebar() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(SidebarsContext)

    return (
        <div>
            <div
            className={`fixed top-14 right-0 h-full w-64 bg-gray-800 text-white p-6 transform ${
            sessionSidebar ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-40`}>
            <h2 className="text-2xl font-semibold mb-4">Menú</h2>
            <ul className="space-y-4">
            <li>
                <button className="w-full text-left px-4 py-2 bg-teal-500 rounded hover:bg-teal-600">
                Iniciar Sesión
                </button>
            </li>
            <li>
                <button className="w-full text-left px-4 py-2 bg-teal-500 rounded hover:bg-teal-600">
                Registrarse
                </button>
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