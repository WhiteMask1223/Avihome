"use client"

import { useContext } from "react"

import { UtilityContex } from "@/contexts/Utility.context"

import LoadingSpinners from "./LoadingSpinners"

export default function LoadingBg({ conditional }) {

    const { loading } = useContext(UtilityContex)

    return (
        <div>
            {conditional ?
                <div
                    className="fixed flex items-center justify-center inset-0 bg-sectionThemeBackground text-center z-50">
                    <LoadingSpinners size={"large"} />
                </div>
                :
                loading && (
                    <div
                        className="fixed flex items-center justify-center inset-0 bg-sectionThemeBackground text-center z-50">
                        <LoadingSpinners size={"large"} />
                    </div>
                )   
        }
        </div>
    )
}