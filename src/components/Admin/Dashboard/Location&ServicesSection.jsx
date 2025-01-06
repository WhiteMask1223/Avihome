"use client"

import { useState, useEffect } from "react";

import { get_OffertsLocationAndType } from "@/api/offerts.api";

import LoadingBg from "@/components/UI/utility/LoadingBg";
import CreateLocationModal from "./CreateLocationModal";
import DangerButton from "@/components/UI/utility/DangerButton";


export default function LocationServicesSection() {

    const [locations, setLocation] = useState();
    const [createLocationModal, setCreateLocationModal] = useState(false);

    useEffect(() => {
        if (!locations) {
            getLocationsAndType()
        };
    }, []);

    const getLocationsAndType = async () => {
        try {
            const fetchedLocationsAndType = await get_OffertsLocationAndType();

            setLocation(fetchedLocationsAndType.sortedLocationData);
            console.log(fetchedLocationsAndType);
        } catch (error) {
            console.error("getLocationsAndType error: ", error);
        };
    }

    if (!locations) return (
        <LoadingBg conditional={false} />
    )

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 m-auto mb-8 flex justify-between" >
                <div>
                    <h1 className="text-xl font-bold mb-4">Localidades: </h1>

                    <button
                        type="button"
                        className="bg-submitButtonColor hover:bg-submitButtonHoverColor text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out  focus:outline-none"
                        onClick={() => setCreateLocationModal(!createLocationModal)}
                    >
                        Agregar Localidad
                    </button>

                    <table>
                        <tr>
                            <th>Texto:</th>
                            <th>Aciones:</th>
                        </tr>

                        {Object.entries(locations).map((location, idx) => (
                            <tr key={idx}>
                                <th>{location}</th>
                                <th>
                                    <button type="button">Editar</button>
                                    <button type="button">eliminar</button>
                                </th>
                            </tr>
                        ))}

                    </table>

                    <CreateLocationModal trigger={createLocationModal} setTrigger={setCreateLocationModal} />
                </div>
                <div>
                    <h1 className="text-xl font-bold mb-4">Tipos de Ofertas:</h1>


                </div>
            </div >
        </section>
    )
}