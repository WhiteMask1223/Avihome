import { useContext } from "react"

import { MainPageContext } from "@/contexts/MainPage.context"

import { NAVBAR_STYLES } from "./navBarStyles"

export default function SearchBar({filterSidebar}) {

    const { handleSearchChange, clearSearchInput, searchTerm } = useContext(MainPageContext)

    const disableCondition = filterSidebar && (searchTerm === '')

    return(
        <div className={`${filterSidebar ? "block sm:hidden mb-4" : "hidden sm:block"}`}>
            <div className="flex items-center">
                <input 
                    id={ filterSidebar ? "asideSearchBar" : "searchBar"}
                    type="text"
                    placeholder="Buscar por Nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={NAVBAR_STYLES.SEARCH_INPUT(filterSidebar)}
                />
                <button 
                    onClick={clearSearchInput}
                    disabled={filterSidebar && (searchTerm === '')}
                    className={NAVBAR_STYLES.CLEAR_BUTTON(filterSidebar, disableCondition)}
                    >
                    <i className={NAVBAR_STYLES.BUTTON_ICON(filterSidebar, disableCondition)}></i>
                </button>
            </div>
        </div>
    )
}