'use client'

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { get_OffertById } from "@/api/offerts.api";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import SubmitButton from "@/components/UI/formElements/SubmitButton";
import DetailCheckBox from "@/components/offerts/detail/DetailCheckBox";
import Carrousel from "@/components/offerts/carrousel/ImageCarrousel";

import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function OfferDetail() {

    const offertId = useParams();

    const { userData } = useContext(UserContext);
    const { loading, setLoading } = useContext(UtilityContex);

    const [offert, setOffert] = useState(null);


    const getOffert = async () => {
        try {
            const dbOffert = await get_OffertById(offertId);

            if (dbOffert) {
                setOffert(dbOffert);
            };
        } catch (error) {
            console.error("getOffert error: ", error);
        };
    };


    /**************************{ useEffect }**************************/

    useEffect(() => {
        if (!offert) {
            getOffert();
        };

        if (loading) {
            setLoading(!loading);
        };
    }, [offert]);


    /**************************{ Return }**************************/

    if (!offert) {
        return <LoadingBg conditional={true}/>
    };

    return (
        <div className="p-6 min-h-screen flex justify-center items-center">
            <div className="bg-sectionThemeBackground p-6 mt-12 sm:mt-20 rounded-2xl shadow-lg shadow-sectionThemeShadow w-full max-w-2xl">

                {/**************************{ title }**************************/}


                <h1 className="text-2xl font-bold mb-4">{offert.title}</h1>

                <Carrousel offert={offert} isEdit={false}/>

                {/**************************{ Type & Availability }**************************/}


                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Tipo:</h2>
                        <p className="font-normal bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.type}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">Disponibilidad:</h2>
                        <p className="font-normal bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.availability.roomsAvailable}</p>
                    </div>
                </div>


                {/**************************{ Location & Address }**************************/}

                <h2 className="text-lg font-semibold mt-4">Dirección:</h2>
                <p className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.location} - {offert.address}</p>


                {/**************************{ Services }**************************/}

                <h2 className="text-lg font-semibold mt-4">Servicios:</h2>

                <div className="sm:flex justify-between">
                    {offert.services &&
                        Object.entries(offert.services).map(([key, value]) => {
                            return <DetailCheckBox key={key} text={key} checked={value} />
                        })
                    }
                </div>

                <p className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.otherServices}</p>


                {/**************************{ Description }**************************/}

                <h2 className="text-lg font-semibold mt-4">Descripción:</h2>
                <p className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.description}.</p>


                {/**************************{ Admits }**************************/}

                <h2 className="text-lg font-semibold mt-4">Admite:</h2>

                <div className="sm:flex justify-between">
                    {offert.admits &&
                        Object.entries(offert.admits).map(([key, value]) => {
                            return <DetailCheckBox key={key} text={key} checked={value} />
                        })
                    }
                </div>


                {/**************************{ Contact }**************************/}

                <h2 className="text-lg font-semibold mt-6">Medio de contactos del Propietario:</h2>

                {userData ?

                    <div className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-2 sm:flex">

                        {/**************************{ Datos del propietario }**************************/}

                        <div className="mr-2">
                            <h2 className="font-semibold">Propietario:</h2>
                            <div className="mt-2">
                                <Link href={`/profile/${offert.user._id}`} className="flex items-center">
                                    <i className="ri-account-circle-line text-4xl"></i>
                                    <p className="font-semibold">{offert.user.name}</p>
                                </Link>
                            </div>
                            <h2 className="mt-2 font-semibold">Teléfono de contacto:</h2>
                            <p>{offert.user?.phone}</p>
                        </div>

                        <form className="space-y-4 mt-5 sm:mt-0">
                            <h2 className="font-semibold">Enviar un Correo Electrónico:</h2>
                            <div className="flex space-x-4">
                                <input type="text" placeholder="Correo" className="p-2 w-full bg-elementThemeColor rounded" />
                                <input type="text" placeholder="Asunto" className="p-2 w-full bg-elementThemeColor rounded" />
                            </div>
                            <textarea placeholder="Mensaje" className="p-2 w-full bg-elementThemeColor rounded h-24"></textarea>
                            <SubmitButton text={'Enviar Correo'} />
                        </form>

                    </div>
                    :
                    <div className="bg-subSectionThemeBackground p-4 h-24 rounded-lg shadow-inner shadow-sectionThemeShadow mt-2 flex">
                        <p className="m-auto"><Link href={"/login"} className="text-blue-500 font-bold">Inicia Sesión</Link> para poder ver los datos de contacto del propietario.</p>
                    </div>

                }
            </div>
        </div>
    );
};