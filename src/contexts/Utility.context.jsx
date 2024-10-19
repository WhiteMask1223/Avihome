'use client'

import { createContext, useState } from "react";

export const UtilityContex = createContext();

export const UtilityProvider = ({children}) => {
    const [sessionSidebar, setSessionSidebar] = useState(false);
    const [filterSidebar, setFilterSidebar] = useState(false);

    const toggleSessionSidebar = () => {
        setSessionSidebar(!sessionSidebar);
        setFilterSidebar(false);
    };

    const toggleFilterSidebar = () => {
        setFilterSidebar(!filterSidebar);
        setSessionSidebar(false);
    };

    return (
        <UtilityContex.Provider value={{
            sessionSidebar, 
            filterSidebar,

            toggleSessionSidebar,
            toggleFilterSidebar
        }}>
            {children}
        </UtilityContex.Provider>
    )
}