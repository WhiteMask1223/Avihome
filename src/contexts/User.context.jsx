'use client'

import { createContext, useState, useEffect } from "react";

import { get_Session } from "@/api/auth.api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userSession, setUserSession] = useState(null)

    useEffect(() => {
        if (!userSession) {
            get_Session()
                .then((session) => {
                    if (session.authenticated == false) {
                        console.log('cancelando')
                        return
                    }
                    setUserSession(session);
                }).catch((error) => console.error(error));
        }
        console.log("sesion desde usercontext: ", userSession);
    }, [userSession]);

    return (
        <UserContext.Provider value={{

        }}>
            {children}
        </UserContext.Provider>
    )
} 