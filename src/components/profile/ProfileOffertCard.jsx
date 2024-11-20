import { useState } from "react";
import Link from "next/link"

import { update_roomsAvailable } from "@/api/offerts.api";

export default function ProfileOffertsCard({ offert, sameUser }) {

    const [ cardOffert, setCardOffert ] = useState(offert);

    const changeRoomsAvailableHandler = async (action) => {

        const newAvailabilityValue = updateRoomsAvailable(action);

        if (!newAvailabilityValue) return;
        
        try {
            const newOffert = await update_roomsAvailable(cardOffert._id, newAvailabilityValue);

            if (!newOffert.error) {
                setCardOffert(newOffert);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const updateRoomsAvailable = (action) => {
    
        if (action === 'up') {
            if (cardOffert.availability.roomsAvailable < cardOffert.availability.capacity) {
                return 1;
            } else {
                console.log("roomsAvailable ya está al maximo. No se puede subir más.");
                return null
            };
        } else if (action === 'down') {
            if (cardOffert.availability.roomsAvailable > 0) {
                return -1;
            } else {
                console.log("roomsAvailable ya está en 0. No se puede reducir más.");
                return null
            };
        };
    };

    return (
        <section>
            < div className="p-4 bg-subSectionThemeBackground rounded-lg border border-subSectionThemeBorder shadow-lg shadow-subSectionThemeShadow" >

                <Link href={`/offerts/${cardOffert._id}`}>
                    <h3 className="font-bold">{cardOffert.title}</h3>
                </Link>

                <p className="text-sm text-grayFontThemeColor">{cardOffert.location}</p>
                <p className="text-sm text-grayFontThemeColor">{cardOffert.address}</p>
                <p className="text-sm mt-2">{cardOffert.description}</p>


                {sameUser &&
                    <div>
                        <div className="flex items-center space-x-2 mt-3">
                            <button
                                className="w-fit h-fit"
                                onClick={() => changeRoomsAvailableHandler('up')}
                            >
                                <i className="ri-arrow-up-circle-fill text-3xl text-elementThemeColor"></i>
                            </button>

                            <span className="font-bold">{cardOffert.availability.capacity}{' '}/{' '}{cardOffert.availability.roomsAvailable}</span>

                            <button 
                                className="w-fit h-fit"
                                onClick={() => changeRoomsAvailableHandler('down')}
                            >
                                <i className="ri-arrow-down-circle-fill text-3xl text-elementThemeColor"></i>
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">

                            <button className="w-8 h-8 rounded bg-submitButtonColor hover:bg-submitButtonHoverColor transition duration-300 ease-in-out">
                                <i className="ri-edit-2-fill text-xl text-white"></i>
                            </button>

                            <button className="w-8 h-8 bg-dangerButtonThemeColor rounded">
                                <i className="ri-delete-bin-2-fill text-xl text-white"></i>
                            </button>
                        </div>
                    </div>
                }
            </div >
        </section>
    );
};