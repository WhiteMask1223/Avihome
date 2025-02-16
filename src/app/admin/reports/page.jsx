"use client"

import { useState, useEffect } from "react";

import { get_reports } from "@/api/reports.api";

import LoadingBg from "@/components/UI/utility/LoadingBg";
import ReportsTable from "@/components/Admin/reports/ReportTable";

export default function ReportsPage() {

    const [reports, setReports] = useState(null);

    const fetchReports = async () => {
        try {
            const fetchedReports = await get_reports();

            if (!fetchedReports.error) {
                setReports(fetchedReports);
            };

            console.log(fetchedReports);
            
            
        } catch (error) {
            throw new Error('Error fetchReports: ' + error.message);
        }
    };

    useEffect(() => {
        if (!reports) {
            fetchReports();
        };
    }, [reports])

    if (!reports) return <LoadingBg conditional={true}/>

    return (
        <section className="w-full h-full p-6 pt-24">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 h-full m-auto mb-8" >

                <h1 className="text-2xl font-semibold mb-4">Reportes</h1>

                <ReportsTable
                    reports={reports}
                    fetchReports={fetchReports}
                />    
            </div >
        </section>
    );
};