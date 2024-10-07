"use client"

import { useState } from "react"
import Link from "next/link";

import AuthSecction from "@/components/Auth/AuthSection";
import VariableInput from "@/components/UI/VariableInput"

export default function SingInPage() {

    const registrationDataObjTemplate = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        altEmail: '',
        phoneNumber: ''
    };

    const [registrationData, setRegistrationData] = useState(registrationDataObjTemplate);
    const [showPassword, setShowPassword] = useState({ psw: false, pswR: false });

    const updateRegistrationData = (key, newValue) => {
        setRegistrationData((prevRegistrationData) => ({
            ...prevRegistrationData,
            [key]: newValue
        }));
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleShowPassword = (pswRepeat) => {
        if (pswRepeat) {
            setShowPassword((prevObj) => ({ ...prevObj, pswR: !showPassword.pswR }));
            return
        };

        setShowPassword((prevObj) => ({ ...prevObj, psw: !showPassword.psw }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(registrationData.email)) {
            setEmail('');
            return
        }

        if (registrationData.password !== registrationData.passwordRepeat) {
            setPassword('');
            setPasswordRepeat('');
            return
        }

        if (registrationData.password < 6) {
            return
        }

        console.log(registrationData)
        setRegistrationData(registrationDataObjTemplate)
    };

    return (
        <AuthSecction>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Registro</h1>
            <form onSubmit={handleSubmit} className="mt-2">

                {/* Name Input */}
                <div className="mt-3">
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <VariableInput type={"text"} id={"name"} value={registrationData.name} setStateFunction={updateRegistrationData} required autoComplete={"off"} />
                </div>

                {/* Email Input */}
                <div className="mt-1">
                    <label htmlFor="email">
                        Correo Electrónico
                    </label>
                    <VariableInput type={"email"} id={"email"} value={registrationData.email} setStateFunction={updateRegistrationData} required autoComplete={"off"} />
                </div>

                {/* Password Input */}
                <div className="mt-6">
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <VariableInput type={`${showPassword.psw ? "text" : "password"}`} id={"password"} value={registrationData.password} setStateFunction={updateRegistrationData} required autoComplete={"off"} />

                    <button type="button" onClick={() => { handleShowPassword(false) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                <div>
                    <label htmlFor="password">
                        Repita su Contraseña
                    </label>
                    <VariableInput type={`${showPassword.pswR ? "text" : "password"}`} id={"passwordRepeat"} value={registrationData.passwordRepeat} setStateFunction={updateRegistrationData} required autoComplete={"off"} />

                    <button type="button" onClick={() => { handleShowPassword(true) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                {/* altEmail Input */}
                <div className="mt-6">
                    <label htmlFor="altEmail">
                        Correo Electrónico Alternativo
                    </label>
                    <VariableInput type={"email"} id={"altEmail"} value={registrationData.altEmail} setStateFunction={updateRegistrationData} autoComplete={"off"} />
                </div>

                {/* phoneNumber Input */}
                <div className="mt-1">
                    <label htmlFor="phpneNumber">
                        Teléfono de Contacto
                    </label>
                    <VariableInput type={"text"} id={"phoneNumber"} value={registrationData.altEmail} setStateFunction={updateRegistrationData} autoComplete={"off"} />
                </div>

                {/* SingIn Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full mt-5 bg-[#0B8D83] text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"
                    >
                        Registrarse
                    </button>
                </div>
            </form>

            {/* login Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </AuthSecction>
    )
}