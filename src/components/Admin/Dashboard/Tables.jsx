"use client"

import { useState, useContext } from "react";

import { delete_location, delete_type } from "@/api/locationsAndTypes.api";

import { CategoryFilterContext } from "@/contexts/CategoryFilter.context";

import CreateLocationModal from "./CreateLocationModal";
import CreateTypeModal from "./CreateTypeModal";

import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function Tables({
    tittle,
    createModalTrigger,
    setCreateModalTrigger,
    addButtonText,

    TableData,
    isType,

    getLocationsAndType
}) {

    const [updating, setUpdating] = useState(false);

    const { locationAndTypeFetch } = useContext(CategoryFilterContext);

    const deleteItem = async (id) => {

        setUpdating(true);

        let result;

        if (isType) {
            result = await delete_type(id);
        } else {
            result = await delete_location(id);
        };

        if (!result.error) {
            getLocationsAndType();
            locationAndTypeFetch();
        };

        setUpdating(false);
    };


    return (
        <div className="w-2/5">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">{tittle}</h1>

                <button
                    type="button"
                    className="bg-submitButtonColor hover:bg-submitButtonHoverColor text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out  focus:outline-none"
                    onClick={() => setCreateModalTrigger(!createModalTrigger)}
                >
                    {addButtonText}
                </button>
            </div>

            <table className="table-auto w-full border-collapse mt-4 overflow-hidden bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow">
                <thead>
                    <tr>
                        <th className="text-lg font-bold py-1.5 px-4">
                            Texto:
                        </th>

                        {isType ?
                            <th className="text-lg font-bold py-1.5 px-4">
                                Hab. Unica:
                            </th> : ""
                        }

                        <th className="text-lg font-bold py-1.5 px-4">
                            Aciones:
                        </th>
                    </tr>
                </thead>

                <tbody>
                    { TableData.map((data, idx) => (
                        <tr key={idx}>
                            <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2">
                                {data.text}
                            </th>

                            {isType ?
                                <th className="font-normal py-1.5 px-4 border-sectionThemeBackground border-t-2 border-l-2">
                                    {data.onlyOneRoom ? "True" : "False"}
                                </th> : ""
                            }

                            <th className="font-normal py-1.5 px-1 border-sectionThemeBackground border-collapse border-t-2 border-l-2">
                                {/*<button
                                    type="button"
                                    className={` ${updating ? "bg-subSectionThemeBackground" : "bg-submitButtonColor hover:bg-submitButtonHoverColor"} text-lg text-white text-center px-2 font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none font-normal mx-1 font-normal`}
                                >
                                    {updating ?
                                        <LoadingSpinners />
                                        :
                                        <i className="ri-edit-2-fill m-auto text-xl text-white" />
                                    }
                                </button>*/}

                                <button
                                    type="button"
                                    className={`${updating ? "bg-subSectionThemeBackground" : "bg-[#ba0000] hover:bg-[#fa0707]"} text-lg text-white text-center px-2 font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none font-normal mx-1`}
                                    onClick={() => deleteItem(data._id)}
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

            {isType ?
                <CreateTypeModal
                    trigger={createModalTrigger}
                    setTrigger={setCreateModalTrigger}
                    getLocationsAndType={getLocationsAndType}
                    locationAndTypeFetch={locationAndTypeFetch}
                />
                :
                <CreateLocationModal
                    trigger={createModalTrigger}
                    setTrigger={setCreateModalTrigger}
                    getLocationsAndType={getLocationsAndType}
                    locationAndTypeFetch={locationAndTypeFetch}
                />
            }
        </div>
    );
};