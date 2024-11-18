'use client'

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";
import { UserContext } from "@/contexts/User.context";

import VariableTextArea from "@/components/UI/formElements/VariableTextArea";
import OffertsFormCheckbox from "@/components/offerts/form/OffertsFormCheckbox";
import OffertsFormAdmits from "@/components/offerts/form/OffertsFormAdmits";

import VariableInput from "@/components/UI/formElements/VariableInput";
import SelectOption from "@/components/UI/formElements/SelectOption";
import Asterisk from "@/components/UI/formElements/Asterisk";

import { save_Offert } from "@/api/offerts.api";

export default function OffertsForm() {


    /**************************{ Declaraciones }**************************/

    const { offertsType, offertsLocation } = useContext(CategoryFilterContext);
    const { userData } = useContext(UserContext);

    const router = useRouter();

    const offertsFormDataTemplate = {
        title: '',
        type: 'Anexo',

        location: 'Barrio Bicentenerio',
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
            'Cualquiera': true
        },

        user: null
    };

    const [offertsFormData, setOffertsFormData] = useState(offertsFormDataTemplate);


    /**************************{ Funciones }**************************/

    const updateField = (field, newValue) => {
        if (!offertsFormData.user && userData) {
            setOffertsFormData(prevFormData => ({
                ...prevFormData,
                user: userData._id
            }));
        };

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

    const clearForm = () => {
        setOffertsFormData(offertsFormDataTemplate);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const saveResponse = await save_Offert(offertsFormData);

        if (saveResponse) {
            router.push(`/profile/${userData._id}`);
        }
    };


    /**************************{ Return }**************************/

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-4xl m-auto">

                <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Oferta</h1>

                <form onSubmit={handleSubmit}>

                    {/**************************{ Nombre de la oferta }**************************/}

                    <div className="mt-5">
                        <label htmlFor="tittle" className="flex text-lg font-bold">
                            Nombre de la Oferta: <Asterisk />
                        </label>

                        <VariableTextArea
                            id={'title'}
                            value={offertsFormData.title}
                            setStateFunction={updateField}
                            required
                            error={false}
                            cols={'40'}
                            rows={'2'}
                            placeholder={"Ingrese un nombre descriptivo."}
                        />
                    </div>


                    {/**************************{ Tipo y Disponibilidad }**************************/}

                    <div className="mt-5 sm:flex justify-between">
                        <div>
                            <label htmlFor="repPassword" className="flex text-lg font-bold">
                                Tipo de Residencia: <Asterisk />
                            </label>

                            <select className="h-10 px-2 rounded-md bg-elementThemeColor" value={offertsFormData.type} onChange={(e) => updateField('type', e.target.value)}>

                                {Object.entries(offertsType).map(([key]) => (
                                    <SelectOption key={key} value={key} text={key} />
                                ))}

                            </select>
                        </div>
                        <div>
                            <label htmlFor="tittle" className="flex text-lg font-bold">
                                Número de habitaciones <Asterisk />
                            </label>
                            <VariableInput
                                type={'number'}
                                id={'availability'}
                                value={offertsFormData.availability}
                                setStateFunction={updateField}
                                required
                                autoComplete={"off"}
                                error={false}
                            />

                        </div>
                    </div>


                    {/**************************{ Direcciones }**************************/}

                    <div className="mt-5">
                        <label htmlFor="address" className="flex text-lg font-bold">
                            Localidad y Dirección <Asterisk />
                        </label>
                        <div className="sm:flex justify-between">

                            <select className="h-10 px-2 rounded-md bg-elementThemeColor" value={offertsFormData.location} onChange={(e) => updateField('location', e.target.value)}>

                                {Object.entries(offertsLocation).map(([key]) => (
                                    <SelectOption key={key} value={key} text={key} />
                                ))}

                            </select>

                            <VariableTextArea
                                id={'address'}
                                value={offertsFormData.address}
                                setStateFunction={updateField}
                                required
                                error={false}
                                cols={'40'}
                                rows={'2'}
                                placeholder={"Ingrese una dirección más específica."}
                            />

                        </div>

                        {/**************************{ Servicios }**************************/}

                        <div className="mt-5">
                            <label htmlFor="services" className="flex text-lg font-bold">
                                Servicios <Asterisk />
                            </label>

                            <OffertsFormCheckbox offertsFormData={offertsFormData} handlerFunction={updateSubObj} />

                            <div className="mt-5">
                                <label htmlFor="services" className="flex text-lg font-bold">
                                    Especifique otros Servicios <Asterisk />
                                </label>

                                <VariableTextArea
                                    id={'otherServices'}
                                    value={offertsFormData.otherServices}
                                    setStateFunction={updateField}
                                    required
                                    error={false}
                                    cols={'10'}
                                    rows={'3'}
                                    placeholder={"Ejemplo: Baños individuales, garaje, cocina, lavanderia, entre otros."}
                                />
                            </div>

                        </div>

                        {/**************************{ Descripcion }**************************/}

                        <div className="mt-5">
                            <label htmlFor="services" className="flex text-lg font-bold">
                                Descripción <Asterisk />
                            </label>

                            <VariableTextArea
                                id={'description'}
                                value={offertsFormData.description}
                                setStateFunction={updateField}
                                required
                                error={false}
                                cols={'10'}
                                rows={'3'}
                                placeholder={"Describa la habitación, defina reglas internas o cualquier información que considere relevante."}
                            />
                        </div>

                        <div className="mt-5">
                            <label htmlFor="services" className="flex text-lg font-bold">
                                Admite <Asterisk />
                            </label>

                            <OffertsFormAdmits offertsFormData={offertsFormData} setOffertsFormData={setOffertsFormData}/>
                        </div>

                        <div className="mt-6 sm:flex justify-between">

                            <button onClick={clearForm} className={"w-full mt-5 mx-5 bg-[#d11717] font-bold text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"}>Limpiar Formulario</button>

                            <input type="submit" value="Crear Oferta" className={"w-full mt-5 mx-5 bg-[#0B8D83] font-bold text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"}/>

                        </div>
                    </div>
                </form>

            </div>
        </section>
    )
}