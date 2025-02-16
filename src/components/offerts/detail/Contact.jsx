"use client"

import { useState } from "react";

import Link from "next/link";

import SubmitButton from "@/components/UI/formElements/SubmitButton";
import VariableInput from "@/components/UI/formElements/VariableInput";
import VariableTextArea from "@/components/UI/formElements/VariableTextArea";

export default function Contact({ offert }) {

    const emailTemplate = {
        email: "",
        subject: "",
        message: ""
    };

    const [emailForm, setEmailForm] = useState(emailTemplate);

    const updateEmailForm = (field, newValue) => {
        setEmailForm(prevFormData => ({
            ...prevFormData,
            [field]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailForm(emailTemplate)
    }

    return (
        <div className="bg-subSectionThemeBackground p-4 sm:rounded-lg shadow-inner shadow-sectionThemeShadow mt-2 mb-6">

            <div className="mr-2">

                <div className="sm:flex sm:justify-between">
                    <div>
                        <h2 className="font-semibold">Propietario:</h2>
                        <Link href={`/profile/${offert.user._id}`} className="flex items-center">
                            <i className="ri-account-circle-line text-4xl"></i>
                            <p className="font-semibold">{offert.user.name}</p>
                        </Link>
                    </div>

                    <div className="mt-3 sm:mt-0">
                        <h2 className="font-semibold">Teléfono de contacto:</h2>
                        <p className="mt-2 font-bold sm:w-fit sm:mx-auto">{offert.user?.phone}</p>
                    </div>
                </div>
            </div>

            <form  onSubmit={handleSubmit} className="space-y-4 mt-5 sm:mt-0 sm:w-full">
                <h2 className="font-semibold">Enviar un Correo Electrónico:</h2>
                <div className="flex space-x-4">


                    <VariableInput
                        type={'text'}
                        id={'email'}
                        value={emailForm.email}
                        setStateFunction={updateEmailForm}
                        autoComplete={"off"}
                        placeholder={"Correo"}
                    />

                    <VariableInput
                        type={'text'}
                        id={'subject'}
                        value={emailForm.subject}
                        setStateFunction={updateEmailForm}
                        autoComplete={"off"}
                        placeholder={"Asunto"}
                    />

                </div>

                <VariableTextArea
                    id={"message"}
                    value={emailForm.message}
                    setStateFunction={updateEmailForm}
                    autoComplete={"off"}
                    placeholder={"Mensaje"}
                />

                <SubmitButton text={'Enviar Correo'} styles={"py-1 px-2"} />
            </form>

        </div>
    );
};