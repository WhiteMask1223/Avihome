"use client"

import { useState } from "react";

import { save_type } from "@/api/locationsAndTypes.api";

import ModalSection from "@/components/UI/utility/ModalSecction";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Button from "@/components/UI/utility/Button";

export default function CreateTypeModal({ 
    trigger, 
    setTrigger, 
    getLocationsAndType, 
    locationAndTypeFetch 
}) {

    const typeTemplate = {
        text: "",
        onlyOneRoom: false
    };

    const [newType, setNewType] = useState(typeTemplate);
    const [updating, setUpdating] = useState(false);

    const updateFormData = (key, newValue) => {
        setNewType((prevData) => ({
            ...prevData,
            [key]: newValue
        }));
    };

    const updateCheckbox = () => {
        setNewType((prevData) => ({
            ...prevData,
            onlyOneRoom: !newType.onlyOneRoom
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setUpdating(true);

            if (!newType.text) {
                setUpdating(false);
                return
            }

            const response = await save_type(newType);

            if (response.error) {
                setUpdating(false);
                return
            };

            getLocationsAndType();
            locationAndTypeFetch();


            setTrigger(!trigger);
            setNewType(typeTemplate);
            setUpdating(false);
        } catch (error) {
            console.error("Error al guardar localidad: ", error);
        };
    };

    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50 mt-32">

                <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Tipo de Oferta</h1>

                <h2 className="text-center font-bold text-red-500"></h2>

                <form onSubmit={handleSubmit}>

                    <div className="mt-6">
                        <label htmlFor="text" className="font-bold">
                            Introduzca el nombre del tipo de oferta:
                        </label>

                        <VariableInput
                            type={"text"}
                            id={"text"}
                            autoComplete={"off"}
                            value={newType.text}
                            setStateFunction={updateFormData}
                        />

                        <label className="mt-2 py-0.5 inline-flex items-center cursor-pointer ml-2 sm:py-0">
                            <input
                                id={"checkbox"}
                                className="hidden peer"
                                type="checkbox"
                                onChange={updateCheckbox}
                                checked={newType.onlyOneRoom}
                            />
                            <span className="w-5 h-5 sm:w-4 sm:h-4 my-auto bg-checkboxThemeColor border-checkboxThemeBorder border rounded-full peer-checked:bg-checkboxThemeSelected peer-checked:border-transparent transition-all"></span>
                            <span className="ml-2 w-fit text-lg overflow-hidden text-ellipsis whitespace-nowrap sm:text-base">¿Solo una Habitación?</span>
                        </label>
                    </div>

                    <div className="flex justify-evenly mt-5">
                        <SubmitButton
                            text={"Crear"}
                            styles={'min-w-44'}
                            disabled={updating}
                        />

                        <Button
                            text={"Cancelar"}
                            buttonFunction={() => {
                                setTrigger(!trigger);
                                setNewType(typeTemplate);
                            }}
                            styles={"py-2 px-4"}
                        />
                    </div>
                </form>
            </div>
        </ModalSection>
    );
};