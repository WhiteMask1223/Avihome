import CreateLocationModal from "./CreateLocationModal";
import CreateTypeModal from "./CreateTypeModal";

export default function Tables({
    tittle,
    createModalTrigger,
    setCreateModalTrigger,
    addButtonText,

    TableData,
    isType
}) {
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
                        <th className="text-lg font-bold py-1 px-4">
                            Texto:
                        </th>

                        {isType ?
                            <th className="text-lg font-bold py-1 px-4">
                                Hab. Unica:
                            </th> : ""
                        }

                        <th className="text-lg font-bold py-1 px-4">
                            Aciones:
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(TableData).map((data, idx) => (
                        <tr key={idx}>
                            <th className="font-normal py-1 px-4 border-sectionThemeBackground border-t-2">
                                {data[1].text}
                            </th>

                            {isType ?
                                <th className="font-normal py-1 px-4 border-sectionThemeBackground border-t-2 border-l-2">
                                    {data[1].onlyOneRoom ? "True" : "False"}
                                </th> : ""
                            }

                            <th className="font-normal py-1 px-4 border-sectionThemeBackground border-collapse border-t-2 border-l-2">
                                <button
                                    type="button"
                                    className="bg-submitButtonColor hover:bg-submitButtonHoverColor text-lg text-white text-center px-2 font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none font-normal mx-2 font-normal mx-2"
                                >
                                    <i className="ri-edit-2-fill m-auto text-xl text-white"></i>
                                </button>

                                <button
                                    type="button"
                                    className="bg-[#ba0000] hover:bg-[#fa0707] text-lg text-white text-center px-2 font-bold rounded-lg sm:text-base transition duration-300 ease-in-out focus:outline-none font-normal mx-2"
                                >
                                    <i className="ri-delete-bin-2-fill text-xl text-white"></i>
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>

            {isType ?
                <CreateTypeModal trigger={createModalTrigger} setTrigger={setCreateModalTrigger} />
                :
                <CreateLocationModal trigger={createModalTrigger} setTrigger={setCreateModalTrigger} />
            }
        </div>
    );
};