import { useState, useEffect, useContext } from "react";
import Link from "next/link"

import { MainPageContext } from "@/contexts/MainPage.context";
import { UtilityContex } from "@/contexts/Utility.context";

import { update_roomsAvailable, delete_offert } from "@/api/offerts.api";

import LoadingSpinners from "../UI/utility/LoadingSpinners";
import DeleteConfirm from "../UI/utility/DeleteConfirm";

export default function ProfileOffertsCard({ offert, sameUser, fetchUserOfferts }) {


    /**************************{ Declaraciones }**************************/

    const { fetchOfferts } = useContext(MainPageContext);
    const { loading, setLoading } = useContext(UtilityContex);

    const [cardOffert, setCardOffert] = useState(offert);
    const [disableChangeAvailability, setDisableChangeAvailability] = useState(false);

    const [editLoading, setEditLoading] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);


    /**************************{ Funciones }**************************/

    const changeRoomsAvailableHandler = async (action) => {

        setDisableChangeAvailability(true);

        const newAvailabilityValue = updateRoomsAvailable(action);

        if (!newAvailabilityValue) return;

        try {
            const newOffert = await update_roomsAvailable(cardOffert._id, newAvailabilityValue);

            if (!newOffert.error) {
                setCardOffert(newOffert);
                await fetchOfferts();
            };

            setDisableChangeAvailability(false);
        } catch (error) {
            console.log("changeRoomsAvailableHandler error: ", error);
            setDisableChangeAvailability(false);
        }
    };

    const disabledHandler = (direction) => {
        if (direction === "up" && cardOffert.availability.roomsAvailable === cardOffert.availability.capacity) return true
        if (direction === "down" && cardOffert.availability.roomsAvailable === 0) return true
        return false
    };

    const updateRoomsAvailable = (action) => {

        if (action === 'up') {
            if (cardOffert.availability.roomsAvailable < cardOffert.availability.capacity) {
                return 1;
            } else {
                return null
            };
        } else if (action === 'down') {
            if (cardOffert.availability.roomsAvailable > 0) {
                return -1;
            } else {
                return null
            };
        };
    };

    const deleteOffertHandeler = async () => {
        try {
            const res = await delete_offert(offert._id);

            if (!res.error) {
                fetchUserOfferts();
                fetchOfferts();
            };
        } catch (error) {
            console.log("deleteOffertHandeler error: ", error);
        };
    };


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (loading) {
            setLoading(!loading);
        };
    });


    /**************************{ Return }**************************/

    return (
        <section>
            < div className={`p-4 flex flex-col h-80 rounded-lg border border-subSectionThemeBorder shadow-inner transition duration-300 ease-in-out ${cardOffert.hidden ? "bg-sectionThemeDanger shadow-sectionDangerShadow" : "bg-subSectionThemeBackground shadow-sectionThemeShadow"}`} >

                <div>
                    <Link href={`/offerts/${cardOffert._id}`}>
                        <h3 className="font-bold h-fit line-clamp-1">{cardOffert.title}</h3>


                        <p className="text-sm text-grayFontThemeColor h-fit line-clamp-1">{cardOffert.location}</p>
                        <p className="text-sm text-grayFontThemeColor h-fit line-clamp-1">{cardOffert.address}</p>
                    </Link>

                    <p className="text-sm mt-2 h-fit line-clamp-5">{cardOffert.description}</p>
                </div>

                {sameUser &&
                    <div className="mt-auto">
                        <div className="flex items-center space-x-2 mt-3">
                            <button
                                className="w-fit h-fit"
                                onClick={() => changeRoomsAvailableHandler('up')}
                                disabled={disableChangeAvailability || disabledHandler("up")}
                            >
                                <i className={`ri-arrow-up-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("up") || disableChangeAvailability ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
                            </button>

                            <div className="w-fit min-w-12 text-center">
                                {disableChangeAvailability ?
                                    <LoadingSpinners />
                                    :
                                    <span className="font-bold">
                                        {cardOffert.availability.roomsAvailable}
                                        {' '}/{' '}
                                        {cardOffert.availability.capacity}
                                    </span>
                                }
                            </div>

                            <button
                                className="w-fit h-fit"
                                onClick={() => changeRoomsAvailableHandler('down')}
                                disabled={disableChangeAvailability || disabledHandler("down")}
                            >
                                <i className={`ri-arrow-down-circle-fill text-3xl transition duration-300 ease-in-out ${disabledHandler("down") || disableChangeAvailability ? "text-arrowDisableThemeColor" : "text-arrowThemeColor"}`}></i>
                            </button>

                            {cardOffert.hidden &&
                                <p className="text-sm my-auto font-bold">Esta oferta se encuentra oculta</p>
                            }

                        </div>

                        <div className="flex justify-between items-center mt-4">

                            <Link href={`/offerts/edit/${cardOffert._id}`} onClick={() => setEditLoading(true)} className="w-8 h-8 rounded bg-submitButtonColor hover:bg-submitButtonHoverColor transition duration-300 ease-in-out text-center flex items-center">
                                {editLoading ?
                                    <div className="p-2">
                                        <LoadingSpinners size={'very small'} />
                                    </div>
                                    :
                                    <i className="ri-edit-2-fill m-auto text-xl text-white"></i>
                                }
                            </Link>

                            <button className="w-8 h-8 bg-dangerButtonThemeColor rounded"
                                onClick={() => setDeletePopUp(!deletePopUp)}>
                                <i className="ri-delete-bin-2-fill text-xl text-white"></i>
                            </button>
                        </div>

                        <DeleteConfirm
                            text={offert.title}
                            trigger={deletePopUp}
                            setTrigger={setDeletePopUp}
                            deleteFunction={deleteOffertHandeler}
                        />

                    </div>
                }
            </div >
        </section>
    );
};