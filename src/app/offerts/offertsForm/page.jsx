'use client'

import { useState, useContext } from "react";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";

import VariableInput from "@/components/UI/formElements/VariableInput";
import SelectOption from "@/components/UI/formElements/SelectOption";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Asterisk from "@/components/UI/formElements/Asterisk";

export default function OffertsForm() {


    /**************************{ Declaraciones }**************************/

    const { offertsType, offertsLocation } = useContext(CategoryFilterContext);

    const offertsFormDataTemplate = {
        title: '',
        type: '',

        location: '',
        address: '',

        description: '',

        services: {
            'Agua': false,
            'Aire Acondicionado': false,
            'Electricidad': false,
            'Gas': false,
            'Internet': false
        },

        otherServices: '',

        availability: '',

        admits: {
            'Solo Hombres': false,
            'Solo Mujeres': false,
            'Cualquiera': false
        }
    };

    const [offertsFormData, setOffertsFormData] = useState(offertsFormDataTemplate);


    /**************************{ Funciones }**************************/

    const updateField = (field, newValue) => {
        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            [field]: newValue
        }));
    };

    const updateSubObj = (objKey, field, newValue) => {
        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            [objKey]: {
                ...prevFormData[objKey],
                [field]: newValue
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(offertsFormData)
    };

    
    /**************************{ Return }**************************/

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 m-auto">

                <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Oferta</h1>

                <form onSubmit={handleSubmit}>

                    {/**************************{ Nombre de la oferta }**************************/}

                    <div>
                        <label htmlFor="repPassword" className="flex">
                            Nombre de la Oferta <Asterisk />
                        </label>
                        <VariableInput
                            type={'text'}
                            id={'title'}
                            value={offertsFormData.title}
                            setStateFunction={updateField}
                            required
                            autoComplete={"off"}
                            error={false}
                        />
                    </div>


                    {/**************************{ Tipo }**************************/}

                    <div>
                        <label htmlFor="repPassword" className="flex">
                            Tipo de Residencia <Asterisk />
                        </label>

                        <select value={offertsFormData.type} onChange={(e) => updateField('type', e.target.value)}>

                            {Object.entries(offertsType).map(([key]) => (
                                <SelectOption key={key} value={key} text={key} />
                            ))}

                        </select>
                    </div>


                    {/**************************{ Direcciones }**************************/}

                    <div>
                        <label htmlFor="repPassword" className="flex">
                            Localidad y Dirección <Asterisk />
                        </label>
                        <div className="sm:flex justify-between">

                            <select value={offertsFormData.location} onChange={(e) => updateField('location', e.target.value)}>

                                {Object.entries(offertsLocation).map(([key]) => (
                                    <SelectOption key={key} value={key} text={key} />
                                ))}

                            </select>

                            <VariableInput
                                type={'text'}
                                id={'address'}
                                value={offertsFormData.address}
                                setStateFunction={updateField}
                                required
                                autoComplete={"off"}
                                error={false}
                            />

                        </div>

                        <div className="mt-6">
                            <SubmitButton text={'Crear Oferta'}/>
                        </div>
                    </div>
                </form>

            </div>
        </section>
    )
}