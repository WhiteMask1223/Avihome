import { useContext } from "react"

import { MainPageContext } from "@/contexts/MainPage.context"

export default function SearchBar({filterSidebar}) {

    const { handleSearchChange, clearSearchInput, searchTerm } = useContext(MainPageContext)

    return(
        <div className={`${filterSidebar ? "inline sm:hidden" : "hidden sm:inline"}`}>
            <div className="flex items-center">
                <input 
                    type="text"
                    placeholder="Buscar por Nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 h-10 w-56 shrink flex-initial rounded-tl-lg rounded-bl-lg focus:outline-none"
                />
                <button 
                    onClick={clearSearchInput}
                    className={'text-white px-4 py-1 h-10 rounded-tr-lg rounded-br-lg bg-white disabled'}
                    >
                    <i className={'ri-close-large-line text-gray-500 transition ease-in-out hover:text-black'}></i>
                </button>
            </div>
        </div>
    )
}