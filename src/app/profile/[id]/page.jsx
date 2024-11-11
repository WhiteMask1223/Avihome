'use client'

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";

import { UserContext } from "@/contexts/User.context";

import { get_UserById } from "@/api/user.api";
import { get_OffertsByUserId } from "@/api/offerts.api";

import ProfileUserSecction from "@/components/profile/ProfileUserSecction";
import ProfileOffertsSecction from "@/components/profile/ProfileOffertsSecction";
import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function UserProfile() {

    /**************************{ Declaraciones }**************************/

    const userId = useParams()

    const [ user, setUser ] = useState(null);
    const [ sameUser, setSameUser ] = useState(false);
    const [ userOfferts, setUserOfferts ] = useState([]);

    const { userData } = useContext(UserContext);


    /**************************{ Funciones }**************************/

    const fetchUserData = async () => {
        if (!userData) return


        if (userData._id !== userId.id) {

            const fetchedUser = await fetchUser(userId);

            setUser(fetchedUser);
        } else {
            setUser(userData);
            setSameUser(true);
        };
    };


    /**************************{ Fetch }**************************/

    const fetchUser = async (id) => {
        const user = await get_UserById(id)
        return user
    };

    const fetchOfferts = async () => {
        if (!userData) return
        
        try {
            const offerts = await get_OffertsByUserId(userId);

            if(!offerts.error) {
                setUserOfferts(offerts);
            };
            
        } catch (error) {
            console.error(error);
        }
    }


    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (!user) {
            fetchUserData();
        };

        if (!userOfferts.length) {
            fetchOfferts();
        };
    });

    if (!user && !userOfferts.length) {
        return <LoadingBg />
    };

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">

            <ProfileUserSecction user={user} sameUser={sameUser} />

            <ProfileOffertsSecction userOfferts={userOfferts} sameUser={sameUser}/>

        </section>
    );
}