"use client"

import { useState, useEffect } from "react";

import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Asterisk from "@/components/UI/formElements/Asterisk";

import { registerUser } from "@/api/user.api";
import { get_Admins } from "@/api/user.api";

import { validateEmail, phoneNumberValidator } from "@/validations/user.validation";
import AdminsTable from "@/components/Admin/register/AdminsTable";

export default function AdminRegister() {


    /**************************{ Declaraciones }**************************/

    const [admins, setAdmins] = useState(null);

    

    

    const registrationDataObjTemplate = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        contEmail: '',
        phone: '',
        role: 'Admin',
        active: true
    };

    const [registrationData, setRegistrationData] = useState(registrationDataObjTemplate);
    const [showPassword, setShowPassword] = useState(false);
    const [credentialsError, setCredentialsError] = useState([false, '']);
    const [saving, setSaving] = useState(false);


    /**************************{ Funciones }**************************/

    const fetchAdmins = async () => {
        try {
            const fetchedAdmins = await get_Admins();

            console.log(fetchedAdmins)

            setAdmins(fetchedAdmins);
        } catch (error) {
            console.error("fetchAdmins error: ", error);

        };
    };

    const updateRegistrationData = (key, newValue) => {

        //Formatea los numeros telefonicos
        if (key === "phone") {
            newValue = newValue.replace(/[^0-9]/g, "");

            if (newValue.length > 4) {
                newValue = newValue.slice(0, 4) + "-" + newValue.slice(4);
            }
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

        if (!validateEmail(registrationData.email)) {
            setCredentialsError([true, 'Ingrese un correo válido.']);
            updateRegistrationData("email", '');
            return
        };

        if (registrationData.password !== registrationData.passwordRepeat || registrationData.password < 6) {
            setCredentialsError([true, 'Las contraseñas no coinciden.']);
            updateRegistrationData("password", '');
            updateRegistrationData("passwordRepeat", '');
            return
        };

        if (!phoneNumberValidator(registrationData.phone)) {
            setCredentialsError([true, 'Ingrese un número de teléfono válido.']);
            updateRegistrationData("phone", '');
            return
        }

        setSaving(true);

        const registerResponse = await registerUser(registrationData);

        if (!registerResponse.error) {
            setRegistrationData(registrationDataObjTemplate);
            setSaving(false);
            return;
        };

        setCredentialsError([true, registerResponse.message]);
        setSaving(false);
    };

    useEffect(() => {
        if (!admins) {
            fetchAdmins();
        }
    }, [admins]);

    return (
        <section>
            <div className="px-6 pt-24 flex flex-col items-center">
                <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12  mb-8">

                    <h1 className="w-fit p-2 text-2xl font-bold mb-5">Registro de Administradores</h1>

                    <h2 className="text-center font-bold text-red-500">{credentialsError[1]}</h2>

                    <form onSubmit={handleSubmit} className="mt-2">

                        <div className="columns-2">
                            <div>
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="flex font-bold">
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
                                <div className="mt2">
                                    <label htmlFor="email" className="flex font-bold">
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

                                {/* phoneNumber Input */}
                                <div className="mt-1">
                                    <label htmlFor="phone" className="flex font-bold">
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
                                        maxLength="12"
                                    />
                                </div>
                            </div>

                            <div>
                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="flex font-bold">
                                        Contraseña <Asterisk />
                                    </label>
                                    <VariableInput
                                        type={`${showPassword ? "text" : "password"}`}
                                        id={"password"}
                                        value={registrationData.password}
                                        setStateFunction={updateRegistrationData}
                                        required
                                        autoComplete={"off"}
                                        error={credentialsError[0]}
                                    />
                                </div>

                                <div className="mt2">
                                    <label htmlFor="passwordRepeat" className="flex font-bold">
                                        Repita su Contraseña <Asterisk />
                                    </label>
                                    <VariableInput
                                        type={`${showPassword ? "text" : "password"}`}
                                        id={"passwordRepeat"}
                                        value={registrationData.passwordRepeat} setStateFunction={updateRegistrationData}
                                        required
                                        autoComplete={"off"}
                                        error={credentialsError[0]}
                                    />

                                    <button type="button" onClick={() => { handleShowPassword() }} className="block ml-auto text-sm font-bold">Mostar Contraseña</button>
                                </div>

                                <div>
                                    <h2 className="text-center text-grayFontThemeColor">* Indica que el Campo es Obligatorio</h2>

                                    {/* SingIn Button */}
                                    <div className="mt-2 w-fit mx-auto">
                                        <SubmitButton text={'Registrar Administrador'} styles={"w-fit py-2 px-4"} disabled={saving} />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>

                </div>
            </div>

            <AdminsTable admins={admins}/>

        </section>
    );
};