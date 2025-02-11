"use client"

import { useEffect, useContext } from "react";

import { UtilityContex } from "@/contexts/Utility.context";

import LocationAndTypesSection from "@/components/Admin/Dashboard/LocationAndTypesSection";
import StadictisSection from "@/components/Admin/Dashboard/Stadistics";

export default function AdminDashboard() {

    const { loading, setLoading } = useContext(UtilityContex)

    useEffect(() => {
        if (loading) {
            setLoading(!loading);
        };
    }, []);

    return (
        <section className="pt-24 min-h-screen flex flex-col items-center">
            <StadictisSection />
            <LocationAndTypesSection />
        </section>
    );
};