"use client"

import { useState } from "react";
import Link from "next/link";

import AuthSecction from "@/components/auth/AuthSection";
import VariableInput from "@/components/UI/VariableInput";

import { registerUser } from "@/api/auth.api";

import { validateEmail } from "@/validations/user.validation";

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

    const handleShowPassword = (key, newValue) => {
        setShowPassword((prevValue) => ({
            ...prevValue,
            [key]: newValue
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        
        console.log('login attempt');

        if (!validateEmail(registrationData.email)) {
            updateRegistrationData("email", '');
            return
        };

        if (registrationData.password !== registrationData.passwordRepeat || registrationData.password < 6) {
            updateRegistrationData("password", '');
            updateRegistrationData("passwordRepeat", '');
            return
        };

        registerUser(registrationData)
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

                    <button type="button" onClick={() => { handleShowPassword('psw', !showPassword.psw) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                <div>
                    <label htmlFor="password">
                        Repita su Contraseña
                    </label>
                    <VariableInput type={`${showPassword.pswR ? "text" : "password"}`} id={"passwordRepeat"} value={registrationData.passwordRepeat} setStateFunction={updateRegistrationData} required autoComplete={"off"} />

                    <button type="button" onClick={() => { handleShowPassword('pswR', !showPassword.pswR) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                {/* altEmail Input */}
                <div className="mt-6">
                    <label htmlFor="altEmail">
                        Correo Electrónico de Contacto
                    </label>
                    <VariableInput type={"text"} id={"altEmail"} value={registrationData.altEmail} setStateFunction={updateRegistrationData} autoComplete={"off"} />
                </div>

                {/* phoneNumber Input */}
                <div className="mt-1">
                    <label htmlFor="phpneNumber">
                        Teléfono de Contacto
                    </label>
                    <VariableInput type={"text"} id={"phoneNumber"} value={registrationData.phoneNumber} setStateFunction={updateRegistrationData} autoComplete={"off"} />
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