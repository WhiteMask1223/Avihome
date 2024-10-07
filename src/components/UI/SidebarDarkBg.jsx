"use client"

import { useContext } from "react"

import { UtilityContex } from "@/contexts/Utility.context"

export default function SidebarDarkBg() {

    const { sessionSidebar, filterSidebar, toggleSessionSidebar, toggleFilterSidebar } = useContext(UtilityContex)

    return (
        <div>
            {(sessionSidebar || filterSidebar) && (
                <div
                className="fixed inset-0 bg-black opacity-50 z-30"
                onClick={sessionSidebar ? toggleSessionSidebar : toggleFilterSidebar}></div>
            )}
        </div>
    )
}