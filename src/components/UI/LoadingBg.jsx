"use client"

import { useContext } from "react"

import { UtilityContex } from "@/contexts/Utility.context"

export default function LoadingBg () {

    const { loading } = useContext(UtilityContex)

    return (
        <div>
            { loading && (
                <div
                className="fixed flex items-center justify-center inset-0 bg-sectionThemeBackground text-center z-50">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
}