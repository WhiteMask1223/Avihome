"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import AuthSecction from "@/components/Auth/AuthSection";
import VariableInput from "@/components/UI/VariableInput";

export default function LoginPage() {

    const loginDataObjTemplate = {
        email: '',
        password: ''
    }

    const router = useRouter();

    const { data: session, status } = useSession()

    const [loginData, setLoginData] = useState(loginDataObjTemplate);
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

        console.log( session )
        const authResult = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        console.log(authResult)
        if (authResult.error) {
            console.log('login Error')  
        } else {
            console.log('login')  
            //router.push("/")
        }
        
        setLoginData(loginDataObjTemplate)
    };

    return (
        <AuthSecction>
            <h1 className="m-auto w-fit p-2 text-2xl font-bold">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="mt-2">
                {status}
                {/* Email Input */}
                <div className="mt-6">
                    <label htmlFor="email">
                        Correo Electrónico
                    </label>
                    <VariableInput type={"email"} id={"email"} value={loginData.email} setStateFunction={updateLoginData} autoComplete={"off"} />
                </div>

                {/* Password Input */}
                <div className="mt-6">
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <VariableInput type={`${showPassword ? "text" : "password"}`} id={"password"} value={loginData.password} setStateFunction={updateLoginData} autoComplete={"off"} />

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