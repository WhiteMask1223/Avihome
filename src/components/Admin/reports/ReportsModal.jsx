"use client"

import { useState, useContext } from "react";

import { UserContext } from "@/contexts/User.context";

import Asterisk from "@/components/UI/formElements/Asterisk";
import ModalSection from "@/components/UI/utility/ModalSecction";

import Button from "@/components/UI/utility/Button";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import VariableInput from "@/components/UI/formElements/VariableInput";

import { save_report } from "@/api/reports.api";

export default function CreateReportModal({ trigger, setTrigger, user, offert }) {

    const formDataTemplate = {
        userId: user._id,
        offertId: offert._id,
        reportedUserId: offert.user._id,
        text: ""
    };

    const { setUserData } = useContext(UserContext);

    const [formData, setFormData] = useState(formDataTemplate);
    const [updating, setUpdating] = useState(false);
    const [formError, setFormError] = useState([false, '']);

    const updateFormData = (key, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setUpdating(true);

            if (!formData.text) {
                setFormError([true, 'Ingrese el motivo del reporte.']);
                setUpdating(false);
                return
            };

            const response = await save_report(formData);

            if (response.error) {
                setFormError([true, response.message]);
                setUpdating(false);
                return
            }; 

            setTrigger(!trigger);
            setUpdating(false);
            setUserData(response)
            setUser(response);
        } catch (error) {
            console.error("Error al acatualizar contraseña: ", error)
        };
    };


    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>
            <div className="w-full sm:max-w-lg h-fit m-auto bg-sectionThemeBackground p-5 sm:rounded-2xl shadow-lg inset-0 fixed z-50 mt-24">

                <h1 className="m-auto w-fit p-2 text-xl font-bold">Crear Reporte</h1>

                <h2 className="text-center font-bold text-red-500">{formError[1]}</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mt-2">
                        <label htmlFor="text" className="font-bold flex">
                            Ingrese su motivo de reporte: <Asterisk />
                        </label>

                        <VariableInput
                            type={"text"}
                            id={"text"}
                            value={formData.name}
                            setStateFunction={updateFormData}
                            error={formError[0]}
                            autoComplete={"off"}
                            required
                        />
                    </div>


                    <div className="flex justify-evenly mt-5">
                        <SubmitButton
                            text={"Reportar"}
                            disabled={updating}
                            styles={'min-w-44'}
                        />

                        <Button
                            text={"Cancelar"}
                            buttonFunction={() => {
                                setTrigger(!trigger);
                                setFormData(formDataTemplate)
                                setFormError([false, '']);
                                setUpdating(false);
                            }}
                            styles={"py-2 px-4"}
                        />
                    </div>
                </form>
            </div>
        </ModalSection>
    );
};