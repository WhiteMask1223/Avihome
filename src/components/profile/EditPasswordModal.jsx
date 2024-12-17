"use client"

import { useState } from "react";

import ModalSection from "../UI/utility/ModalSecction";
import Button from "../UI/utility/Button";
import SubmitButton from "../UI/formElements/SubmitButton";
import VariableInput from "../UI/formElements/VariableInput";

import { update_userPassword } from "@/api/user.api";

export default function EditPasswordModal({ trigger, setTrigger, user }) {

    const formDataTemplate = {
        oldPassword: '',
        newPassword: '',
        repNewPassword: ''
    };

    const [formData, setFormData] = useState(formDataTemplate);
    const [showPassword, setShowPassword] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [formError, setFormError] = useState([false, '']);

    const updateFormData = (key, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUpdating(true);

        if (!formData.oldPassword || !formData.newPassword || !formData.repNewPassword) {
            setFormError([true, 'Rellene todos los campos.']);
            setUpdating(false);
            return
        }

        if (formData.newPassword !== formData.repNewPassword) {
            setFormError([true, 'Las contraseñas nuevas no coinciden.']);
            setUpdating(false);
            return
        }

        const response = await update_userPassword(user._id, formData);

        if (response.error) {
            setFormError([true, response.message]);
            setUpdating(false);
            return
        };

        setTrigger(!trigger);
        setFormData(formDataTemplate)
        setUpdating(false);
    };

    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>

            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Cambiar Contraseña</h1>

            <h2 className="text-center font-bold text-red-500">{formError[1]}</h2>

            <form onSubmit={handleSubmit}>

                <div className="mt-6">
                    <label htmlFor="oldPassword" className="font-bold">
                        Introduzca su antigua contraseña:
                    </label>

                    <VariableInput
                        type={`${showPassword ? "text" : "password"}`}
                        id={"oldPassword"}
                        value={formData.oldPassword}
                        setStateFunction={updateFormData}
                        error={formError[0]}
                        autoComplete={"off"}
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="newPassword" className="font-bold">
                        Introduzca su nueva contraseña:
                    </label>

                    <VariableInput
                        type={`${showPassword ? "text" : "password"}`}
                        id={"newPassword"}
                        value={formData.newPassword}
                        setStateFunction={updateFormData}
                        error={formError[0]}
                        autoComplete={"off"}
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="repNewPassword" className="font-bold">
                        Repita su contraseña:
                    </label>

                    <VariableInput
                        type={`${showPassword ? "text" : "password"}`}
                        id={"repNewPassword"}
                        value={formData.repNewPassword}
                        setStateFunction={updateFormData}
                        error={formError[0]}
                        autoComplete={"off"}
                    />

                    <button
                        type="button"
                        onClick={() => { setShowPassword(!showPassword) }}
                        className="block ml-auto text-sm font-bold"
                    >
                        Mostar Contraseñas
                    </button>
                </div>

                <div className="flex justify-evenly mt-10">
                    <SubmitButton
                        text={"Cambiar Contraseña"}
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
                    />
                </div>
            </form>

        </ModalSection>
    );
};