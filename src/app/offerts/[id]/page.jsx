'use client'

import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { get_OffertById, delete_offert } from "@/api/offerts.api";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";
import { MainPageContext } from "@/contexts/MainPage.context";

import CommentsAndStarsSection from "@/components/offerts/detail/CommentsAndStarsSection";
import Contact from "@/components/offerts/detail/Contact";
import DetailCheckBox from "@/components/offerts/detail/DetailCheckBox";
import Carrousel from "@/components/offerts/carrousel/ImageCarrousel";
import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";


import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function OfferDetail() {

    const offertId = useParams();

    const router = useRouter();

    const { userData } = useContext(UserContext);
    const { loading, setLoading } = useContext(UtilityContex);
    const { fetchOfferts } = useContext(MainPageContext);

    const [offert, setOffert] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const getOffert = useCallback(async () => {
        try {
            const dbOffert = await get_OffertById(offertId);

            if (dbOffert) {
                setOffert(dbOffert);
            };
        } catch (error) {
            console.error("getOffert error: ", error);
        };
    }, [offertId]);

    const deleteOffertHandeler = async () => {
        try {
            setDeleting(true);
            const res = await delete_offert(offert._id);

            if (!res.error) {
                fetchOfferts();
                router.push("/");
                setDeleting(false);
            };
        } catch (error) {
            console.log("deleteOffertHandeler error: ", error);
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
        return <LoadingBg conditional={true} />
    };

    if (offert.error) {
        return (
            <div className="mt-28 text-center">Oferta no Encontrada.</div>
        );
    };

    return (
        <div className="py-6 sm:px-6 min-h-screen flex justify-center items-center">
            <div className="bg-sectionThemeBackground sm:px-6 mt-14 sm:mt-20 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:max-w-4xl">

                {/**************************{ title }**************************/}

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold my-4 ml-2">
                        {offert.title}
                    </h1>

                    <div className="text-2xl">
                        {Array(5).fill().map((_, index) => (
                            <span key={index}>
                                {index < offert.rating ? <i className="ri-star-fill text-checkboxThemeSelected"></i> : <i className="ri-star-line text-checkboxThemeSelected"></i>}
                            </span>
                        ))}
                        {userData?.role === "Admin" || userData?.role === "Root" ?
                            <button
                                className="ml-2 px-1 bg-dangerButtonThemeColor rounded"
                                type="button"
                                onClick={deleteOffertHandeler}
                            >
                                {
                                    deleting
                                        ?
                                        <LoadingSpinners />
                                        :
                                        <i className="ri-delete-bin-2-fill text-white" />
                                }
                            </button>
                            :
                            ""
                        }
                    </div>
                </div>


                <Carrousel offert={offert} isEdit={false} />

                <div className="px-2 sm:px-0">
                    {/**************************{ Type & Availability }**************************/}


                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Tipo:</h2>
                            <p className="font-normal bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.type}</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">Disponibilidad:</h2>
                            <p className="font-normal bg-subSectionThemeBackground py-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.availability.roomsAvailable}</p>
                        </div>
                    </div>


                    {/**************************{ Location & Address }**************************/}

                    <h2 className="text-lg font-semibold mt-4">Dirección:</h2>
                    <p className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4">{offert.location} - {offert.address}</p>


                    {/**************************{ Services }**************************/}

                    <h2 className="text-lg font-semibold mt-4">Servicios:</h2>

                    <div className="flex sm:flex-row flex-col justify-between">
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

                    <div className="flex sm:flex-row flex-col justify-between">
                        {offert.admits &&
                            Object.entries(offert.admits).map(([key, value]) => {
                                return <DetailCheckBox key={key} text={key} checked={value} />
                            })
                        }
                    </div>
                </div>

                {/**************************{ Contact }**************************/}

                <h2 className="text-lg font-semibold mt-6">Medio de contactos del Propietario:</h2>

                {userData ?

                    <div>

                        {/**************************{ Datos del propietario }**************************/}

                        <Contact offert={offert} />

                        {/**************************{ Comments }**************************/}

                        <CommentsAndStarsSection offert={offert} user={userData} />

                    </div>
                    :
                    <div className="bg-subSectionThemeBackground p-4 h-24 rounded-lg shadow-inner shadow-sectionThemeShadow mt-2 mb-5 flex">
                        <p className="m-auto"><Link href={"/login"} className="text-blue-500 font-bold">Inicia Sesión</Link> para poder ver los datos de contacto del propietario y comentarios de los demás usuarios.</p>
                    </div>
                }
            </div>
        </div>
    );
};