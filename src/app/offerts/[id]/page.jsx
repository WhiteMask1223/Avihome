'use client'

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { MainPageContext } from "@/contexts/MainPage.context";

import SubmitButton from "@/components/UI/formElements/SubmitButton";
import DetailCheckBox from "@/components/offerts/detail/DetailCheckBox";

import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function OfferDetail() {

    const params = useParams();

    const { offertsData } = useContext(MainPageContext);

    const [offert, setOffert] = useState(null);

    const getOffert = () => {
        if (!offertsData) return

        const sortedOffert = offertsData.find((offert) => offert._id === params.id);

        if (sortedOffert) {
            setOffert(sortedOffert);
        }
    };


    /**************************{ useEffect }**************************/

    useEffect(() => {
        if (!offert && offertsData) {
            getOffert();
        };
    }, [offertsData]);


    /**************************{ Return }**************************/

    if (!offert) {
        return <LoadingBg />
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 mt-28 rounded-2xl shadow-md w-full max-w-2xl">

                {/**************************{ title }**************************/}

                <h1 className="text-2xl font-bold mb-4">{offert.title}</h1>


                {/**************************{ Type & Availability }**************************/}

                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Tipo:</h2>
                        <span className="font-normal">{offert.type}</span>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">Disponibilidad:</h2>
                        <span className="font-normal">{offert.availability.roomsAvailable}</span>
                    </div>
                </div>


                {/**************************{ Location & Address }**************************/}

                <h2 className="text-lg font-semibold mt-4">Dirección:</h2>
                <p>{offert.location} - {offert.address}</p>


                {/**************************{ Services }**************************/}

                <h2 className="text-lg font-semibold mt-4">Servicios:</h2>

                <div className="sm:flex justify-between">
                    {offert.services &&
                        Object.entries(offert.services).map(([key, value]) => {
                            return <DetailCheckBox key={key} text={key} checked={value} />
                        })
                    }
                </div>

                <p className="mt-2">{offert.otherServices}</p>


                {/**************************{ Description }**************************/}

                <h2 className="text-lg font-semibold mt-4">Descripción:</h2>
                <p>{offert.description}.</p>


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
                <div className="bg-gray-100 p-4 rounded-lg shadow-inner mt-2 flex">

                    <form className="space-y-4">
                        <h2 className="font-semibold">Enviar un Correo Electrónico:</h2>
                        <div className="flex space-x-4">
                            <input type="text" placeholder="Enviar Correo:" className="p-2 w-full border rounded" />
                            <input type="text" placeholder="Asunto" className="p-2 w-full border rounded" />
                        </div>
                        <textarea placeholder="Mensaje" className="p-2 w-full border rounded h-24"></textarea>
                        <SubmitButton text={'Enviar Correo'} />
                    </form>


                    {/**************************{ Datos del propietario }**************************/}

                    <div className="ml-2">
                        <h2 className="font-semibold">Propietario:</h2>
                        <div className="flex items-center mt-2">
                            <i className="ri-account-circle-line text-4xl"></i>
                            <Link href={`/profile/${offert.user._id}`}>
                                <p className="font-semibold">{offert.user.name}</p>
                            </Link>
                        </div>
                        <h2 className="mt-2 font-semibold">Teléfono de contacto:</h2>
                        <p>{offert.user?.phone}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};