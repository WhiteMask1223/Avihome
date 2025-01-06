"use client"

import { useEffect, useContext } from "react";

import { UtilityContex } from "@/contexts/Utility.context";

import LocationServicesSection from "@/components/Admin/Dashboard/Location&ServicesSection";

export default function AdminDashboard() {

    const { loading, setLoading } = useContext(UtilityContex)

    useEffect(() => {
        if (loading) {
            setLoading(!loading);
        };
    }, []);

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">
            <LocationServicesSection />
        </section>
    );
};