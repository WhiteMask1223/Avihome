'use client'

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";
import { UserContext } from "@/contexts/User.context";
import { MainPageContext } from "@/contexts/MainPage.context";
import { UtilityContex } from "@/contexts/Utility.context";

import OffertsFormSection from "@/components/offerts/form/OffertsFormSection";
import VariableTextArea from "@/components/UI/formElements/VariableTextArea";
import OffertsFormCheckbox from "@/components/offerts/form/OffertsFormCheckbox";
import OffertsFormAdmits from "@/components/offerts/form/OffertsFormAdmits";

import VariableInput from "@/components/UI/formElements/VariableInput";
import SelectOption from "@/components/UI/formElements/SelectOption";
import Asterisk from "@/components/UI/formElements/Asterisk";
import LoadingBg from "@/components/UI/utility/LoadingBg";

import { update_offert, get_OffertById } from "@/api/offerts.api";

export default function OffertsForm() {


    /**************************{ Declaraciones }**************************/

    const router = useRouter();
    const offertId = useParams();

    const { offertsType, offertsLocation } = useContext(CategoryFilterContext);
    const { userData } = useContext(UserContext);
    const { fetchOfferts } = useContext(MainPageContext)
    const { loading, setLoading } = useContext(UtilityContex);

    const [offertsFormData, setOffertsFormData] = useState(null);
    const [originalOffertData, setOriginalOffertData] = useState(null);


    /**************************{ Funciones }**************************/

    const offertsFormDataFormater = (offertData) => {

        const offertsFormDataTemplate = {
            title: offertData.title,
            type: offertData.type,

            location: offertData.location,
            address: offertData.address,

            description: offertData.description,

            services: {
                'Agua': offertData.services.Agua,
                'Aire Acondicionado': offertData.services['Aire Acondicionado'],
                'Electricidad': offertData.services.Electricidad,
                'Gas': offertData.services.Gas,
                'Internet': offertData.services.Internet
            },

            otherServices: offertData.otherServices,

            availability: {
                capacity: offertData.availability.capacity,
                roomsAvailable: offertData.availability.roomsAvailable
            },

            admits: {
                'Solo Hombres': offertData.admits['Solo Hombres'],
                'Solo Mujeres': offertData.admits['Solo Mujeres'],
                'Cualquiera': offertData.admits.Cualquiera
            },
        };

        setOriginalOffertData(offertsFormDataTemplate);

        return offertsFormDataTemplate;
    };


    /**************************{ Fetch }**************************/

    const fechtOffertById = async () => {
        try {
            const offert = await get_OffertById(offertId);

            if (!offert.error) {
                setOffertsFormData(offertsFormDataFormater(offert));
            }
        } catch (error) {
            console.log(error);
        };
    };


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (!offertsFormData || !originalOffertData) {
            fechtOffertById();
        };

        if (loading) {
            setLoading(!loading);
        };
    });

    const [formError, setFormError] = useState([false, ""]);


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

        console.log(offertsFormData)
    };


    const updateSubObj = (objKey, field, value) => {

        let newValue = value

        if (objKey === "availability" && newValue < 0) {
            setFormError([true, "Rellene todos los campos."]);
            return
        };

        if (objKey === "availability") newValue = Number(value);

        if (field === "capacity" && newValue < offertsFormData.availability.roomsAvailable) {
            updateSubObj('availability', 'roomsAvailable', offertsFormData.availability.roomsAvailable - 1)
        };

        if (field === "roomsAvailable" && newValue > offertsFormData.availability.capacity) return;

        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            [objKey]: {
                ...prevFormData[objKey],
                [field]: newValue
            }
        }));
    };


    const clearForm = () => {
        setOffertsFormData(originalOffertData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!offertsFormData.location || !offertsFormData.type || !offertsFormData.availability) {
            setFormError([true, "Rellene todos los campos."]);
            return
        };

        try {
            const saveResponse = await update_offert(offertId, offertsFormData);

            if (!saveResponse.error) {
                router.push(`/profile/${userData._id}`);
                fetchOfferts();
            };
        } catch (error) {
            console.error(error);
        };
    };


    /**************************{ Return }**************************/

    if (!offertsFormData) {
        return <LoadingBg conditional={true} />
    };

    return (

        <OffertsFormSection>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Editar Oferta</h1>

            <form onSubmit={handleSubmit}>

                {/**************************{ Nombre de la oferta }**************************/}

                <h2 className="m-auto w-fit p-2 text-lg font-bold text-red-500 ">{formError[1]}</h2>

                <div className="mt-5">
                    <label htmlFor="tittle" className="flex text-lg font-bold">
                        Nombre de la Oferta: <Asterisk />
                    </label>

                    <VariableTextArea
                        id={'title'}
                        value={offertsFormData.title}
                        setStateFunction={updateField}
                        required
                        error={formError[0]}
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

                        <select className={`h-10 px-2 mt-1 rounded-md bg-elementThemeColor ${formError[0] ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`} value={offertsFormData.type} onChange={(e) => updateField('type', e.target.value)}>

                            <option value="" className="text-grayFontThemeColor" disabled>Seleccione una opción</option>

                            {Object.entries(offertsType).map(([key]) => (
                                <SelectOption key={key} value={key} text={key} />
                            ))}

                        </select>
                    </div>
                    <div>
                        <label htmlFor="tittle" className="flex text-lg font-bold">
                            Número de total habitaciones <Asterisk />
                        </label>
                        <VariableInput
                            type={'number'}
                            id={'availability'}
                            value={offertsFormData.availability.capacity}
                            required
                            autoComplete={"off"}
                            error={formError[0]}
                            onChange={(e) => updateSubObj('availability', 'capacity', e.target.value)}
                            onKeyDown={(e) => e.preventDefault()}
                        />

                    </div>

                    <div>
                        <label htmlFor="tittle" className="flex text-lg font-bold">
                            Número de habitaciones disponibles <Asterisk />
                        </label>
                        <VariableInput
                            type={'number'}
                            id={'availability'}
                            value={offertsFormData.availability.roomsAvailable}
                            required
                            autoComplete={"off"}
                            error={formError[0]}
                            onChange={(e) => updateSubObj('availability', 'roomsAvailable', e.target.value)}
                            onKeyDown={(e) => e.preventDefault()}
                        />

                    </div>
                </div>


                {/**************************{ Direcciones }**************************/}

                <div className="mt-5">
                    <label htmlFor="address" className="flex text-lg font-bold">
                        Localidad y Dirección <Asterisk />
                    </label>
                    <div className="sm:flex justify-between">

                        <select className={`h-10 px-2 rounded-md bg-elementThemeColor ${formError[0] ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`} value={offertsFormData.location} onChange={(e) => updateField('location', e.target.value)}>

                            <option value="" className="text-grayFontThemeColor" disabled>Seleccione una opción</option>

                            {Object.entries(offertsLocation).map(([key]) => (
                                <SelectOption key={key} value={key} text={key} />
                            ))}

                        </select>

                        <VariableTextArea
                            id={'address'}
                            value={offertsFormData.address}
                            setStateFunction={updateField}
                            required
                            error={formError[0]}
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
                                error={formError[0]}
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
                            error={formError[0]}
                            cols={'10'}
                            rows={'3'}
                            placeholder={"Describa la habitación, defina reglas internas o cualquier información que considere relevante."}
                        />
                    </div>

                    <div className="mt-5">
                        <label htmlFor="services" className="flex text-lg font-bold">
                            Admite <Asterisk />
                        </label>

                        <OffertsFormAdmits offertsFormData={offertsFormData} setOffertsFormData={setOffertsFormData} />
                    </div>

                    <div className="mt-6 sm:flex justify-between">

                        <button onClick={clearForm} className={"w-full mt-5 mx-5 bg-[#d11717] font-bold text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#fa0707] focus:outline-none"}>Revertir Cambios</button>

                        <input type="submit" value="Actualizar Oferta" className={"w-full mt-5 mx-5 bg-[#0B8D83] font-bold text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"} />

                    </div>
                </div>
            </form>
        </OffertsFormSection>

    );
};