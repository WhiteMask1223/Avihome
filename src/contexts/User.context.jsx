"use client"

import { createContext, useState, useEffect } from "react";

import { get_Session } from "@/api/auth.api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userSession, setUserSession] = useState(null)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (!userSession) {
            fetchSession();
        } 
    }, [auth]);

    const fetchSession = async () => {
        try {
            const session = await get_Session();
            if (session.authenticated === false) {
                return
            } else {
                setUserSession(session);
            }
        } catch (error) {
            console.error(error);
        };
    };

    const logout = () => {
        setAuth(false)
    }

    return (
        <UserContext.Provider value={{
            userSession,
            auth,

            setAuth,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
} 