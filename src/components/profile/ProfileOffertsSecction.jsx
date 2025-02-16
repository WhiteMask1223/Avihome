import Link from "next/link"

import ProfileOffertsCard from "./ProfileOffertCard"
import UserOffertsNotFound from "@/components/profile/UserOffertsNotFound";

import LoadingBg from "../UI/utility/LoadingBg";
import LoadingSpinners from "../UI/utility/LoadingSpinners";

export default function ProfileOffertsSecction({ userOfferts, sameUser, setUserOfferts, fetching }) {

    if (!userOfferts) return (
        <LoadingBg conditional={true} />
    )

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:w-11/12 my-5 mx-auto">

                <div className="flex justify-between mb-4">

                    <h2 className="text-xl font-bold my-auto">Ofertas Publicadas</h2>

                    {sameUser &&
                        <Link href={"/offerts/offerts-form"} className="flex justify-between text-center p-2 rounded-lg bg-submitButtonColor hover:bg-submitButtonHoverColor transition duration-300 ease-in-out">
                            <p className="m-auto text-white font-bold">Agregar Oferta</p>
                            <i className="ri-add-box-fill text-3xl text-white"></i>
                        </Link>
                    }
                </div>

                {fetching ? 
                    <div className="w-fit mx-auto">
                        <LoadingSpinners size={"large"}/>
                    </div>
                    :
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
                                        setUserOfferts={setUserOfferts}
                                    />
                                ))
                        }
                    </div>
                }

            </div>
        </section>
    )
};