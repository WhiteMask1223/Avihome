import Link from "next/link"

export default function ProfileOffertsCard({ _id, title, location, address, description, roomsAvailable, sameUser }) {
    return (
        <card>
            < div className="p-4 bg-subSectionThemeBackground rounded-lg border border-subSectionThemeBorder shadow-lg shadow-subSectionThemeShadow" >

                <Link href={`/offerts/${_id}`}>
                    <h3 className="font-bold">{title}</h3>
                </Link>

                <p className="text-sm text-grayFontThemeColor">{location}</p>
                <p className="text-sm text-grayFontThemeColor">{address}</p>
                <p className="text-sm mt-2">{description}</p>


                {sameUser &&
                    <div>
                        <div className="flex items-center space-x-2 mt-3">
                            <button className="w-fit h-fit">
                                <i className="ri-arrow-up-circle-fill text-3xl text-elementThemeColor"></i>
                            </button>

                            <span className="">{roomsAvailable}</span>

                            <button className="w-fit h-fit">
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
        </card>
    );
};