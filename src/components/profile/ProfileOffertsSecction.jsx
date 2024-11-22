import Link from "next/link"

import ProfileOffertsCard from "./ProfileOffertCard"
import UserOffertsNotFound from "@/components/profile/UserOffertsNotFound";
import PagingCounter from "../mainPage/offertsPanel/PagingCounter"

import LoadingBg from "../UI/utility/LoadingBg";

export default function ProfileOffertsSecction({ userOfferts, sameUser }) {
    
    if (!userOfferts.length) return (
        <LoadingBg conditional={true}/>
    )

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 rounded-2xl shadow-lg shadow-sectionThemeShadow w-11/12 m-auto">

                <div className="flex justify-between mb-4">

                    <h2 className="text-xl font-bold my-auto">Ofertas Publicadas</h2>

                    {sameUser &&
                        <Link href={"/offerts/offerts-form"} className="flex justify-between text-center p-2 rounded-lg bg-submitButtonColor hover:bg-submitButtonHoverColor transition duration-300 ease-in-out">
                            <p className="m-auto text-white font-bold">Agregar Oferta</p>
                            <i className="ri-add-box-fill text-3xl text-white"></i>
                        </Link>
                    }
                </div>

                <div className="mb-4 text-center">
                    <PagingCounter currentPage={1} totalPages={1} />
                </div>

                <div className={`${!userOfferts.length ? "" : "grid grid-cols-1 md:grid-cols-2 gap-4"}`}>
                    {
                        !userOfferts.length ?
                            <UserOffertsNotFound />
                            :
                            userOfferts.map((offert) => (
                                <ProfileOffertsCard
                                    key={offert._id}
                                    offert={offert}
                                    sameUser={sameUser}
                                />
                            ))
                    }
                </div>
            </div>
        </section>
    )
};