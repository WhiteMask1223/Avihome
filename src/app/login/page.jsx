"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthSecction from "@/components/auth/AuthSection";
import VariableInput from "@/components/UI/VariableInput";

import { validateEmail } from "@/validations/user.validation";

export default function LoginPage() {

    const loginDataObjTemplate = {
        email: '',
        password: ''
    }

    const router = useRouter();

    const [loginData, setLoginData] = useState(loginDataObjTemplate);
    const [credentialsError, setCredentialsError] = useState([false, ''])
    const [showPassword, setShowPassword] = useState(false);


    const updateLoginData = (key, newValue) => {
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [key]: newValue
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = loginData.email
        const password = loginData.password

        if (!validateEmail(email)) {
            setCredentialsError([true, 'Introduzca un Correo Válido']);
            return
        };
        
        const authResult = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (authResult.error) {
            setCredentialsError([true, 'Credenciales Incorrectas o Usuario Inexistente']);
        } else {
            console.log(authResult)
            router.push("/");
        }
    };

    return (
        <AuthSecction>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="mt-2">

                <h2 className="text-center font-bold text-red-500">{credentialsError[1]}</h2>

                {/* Email Input */}
                <div className="mt-6">
                    <label htmlFor="email">
                        Correo Electrónico
                    </label>
                    <VariableInput type={"email"} id={"email"} value={loginData.email} setStateFunction={updateLoginData} error={credentialsError[0]} autoComplete={"off"} />
                </div>

                {/* Password Input */}
                <div className="mt-6">
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <VariableInput type={`${showPassword ? "text" : "password"}`} id={"password"} value={loginData.password} setStateFunction={updateLoginData} error={credentialsError[0]} autoComplete={"off"} />

                    <button type="button" onClick={() => {setShowPassword(!showPassword)}} className="block ml-auto text-sm">Mostar Contraseña</button>
                </div>


                {/* Login Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full mt-5 bg-[#0B8D83] text-lg text-white p-2 rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out hover:bg-[#10c4b6] focus:outline-none"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
                        Regístrate
                    </Link>
                </p>
            </div>
        </AuthSecction>
    )
}