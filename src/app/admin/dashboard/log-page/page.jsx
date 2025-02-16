"use client"

import { useState, useEffect } from "react";

import { get_LogEntries } from "@/api/log.api";

import LoadingBg from "@/components/UI/utility/LoadingBg";

import LogSection from "@/components/Admin/log/LogSection";

export default function LogPage() {

    const [logEntries, setLogEntries] = useState(null);

    const fetchEntries = async () => {
        try {
            const entries = await get_LogEntries();

            if (!entries.error) {
                setLogEntries(entries);
            };
        } catch (error) {
            throw new Error('Error fetchEntries: ' + error.message);
        }
    };

    useEffect(() => {
        if (!logEntries) {
            fetchEntries();
        };
    }, [logEntries])

    if (!logEntries) return <LoadingBg conditional={true}/>

    return (
        <section className="w-full h-full p-6 pt-24">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 h-full m-auto mb-8" >

                <h1 className="text-2xl font-semibold mb-4">Log</h1>

                <LogSection logEntries={logEntries} />
            </div >
        </section>
    );
};