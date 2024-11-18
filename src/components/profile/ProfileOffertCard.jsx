import Link from "next/link"

import { update_roomsAvailable } from "@/api/offerts.api";



export default function ProfileOffertsCard({ offert, sameUser }) {

    const changeRoomsAvailableHandler = async (action) => {
        await update_roomsAvailable(offert, action)
    };

    return (
        <section>
            < div className="p-4 bg-subSectionThemeBackground rounded-lg border border-subSectionThemeBorder shadow-lg shadow-subSectionThemeShadow" >

                <Link href={`/offerts/${offert._id}`}>
                    <h3 className="font-bold">{offert.title}</h3>
                </Link>

                <p className="text-sm text-grayFontThemeColor">{offert.location}</p>
                <p className="text-sm text-grayFontThemeColor">{offert.address}</p>
                <p className="text-sm mt-2">{offert.description}</p>


                {sameUser &&
                    <div>
                        <div className="flex items-center space-x-2 mt-3">
                            <button
                                className="w-fit h-fit"
                                onClick={() => changeRoomsAvailableHandler('up')}
                            >
                                <i className="ri-arrow-up-circle-fill text-3xl text-elementThemeColor"></i>
                            </button>

                            <span className="font-bold">{offert.availability.capacity}{' '}/{' '}{offert.availability.roomsAvailable}</span>

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