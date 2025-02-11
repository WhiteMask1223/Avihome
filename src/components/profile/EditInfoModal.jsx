"use client"

import { useState, useContext } from "react";

import { UserContext } from "@/contexts/User.context";

import Asterisk from "../UI/formElements/Asterisk";
import ModalSection from "../UI/utility/ModalSecction";
import Button from "../UI/utility/Button";
import SubmitButton from "../UI/formElements/SubmitButton";
import VariableInput from "../UI/formElements/VariableInput";

import { update_userInfo } from "@/api/user.api";

import { phoneNumberValidator } from "@/validations/user.validation";

export default function EditInfoModal({ trigger, setTrigger, user, setUser }) {

    const formDataTemplate = {
        name: user.name,
        phone: user.phone,
        contEmail: user.contEmail
    };

    const { setUserData } = useContext(UserContext);

    const [formData, setFormData] = useState(formDataTemplate);
    const [updating, setUpdating] = useState(false);
    const [formError, setFormError] = useState([false, '']);

    const updateFormData = (key, newValue) => {

        //Formatea los numeros telefonicos
        if (key === "phone") {
            newValue = newValue.replace(/[^0-9]/g, "");

            if (newValue.length > 4) {
                newValue = newValue.slice(0, 4) + "-" + newValue.slice(4);
            };
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setUpdating(true);

            if (!formData.name || !formData.phone) {
                setFormError([true, 'Rellene todos los campos.']);
                setUpdating(false);
                return
            };

            if (!phoneNumberValidator(formData.phone)) {
                setFormError([true, 'Ingrese un número de teléfono válido.']);
                updateFormData("phone", '');
                setUpdating(false);
                return
            };

            const response = await update_userInfo(user._id, formData);

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

                <h1 className="m-auto w-fit p-2 text-xl font-bold">Editar Información del Perfil</h1>

                <h2 className="text-center font-bold text-red-500">{formError[1]}</h2>

                <form onSubmit={handleSubmit}>

                    {/*<div className="mt-2">
                        <label htmlFor="name" className="font-bold flex">
                            Nombre de Usuario: <Asterisk />
                        </label>

                        <VariableInput
                            type={"text"}
                            id={"name"}
                            value={formData.name}
                            setStateFunction={updateFormData}
                            error={formError[0]}
                            autoComplete={"off"}
                            required
                        />
                    </div>*/}

                    <div className="mt-2">
                        <label htmlFor="phone" className="font-bold flex">
                            Número de Teléfono: <Asterisk />
                        </label>

                        <VariableInput
                            type={"tel"}
                            id={"phone"}
                            value={formData.phone}
                            setStateFunction={updateFormData}
                            error={formError[0]}
                            autoComplete={"off"}
                            required
                            placeholder={"04XX-0000000"}
                            maxLength="12"
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="contEmail" className="font-bold">
                            Correo Electrónico de Contacto:
                        </label>

                        <VariableInput
                            type={"email"}
                            id={"contEmail"}
                            value={formData.contEmail}
                            setStateFunction={updateFormData}
                            error={formError[0]}
                            autoComplete={"off"}
                        />
                    </div>

                    <div className="flex justify-evenly mt-5">
                        <SubmitButton
                            text={"Editar Perfil"}
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