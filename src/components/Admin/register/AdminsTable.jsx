"use client"

import Link from "next/link";

import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function AdminsTable({ admins }) {

    if (!admins) return <LoadingBg conditional={true}/>;

    return (
        <div className="px-6 flex flex-col items-center">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 mb-8">
                <h1 className="w-fit p-2 text-2xl font-bold mb-5">
                    Admins Registrados
                </h1>


                <div className="w-3/4 mt-5 mx-auto">

                    <table className="table-auto w-full border-collapse mt-4 overflow-hidden bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow">
                        <thead>
                            <tr>
                                <th className="text-lg font-bold py-1.5 px-4">
                                    Nombre:
                                </th>
                                <th className="text-lg font-bold py-1.5 px-4">
                                    Correo:
                                </th>
                                <th className="text-lg font-bold py-1.5 px-4">
                                    Teléfono:
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {admins.map((admin, idx) => (
                                <tr key={idx}>
                                    <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                        <Link href={`/profile/${admin._id}`}><strong>{admin.name}</strong></Link>
                                    </th>
                                    <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                        {admin.email}
                                    </th>
                                    <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                        {admin.phone}
                                    </th>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};