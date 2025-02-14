"use client"

import { useState, useEffect, useContext } from "react";

import { MainPageContext } from "@/contexts/MainPage.context";

import { get_TotalUsers, get_Admins } from "@/api/user.api";

import StadisticsCard from "./StadisticsCard";
import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function StadictisSection() {

    const { offertsData } = useContext(MainPageContext);

    const [totalUsers, setTotalUsers] = useState(null);
    const [totalAdmins, setTotalAdmins] = useState(null);

    const fetchTotalUsers = async () => {
        try {
            const total = await get_TotalUsers()

            setTotalUsers(total);
        } catch (error) {
            console.log("fetchTotalUsers", error)
        };
    };

    const fetchTotalAdmins = async () => {
        try {
            const total = await get_Admins();

            console.log(total);


            setTotalAdmins(total.length);
        } catch (error) {
            console.log("fetchTotalUsers", error)
        };
    };

    useEffect(() => {
        if (!totalUsers) {
            fetchTotalUsers();
        };

        if (!totalAdmins) {
            fetchTotalAdmins();
        };
    }, [totalUsers, totalAdmins]);

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground sm:px-6 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:w-11/12 m-auto mb-8 py-5" >

                <h1 className="w-fit p-2 text-2xl font-bold mb-5">Estadisticas del Sistema:</h1>

                <div>
                    { offertsData === null || totalUsers === null || totalAdmins === null
                        ?
                        <div className="w-fit mx-auto my-14">
                            <LoadingSpinners size={"large"} />
                        </div>
                        :
                        <div className="h-fit flex items-center space-x-5 justify-evenly">
                            <StadisticsCard
                                tittle={"OFERTAS REGISTRADAS:"}
                                number={offertsData.length}
                            />
                            <StadisticsCard
                                tittle={"USUARIOS REGISTRADOS:"}
                                number={totalUsers}
                            />
                            <StadisticsCard
                                tittle={"ADMINISTRADORES:"}
                                number={totalAdmins}
                            />
                        </div>
                    }
                </div>
            </div >
        </section>
    )
}