"use client"

import { useState } from "react";

import { save_location } from "@/api/locationsAndTypes.api";

import ModalSection from "@/components/UI/utility/ModalSecction";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Button from "@/components/UI/utility/Button";

export default function CreateLocationModal({ 
    trigger, 
    setTrigger, 
    getLocationsAndType, 
    locationAndTypeFetch 
}) {

    const locationTemplate = {
        text: ""
    };

    const [newLocation, setNewLocation] = useState(locationTemplate);
    const [updating, setUpdating] = useState(false);

    const updateFormData = (key, newValue) => {
        setNewLocation((prevData) => ({
            ...prevData,
            [key]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setUpdating(true);

            if (!newLocation.text) {
                setUpdating(false);
                return
            }

            const response = await save_location(newLocation);

            if (response.error) {
                setUpdating(false);
                return
            };
            
            getLocationsAndType();
            locationAndTypeFetch();

            setTrigger(!trigger);
            setNewLocation(locationTemplate);
            setUpdating(false);
        } catch (error) {
            console.error("Error al guardar localidad: ", error);
        };
    };

    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50 mt-32">

                <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Localidad</h1>

                <h2 className="text-center font-bold text-red-500"></h2>

                <form onSubmit={handleSubmit}>

                    <div className="mt-6">
                        <label htmlFor="text" className="font-bold">
                            Introduzca el nombre de la localidad:
                        </label>

                        <VariableInput
                            type={"text"}
                            id={"text"}
                            autoComplete={"off"}
                            value={newLocation.text}
                            setStateFunction={updateFormData}
                        />
                    </div>

                    <div className="flex justify-evenly mt-10">
                        <SubmitButton
                            text={"Crear"}
                            styles={'min-w-44'}
                            disabled={updating}
                        />

                        <Button
                            text={"Cancelar"}
                            buttonFunction={() => {
                                setTrigger(!trigger);
                                setNewLocation(locationTemplate);
                            }}
                            styles={"py-2 px-4"}
                        />
                    </div>
                </form>
            </div>
        </ModalSection>
    );
};