'use client'

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";
import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import OffertsFormSection from "@/components/offerts/form/OffertsFormSection";
import OffertsForm from "@/components/offerts/form/OffertsForm";

import LoadingBg from "@/components/UI/utility/LoadingBg";

import { update_offert, get_OffertById } from "@/api/offerts.api";

export default function EditOffertForm() {


    /**************************{ Declaraciones }**************************/

    const router = useRouter();
    const offertId = useParams();

    const { offertsType, offertsLocation } = useContext(CategoryFilterContext);
    const { userData } = useContext(UserContext);
    const { loading, setLoading } = useContext(UtilityContex);

    const [offertsFormData, setOffertsFormData] = useState(null);
    const [originalOffertData, setOriginalOffertData] = useState(null);
    const [saving, setSaving] = useState(false);


    /**************************{ Funciones }**************************/

    const offertsFormDataFormater = (offertData) => {

        const offertsFormDataTemplate = {
            images: offertData.images,

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
                Caballeros: offertData.admits.Caballeros,
                Damas: offertData.admits.Damas,
                Cualquiera: offertData.admits.Cualquiera
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
    }, [originalOffertData]);

    const [formError, setFormError] = useState([false, ""]);


    /**************************{ Funciones }**************************/


    const updateSubObj = (objKey, field, admits, value) => {

        if (admits) {
            setOffertsFormData((prevFormData) => ({
                ...prevFormData,
                admits: {
                    'Caballeros': field === 'Caballeros',
                    'Damas': field === 'Damas',
                    'Cualquiera': field === 'Cualquiera'
                }
            }))
            return
        }

        let newValue = value

        if (objKey === "availability" && newValue < 0) return


        if (objKey === "availability") newValue = Number(value);

        if (field === "capacity" && newValue < offertsFormData.availability.roomsAvailable) {
            updateSubObj('availability', 'roomsAvailable', false, offertsFormData.availability.roomsAvailable - 1)
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
        fechtOffertById(); //TODO: fix img
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);


        if (!offertsFormData.location || !offertsFormData.type || !offertsFormData.availability || offertsFormData.images.length < 3) {
            setFormError([true, "Rellene todos los campos."]);
            setSaving(false);
            return
        };

        try {
            const saveResponse = await update_offert(offertId, offertsFormData);

            if (!saveResponse.error) {
                router.push(`/profile/${userData._id}`);
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

            <OffertsForm
                userData={userData}

                offertsFormData={offertsFormData}
                setOffertsFormData={setOffertsFormData}
                offertsLocation={offertsLocation}
                offertsType={offertsType}

                handleSubmit={handleSubmit}

                isOffertEdit={true}
                clearForm={clearForm}
                formError={formError}
                setFormError={setFormError}
                saving={saving}
                setSaving={setSaving}
            />

        </OffertsFormSection>

    );
};