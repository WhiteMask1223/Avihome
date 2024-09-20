import { useContext } from "react"

import { MainPageContext } from "@/contexts/MainPage.context"

export default function SearchBar({filterSidebar}) {

    const { handleSearchChange, clearSearchInput, searchTerm } = useContext(MainPageContext)

    return(
        <div className={`${filterSidebar ? "block sm:hidden mb-4" : "hidden sm:block"}`}>
            <div className="flex items-center">
                <input 
                    type="text"
                    placeholder="Buscar por Nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`px-4 py-2 h-10 shrink flex-initial rounded-tl-lg rounded-bl-lg focus:outline-none ${filterSidebar ? "w-full placeholder-gray-100 bg-elementThemeColor" : "w-56"}`}
                />
                <button 
                    onClick={clearSearchInput}
                    className={`px-4 py-1 h-10 rounded-tr-lg rounded-br-lg disabled ${filterSidebar ? "bg-elementThemeColor" : "bg-white"}`}
                    >
                    <i className={'ri-close-large-line text-gray-500 transition ease-in-out hover:text-black'}></i>
                </button>
            </div>
        </div>
    )
}