'use client'

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";
import { UserContext } from "@/contexts/User.context";
import { MainPageContext } from "@/contexts/MainPage.context";

import OffertsFormSection from "@/components/offerts/form/OffertsFormSection";
import OffertsForm from "@/components/offerts/form/OffertsForm";

import { save_Offert } from "@/api/offerts.api";

export default function NewOffertForm() {


    /**************************{ Declaraciones }**************************/

    const { rawType, offertsLocation } = useContext(CategoryFilterContext);
    const { userData } = useContext(UserContext);
    const { fetchOfferts } = useContext(MainPageContext)

    const router = useRouter();

    const offertsFormDataTemplate = {
        images: [],
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

        availability: 0,

        admits: {
            Caballeros: false,
            Damas: false,
            Cualquiera: true
        },

        user: null
    };

    const [offertsFormData, setOffertsFormData] = useState(offertsFormDataTemplate);
    const [formError, setFormError] = useState([false, ""]);
    const [saving, setSaving] = useState(false);


    /**************************{ Funciones }**************************/

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(offertsFormData)
        setSaving(true);

        if (
            !offertsFormData.title ||
            !offertsFormData.type || 
            !offertsFormData.location || 
            !offertsFormData.address ||
            !offertsFormData.description ||
            !offertsFormData.availability ||
            offertsFormData.images.length < 3
        ) {
            setFormError([true, "Rellene todos los campos."]);
            setSaving(false);
            return
        };

        try {
            const saveResponse = await save_Offert(offertsFormData);

            if (saveResponse) {
                router.push(`/profile/${userData._id}`);
                fetchOfferts();
                return
            };

            setSaving(false);
        } catch (error) {
            console.error(error);
        };
    };

    const clearForm = () => {
        setOffertsFormData(offertsFormDataTemplate);
    };

    /**************************{ Return }**************************/

    return (
        <OffertsFormSection>

            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Oferta</h1>

            <OffertsForm
                userData={userData}
                
                offertsFormData={offertsFormData}
                setOffertsFormData={setOffertsFormData}
                offertsLocation={offertsLocation}
                offertsType={rawType}

                handleSubmit={handleSubmit}
                
                isOffertEdit={false}
                clearForm={clearForm}
                formError={formError}
                setFormError={setFormError}
                saving={saving}
                setSaving={setSaving}
            />

        </OffertsFormSection>
    );
};