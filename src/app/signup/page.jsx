"use client"

import { useState, useEffect, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import AuthSecction from "@/components/auth/AuthSection";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Asterisk from "@/components/UI/formElements/Asterisk";

import { registerUser } from "@/api/user.api";

import { validateEmail, phoneNumberValidator } from "@/validations/user.validation";

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
    const [credentialsError, setCredentialsError] = useState([false, '']);

    const { setUserData, setAuth } = useContext(UserContext);
    const { setLoading } = useContext(UtilityContex);

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
            setCredentialsError([true, 'Ingrese un correo válido.']);
            updateRegistrationData("email", '');
            return
        };

        if (registrationData.password !== registrationData.passwordRepeat || registrationData.password < 6) {
            setCredentialsError([true, 'Las Contraseñas no coinciden.']);
            updateRegistrationData("password", '');
            updateRegistrationData("passwordRepeat", '');
            return
        };

        if (!phoneNumberValidator(registrationData.phone)) {
            setCredentialsError([true, 'Ingrese un número de teléfono valido']);
            updateRegistrationData("phone", '');
            return
        }

        setLoading(true);

        const registerResponse = await registerUser(registrationData);

        if (!registerResponse.data.error) {
            const authResult = await signIn("credentials", {
                redirect: false,
                email,
                password
            });

            if (authResult.error) {
                setCredentialsError([true, 'Error al Iniciar Sesión']);
                setRegistrationData(registrationDataObjTemplate);
                setLoading(false);
            } else {
                setAuth(true);
                setUserData(registerResponse.data);
                router.push("/");
            };

        } else {
            setCredentialsError([true, registerResponse.data.message]);
            setRegistrationData(registrationDataObjTemplate);
            setLoading(false);
        };
    };

    /*useEffect(() => {
        setLoading(false);
    });*/

    /**************************{ Return }**************************/


    return (
        <AuthSecction>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Registro</h1>
            <form onSubmit={handleSubmit} className="mt-2">

                <h2 className="text-center font-bold text-red-500">{credentialsError[1]}</h2>

                {/* Name Input */}
                <div className="mt-3">
                    <label htmlFor="name" className="flex">
                        Nombre <Asterisk />
                    </label>
                    <VariableInput
                        type={"text"}
                        id={"name"}
                        value={registrationData.name}
                        setStateFunction={updateRegistrationData}
                        required
                        autoComplete={"off"}
                        error={credentialsError[0]}
                    />
                </div>

                {/* Email Input */}
                <div className="mt-1">
                    <label htmlFor="email" className="flex">
                        Correo Electrónico <Asterisk />
                    </label>
                    <VariableInput
                        type={"email"}
                        id={"email"}
                        value={registrationData.email}
                        setStateFunction={updateRegistrationData}
                        required
                        autoComplete={"off"}
                        error={credentialsError[0]}
                    />
                </div>

                {/* Password Input */}
                <div className="mt-6">
                    <label htmlFor="password" className="flex">
                        Contraseña <Asterisk />
                    </label>
                    <VariableInput
                        type={`${showPassword.psw ? "text" : "password"}`}
                        id={"password"}
                        value={registrationData.password}
                        setStateFunction={updateRegistrationData}
                        required
                        autoComplete={"off"}
                        error={credentialsError[0]}
                    />

                    <button type="button" onClick={() => { handleShowPassword('psw', !showPassword.psw) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                <div>
                    <label htmlFor="repPassword" className="flex">
                        Repita su Contraseña <Asterisk />
                    </label>
                    <VariableInput
                        type={`${showPassword.pswR ? "text" : "password"}`}
                        id={"passwordRepeat"}
                        value={registrationData.passwordRepeat} setStateFunction={updateRegistrationData}
                        required
                        autoComplete={"off"}
                        error={credentialsError[0]}
                    />

                    <button type="button" onClick={() => { handleShowPassword('pswR', !showPassword.pswR) }} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>

                {/* altEmail Input */}
                <div className="mt-6">
                    <label htmlFor="altEmail">
                        Correo Electrónico de Contacto
                    </label>
                    <VariableInput
                        type={"text"}
                        id={"contEmail"}
                        value={registrationData.contEmail}
                        setStateFunction={updateRegistrationData}
                        autoComplete={"off"}
                        error={credentialsError[0]}
                    />
                </div>

                {/* phoneNumber Input */}
                <div className="mt-1">
                    <label htmlFor="phpne" className="flex">
                        Teléfono de Contacto <Asterisk />
                    </label>
                    <VariableInput
                        type={"tel"}
                        id={"phone"}
                        value={registrationData.phone}
                        setStateFunction={updateRegistrationData}
                        error={credentialsError[0]}
                        required
                        autoComplete={"off"}
                        placeholder={"04XX-0000000"}
                    />
                </div>

                <h2 className="text-center text-gray-500 mt-2">* Indica que el Campo es Obligatorio</h2>

                {/* SingIn Button */}
                <div className="mt-6">
                    <SubmitButton text={'Registrarse'} />
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