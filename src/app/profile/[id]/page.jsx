'use client'

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import { get_UserById } from "@/api/user.api";
import { get_OffertsByUserId } from "@/api/offerts.api";

import ProfileUserSecction from "@/components/profile/ProfileUserSecction";
import ProfileOffertsSecction from "@/components/profile/ProfileOffertsSecction";
import LoadingBg from "@/components/UI/utility/LoadingBg";

export default function UserProfile() {

    /**************************{ Declaraciones }**************************/

    const userId = useParams()

    const [user, setUser] = useState(null);
    const [sameUser, setSameUser] = useState(false);
    const [userOfferts, setUserOfferts] = useState([]);
    const [ fetching, setFetching] = useState(false);

    const { userData } = useContext(UserContext);
    const { loading, setLoading } = useContext(UtilityContex)


    /**************************{ Funciones }**************************/

    const fetchUserData = async () => {
        try {
            if (!userData) return


            if (userData._id !== userId.id) {

                const fetchedUser = await fetchUser(userId);

                if (!fetchedUser.error) {
                    setUser(fetchedUser);
                };

                if (!fetchedUser.status == 404) {
                    setUser(404);
                };

                return
            };

            setUser(userData);
            setSameUser(true);
        } catch (error) {
            console.error("fetchUserData error: ", error);
        }
    };


    /**************************{ Fetch }**************************/

    const fetchUser = async (id) => {
        try {
            const user = await get_UserById(id)

            return user
        } catch (error) {
            console.error("fetchUser error: ", error);
        };
    };

    const fetchOfferts = async () => {
        if (!userData) return

        setFetching(true);

        try {
            const offerts = await get_OffertsByUserId(userId);
            
            if (offerts.error) {
                setUserOfferts([]);
                setFetching(false);
                return
            };

            setUserOfferts(offerts);
            setFetching(false);
        } catch (error) {
            console.error("fetchOfferts error: ", error);
        }
    };

    /**************************{ useEffects }**************************/

    useEffect(() => {
        if (!user) {
            fetchUserData();
        };

        if (!userOfferts.length) {
            fetchOfferts();
        };

        if (loading) {
            setLoading(!loading);
        };
    }, [userData, user, userOfferts]);


    /**************************{ Return }**************************/

    if (!user) {
        return <LoadingBg conditional={true} />
    };

    return (
        <section className="pt-24 sm:px-6 min-h-screen flex flex-col items-center">

            <ProfileUserSecction user={user} sameUser={sameUser} setUser={setUser}/>

            {user.role === "Admin" || user.role === "Root" ? "" :
                <ProfileOffertsSecction userOfferts={userOfferts} sameUser={sameUser} setUserOfferts={setUserOfferts} fetching={fetching} />
            }

        </section>
    );
}