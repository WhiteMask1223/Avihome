"use client"

import { useState, useEffect, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import AuthSecction from "@/components/auth/AuthSection";
import SubmitButton from "@/components/UI/formElements/SubmitButton";

import { registerUser } from "@/api/user.api";

import { validateSignUpData } from "@/validations/user.validation";
import { phoneNumberFormater } from "@/utils/offertsUtils";
import SignUpInput from "@/components/auth/signup/SignupInput";

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
    const [showPassword, setShowPassword] = useState(false);
    const [credentialsError, setCredentialsError] = useState([false, '']);
    const [saving, setSaving] = useState(false);

    const { setUserData, setAuth } = useContext(UserContext);
    const { loading, setLoading } = useContext(UtilityContex);

    const router = useRouter();


    /**************************{ Funciones }**************************/


    const updateRegistrationData = (key, newValue) => {

        if (key === "phone") {
            newValue = phoneNumberFormater(newValue);
        }

        setRegistrationData((prevRegistrationData) => ({
            ...prevRegistrationData,
            [key]: newValue
        }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = registrationData.email
        const password = registrationData.password

        if (!validateSignUpData(registrationData, updateRegistrationData, setCredentialsError)) return;

        setSaving(true);

        const registerResponse = await registerUser(registrationData);

        if (!registerResponse.error) {
            const authResult = await signIn("credentials", {
                redirect: false,
                email,
                password
            });

            if (authResult.error) {
                setCredentialsError([true, 'Error al Iniciar Sesión']);
                setRegistrationData(registrationDataObjTemplate);
                setSaving(false);
            } else {
                setAuth(true);
                setUserData(registerResponse);
                router.push("/");
            };

        } else {
            setCredentialsError([true, registerResponse.message]);
            setRegistrationData(registrationDataObjTemplate);
            setSaving(false);
        };
    };

    useEffect(() => {
        if (loading) {
            setLoading(!loading);
        };
    });

    /**************************{ Return }**************************/


    return (
        <AuthSecction>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Registro</h1>
            <form onSubmit={handleSubmit} className="">

                <h2 className="text-center font-bold text-red-500">{credentialsError[1]}</h2>

                <SignUpInput
                    id={"name"}
                    tittle={"Nombre"}
                    inputType={"text"}
                    value={registrationData.name}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={true}
                />

                <SignUpInput
                    id={"email"}
                    tittle={"Correo Electrónico"}
                    inputType={"email"}
                    value={registrationData.email}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={true}
                />

                <SignUpInput
                    id={"password"}
                    tittle={"Contraseña"}
                    inputType={`${showPassword ? "text" : "password"}`}
                    value={registrationData.password}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={true}
                />

                <SignUpInput
                    id={"passwordRepeat"}
                    tittle={"Repita su Contraseña"}
                    inputType={`${showPassword ? "text" : "password"}`}
                    value={registrationData.passwordRepeat}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={true}
                >
                    <button type="button" onClick={() => { handleShowPassword() }} className="block ml-auto text-sm font-bold">Mostar Contraseña</button>
                </SignUpInput>

                <SignUpInput
                    id={"contEmail"}
                    tittle={"Correo Electrónico de Contacto"}
                    inputType={"email"}
                    value={registrationData.contEmail}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={false}
                />


                <SignUpInput
                    id={"phone"}
                    tittle={"Teléfono de Contacto"}
                    inputType={"tel"}
                    value={registrationData.phone}
                    setStateFunction={updateRegistrationData}
                    error={credentialsError[0]}
                    required={true}
                    placeholder={"04XX-0000000"}
                    maxLength="12"
                />

                <h2 className="text-center text-grayFontThemeColor mt-2">* Indica que el Campo es Obligatorio</h2>

                {/* SingIn Button */}
                <div className="mt-6">
                    <SubmitButton text={'Registrarse'} styles={"w-full py-2"} disabled={saving} />
                </div>
            </form>

            {/* login Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-grayFontThemeColor">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="font-bold text-linkFontThemeColor">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </AuthSecction>
    );
};