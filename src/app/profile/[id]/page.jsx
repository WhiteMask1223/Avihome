'use client'

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";

import { UserContext } from "@/contexts/User.context";
import { UtilityContex } from "@/contexts/Utility.context";

import { get_UserById } from "@/api/user.api";

import ProfileUserSecction from "@/components/profile/ProfileUserSecction";
import ProfileOffertsSecction from "@/components/profile/ProfileOffertsSecction";

export default function UserProfile() {

    const userId = useParams()

    const [user, setUser] = useState({});
    const [sameUser, setSameUser] = useState(false);

    const { userData } = useContext(UserContext);
    const { setLoading } = useContext(UtilityContex);

    const fetchUserData = async () => {
        if(!userData) {
            return
        };

        if (userData._id !== userId.id) {
            console.log('fetch user');
            const fetchedUser = await fetchUser(userId.id);
            
            setUser(fetchedUser);
        } else {
            setUser(userData);
            setSameUser(true);
        };
    };

    const fetchUser = async (id) => {
        console.log(id)
        const user = await get_UserById(id)
        console.log(user);
        return user
    }

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            fetchUserData();
            //setLoading(false)
        }; 
    });

    return (
        <section className="p-6 pt-24 min-h-screen flex flex-col items-center">

            <ProfileUserSecction user={user} sameUser={sameUser} />

            <ProfileOffertsSecction></ProfileOffertsSecction>

        </section>
    );
}