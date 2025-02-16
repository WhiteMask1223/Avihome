"use client"

import { useState } from "react";
import Link from "next/link";

import { delete_report } from "@/api/reports.api";

import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function ReportsTable({
    reports,
    fetchReports,
}) {

    const [updating, setUpdating] = useState(false);

    const deleteItem = async (id) => {

        setUpdating(true);

        const result = await delete_report(id);

        console.log(result)

        if (!result.error) {
            fetchReports();
        };

        setUpdating(false);
    };


    return (
        <div className="w-full mt-5 2xl:mt-0 mx-auto">
            <table className="table-auto w-full border-collapse mt-4 overflow-hidden bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow">
                <thead>
                    <tr>
                        <th className="text-lg font-bold py-1.5 px-4">
                            N
                        </th>

                        <th className="text-lg font-bold py-1.5 px-4">
                            Oferta:
                        </th>

                        <th className="text-lg font-bold py-1.5 px-4">
                            Autor:
                        </th>

                        <th className="text-lg font-bold py-1.5 px-4">
                            Reporta:
                        </th>

                        <th className="text-lg font-bold py-1.5 px-4">
                            Acciones:
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map((report, idx) => (
                        <tr key={idx}>
                            <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                {idx + 1}
                            </th>

                            <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                <Link href={`/profile/${report.reportedUserId._id}`}>
                                    <strong>{report.reportedUserId.name}:{" "}</strong>
                                </Link>

                                <Link href={`/offerts/${report.offertId._id}`}>
                                    {report.offertId.title}
                                </Link>

                            </th>

                            <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                <Link href={`/profile/${report.userId._id}`}>
                                    <strong>{report.userId.name}</strong>
                                </Link>
                            </th>

                            <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                {report.text}
                            </th>

                            <th className="font-normal py-1.5 px-1 border-sectionThemeBackground border-collapse border-t-2 border-l-2">
                                <button
                                    type="button"
                                    className={`${updating ? "bg-subSectionThemeBackground" : "bg-[#ba0000] hover:bg-[#fa0707]"} text-lg text-white text-center px-2 font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none font-normal mx-1`}
                                    onClick={() => deleteItem(report._id)}
                                    disabled={updating}
                                >
                                    {updating ?
                                        <LoadingSpinners />
                                        :
                                        <i className="ri-delete-bin-2-fill text-xl text-white" />
                                    }
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};