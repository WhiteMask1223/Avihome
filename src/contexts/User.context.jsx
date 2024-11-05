"use client"

import { createContext, useState, useEffect } from "react";

import { get_Session } from "@/api/auth.api";
import { get_UserByEmail } from "@/api/user.api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState(null);
    const [auth, setAuth] = useState(false);

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
                
                if (!userData) {

                    const email = session.user.email;

                    const fetchedUser = await fetchUserByEmail(email);

                    setUserData(fetchedUser);
                };

                setUserSession(session);
            }
        } catch (error) {
            console.error(error);
        };
    };

    const fetchUserByEmail = async (email) => {

        const user = await get_UserByEmail(JSON.stringify(email));

        return user.data
    };

    const logout = () => {
        setAuth(false);
        setUserData(null);
        setUserSession(null)     
    };

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