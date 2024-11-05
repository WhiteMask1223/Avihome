'use client'

import { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
} from "react";

import { MainPageContext } from "./MainPage.context";
import { UserContext } from "./User.context";

export const UtilityContex = createContext();

export const UtilityProvider = ({ children }) => {

    const { userSession } = useContext(UserContext);
    const { offertsData } = useContext(MainPageContext);

    const [sessionSidebar, setSessionSidebar] = useState(false);
    const [filterSidebar, setFilterSidebar] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (offertsData && loading === true) {
            setLoading(false);
        }
    });

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
            loading,

            toggleSessionSidebar,
            toggleFilterSidebar,
            setLoading
        }}>
            {children}
        </UtilityContex.Provider>
    )
}