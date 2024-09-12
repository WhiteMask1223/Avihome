import { createContext, useState } from "react";

export const SidebarsContext = createContext();

export const SidebarsProvider = ({children}) => {
    const [sessionSidebar, setSessionSidebar] = useState(false);

    const toggleSessionSidebar = () => {
        setSessionSidebar(!sessionSidebar);
      };

    return (
        <SidebarsContext.Provider value={{sessionSidebar, toggleSessionSidebar}}>
            {children}
        </SidebarsContext.Provider>
    )
}