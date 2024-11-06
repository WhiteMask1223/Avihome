'use client'

import { useState, useContext } from "react";

import VariableInput from "@/components/UI/formElements/VariableInput";
import SelectOption from "@/components/UI/formElements/SelectOption";
import Asterisk from "@/components/UI/formElements/Asterisk";

export default function OffertsForm() {

    const offertsFormDataTemplate = {
        title: '',
        type: '',

        location: '',
        address: '',

        services: {
            'Agua': false,
            'Aire Acondicionado': false,
            'Electricidad': false,
            'Gas': false,
            'Internet': false
        },

        availability: '',

        admits: {
            'Solo Hombres': false,
            'Solo Mujeres': false,
            'Cualquiera': false
        }

    }

    const [offertsFormData, setOffertsFormData] = useState()

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 m-auto">

                <div>
                    <label htmlFor="repPassword" className="flex">
                        Nombre de la Oferta <Asterisk />
                    </label>
                    <VariableInput
                        type={'text'}
                        id={"offertName"}
                        value={1}
                        setStateFunction={setOffertsFormData}
                        required
                        autoComplete={"off"}
                        error={false}
                    />
                </div>

                <div>
                    <label htmlFor="repPassword" className="flex">
                        Localidad y Dirección <Asterisk />
                    </label>
                    <div className="flex justify-between">
                        <select>
                            <option value="bestRated">Mejor Puntuados</option>
                            <option value="worstRated">Peor Puntuados</option>
                            <option value="higherAvailability">Mayor Disponibilidad</option>
                            <option value="lowerAvailability">Menor Disponibilidad</option>
                            <option value="latest">Más Recientes</option>
                            <option value="older">Más Antiguos</option>
                        </select>
                        <VariableInput
                            type={'text'}
                            id={"offertName"}
                            value={1}
                            setStateFunction={setOffertsFormData}
                            required
                            autoComplete={"off"}
                            error={false}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}