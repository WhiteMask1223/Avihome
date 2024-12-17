"use client"

import { createContext, useState, useEffect } from "react";

import { get_Session } from "@/api/auth.api";
import { get_UserByEmail } from "@/api/user.api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    /**************************{ Declaraciones }**************************/

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState(null);
    const [auth, setAuth] = useState(false);


    /**************************{ Funciones }**************************/

    const fetchUserByEmail = async (email) => {
        try {
            const user = await get_UserByEmail(JSON.stringify(email));

            return user.data
        } catch (error) {
            console.error(error);
        };
    };
    
    const fetchSession = async () => {
        try {
            setUserSession(null);

            const session = await get_Session();

            if (session.authenticated === false) {
                setUserSession("No Session");
                return
            };

            const email = session.user.email;
            const fetchedUser = await fetchUserByEmail(email);

            setUserData(fetchedUser);
            setUserSession(session);

        } catch (error) {
            console.error(error);
        };
    };

    const logout = () => {
        setAuth(false);
        setUserData(null);
        setUserSession("No Session");
    };


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (userSession === null || userSession === "No Session") {
            fetchSession();
        };
    }, [auth]);


    /**************************{ Return }**************************/

    return (
        <UserContext.Provider value={{
            userSession,
            userData,
            auth,

            setAuth,
            setUserData,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
} 