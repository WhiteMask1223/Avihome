"use client"

import { useState, useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

export default function StadictisSection() {

    const { offertsData } = useContext(MainPageContext);

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground sm:px-6 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:w-11/12 m-auto mb-8 py-5" >

                <h1 className="w-fit p-2 text-2xl font-bold mb-5">Estadisticas del Sistema:</h1>

                <div className="h-fit flex items-center">
                    <h2 className="w-fit text-lg font-bold">Ofertas Registradas: </h2>
                    <p>{offertsData.length}</p>
                </div>
            </div >
        </section>
    )
}