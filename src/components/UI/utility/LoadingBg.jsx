"use client"

import { useContext } from "react"

import { UtilityContex } from "@/contexts/Utility.context"

import AppLogo from "./AppLogo"
import LoadingSpinners from "./LoadingSpinners"

export default function LoadingBg({ conditional }) {

    const { loading } = useContext(UtilityContex)

    return (
        <div>
            {conditional ?
                <div
                    className="fixed flex flex-col items-center justify-center inset-0 bg-sectionThemeBackground text-center z-50 cursor-wait">

                    <div className="m-5 animate-bounce">
                        <AppLogo width={"60"} height={"60"} fixedTheme={false} />
                    </div>

                    <LoadingSpinners size={"large"} />

                </div>
                :
                loading && (
                    <div
                        className="fixed flex flex-col items-center justify-center inset-0 bg-sectionThemeBackground text-center z-50 cursor-wait">

                        <div className="m-5 animate-bounce">
                            <AppLogo width={"60"} height={"60"} fixedTheme={false} />
                        </div>

                        <LoadingSpinners size={"large"} />

                    </div>
                )
            }
        </div>
    )
}