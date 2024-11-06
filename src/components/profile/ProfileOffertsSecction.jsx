import Link from "next/link"

import PagingCounter from "../mainPage/offertsPanel/PagingCounter"

export default function ProfileOffertsSecction() {
    return (
        <section className="w-full">

            {/* Sección de Ofertas Publicadas */}

            <div className="bg-sectionThemeBackground p-6 rounded-lg shadow-lg shadow-sectionThemeShadow w-11/12 m-auto">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold my-auto">Ofertas Publicadas</h2>
                    <Link href={"/offerts/offertsForm"} className="flex justify-between text-center p-2 rounded-lg bg-green-500 hover:bg-green-600">
                        <p className="m-auto text-white">Agregar Oferta</p>
                        <i className="ri-add-box-fill text-3xl text-white"></i>
                    </Link>
                </div>

                <div className="mb-4 text-center">
                    <PagingCounter currentPage={1} totalPages={1}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                </div>
            </div>
        </section>
    )
};