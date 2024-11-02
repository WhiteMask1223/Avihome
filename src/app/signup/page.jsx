"use client"

import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UserContext } from "@/contexts/User.context";

import AuthSecction from "@/components/auth/AuthSection";
import VariableInput from "@/components/UI/VariableInput";

import { registerUser } from "@/api/user.api";

import { validateEmail } from "@/validations/user.validation";

export default function SingInPage() {


    /**************************{ Declaraciones }**************************/


    const registrationDataObjTemplate = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        contEmail: '',
        phone: ''
    };

    const [registrationData, setRegistrationData] = useState(registrationDataObjTemplate);
    const [showPassword, setShowPassword] = useState({ psw: false, pswR: false });

    const { setAuth } = useContext(UserContext);

    const router = useRouter();


    /**************************{ Funciones }**************************/


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

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = registrationData.email
        const password = registrationData.password

        if (!validateEmail(registrationData.email)) {
            updateRegistrationData("email", '');
            return
        };

        if (registrationData.password !== registrationData.passwordRepeat || registrationData.password < 6) {
            updateRegistrationData("password", '');
            updateRegistrationData("passwordRepeat", '');
            return
        };

        const registerResponse = await registerUser(registrationData);

        if (registerResponse.data === true) {
            const authResult = await signIn("credentials", {
                redirect: false,
                email,
                password
            });

            if (authResult.error) {
                setRegistrationData(registrationDataObjTemplate);
            } else {
                console.log("Registro exitoso");
                setAuth(true);
                router.push("/");
            };
        };

        setRegistrationData(registrationDataObjTemplate);
    };


    /**************************{ Return }**************************/


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
                    <VariableInput type={"text"} id={"contEmail"} value={registrationData.contEmail} setStateFunction={updateRegistrationData} autoComplete={"off"} />
                </div>

                {/* phoneNumber Input */}
                <div className="mt-1">
                    <label htmlFor="phpne">
                        Teléfono de Contacto
                    </label>
                    <VariableInput type={"text"} id={"phone"} value={registrationData.phone} setStateFunction={updateRegistrationData} required autoComplete={"off"} />
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
    );
};