"use client"

import { useState, useEffect } from "react";

import { get_OffertsLocationAndType } from "@/api/locationsAndTypes.api";

import LoadingBg from "@/components/UI/utility/LoadingBg";

import Tables from "./Tables";

export default function LocationAndTypesSection() {

    const [locations, setLocation] = useState();
    const [createLocationModal, setCreateLocationModal] = useState(false);

    const [types, setTypes] = useState();
    const [createTypesModal, setCreateTypesModal] = useState(false);

    useEffect(() => {
        if (!locations || !types) {
            getLocationsAndType();
        };
    });

    const getLocationsAndType = async () => {
        try {
            const fetchedLocationsAndType = await get_OffertsLocationAndType();

            setLocation(fetchedLocationsAndType.locations);
            setTypes(fetchedLocationsAndType.types);
        } catch (error) {
            console.error("getLocationsAndType error: ", error.message);
        };
    }

    if (!locations || !types) return (
        <LoadingBg conditional={false} />
    )

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 m-auto mb-8" >

                <h1 className="w-fit p-2 text-2xl font-bold mb-5">Editar Localidades y Tipos de Ofertas</h1>

                <div className="flex justify-evenly">
                    <Tables
                        tittle={"Localidades:"}
                        TableData={locations}

                        createModalTrigger={createLocationModal}
                        setCreateModalTrigger={setCreateLocationModal}
                        addButtonText={"Agregar Localidad"}

                        getLocationsAndType={getLocationsAndType}
                    />

                    <Tables
                        tittle={"Tipos de Ofertas:"}
                        TableData={types}

                        createModalTrigger={createTypesModal}
                        setCreateModalTrigger={setCreateTypesModal}
                        addButtonText={"Agregar Tipo de Oferta"}

                        isType={true}

                        getLocationsAndType={getLocationsAndType}
                    />
                </div>
            </div >
        </section>
    )
}