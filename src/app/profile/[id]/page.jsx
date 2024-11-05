"use client"

import { useState, useEffect, useContext } from "react"
import { useParams } from "next/navigation";

import { UserContext } from "@/contexts/User.context"

import ProfileUserSecction from "@/components/profile/ProfileUserSecction";
import ProfileOffertsSecction from "@/components/profile/ProfileOffertsSecction";

export default function UserProfile() {

    const userId = useParams()

    const [user, setUser] = useState({});
    const [sameUser, setSameUser] = useState(false);
    const { userData } = useContext(UserContext);

    const setUserData = () => {

        if (userData._id !== userId.id) {
            console.log('fetch user');
        } else {
            setUser(userData);
            setSameUser(true);
        };
    };

    useEffect(() => {
        if (user == {}) {
            return
        };
        
        setUserData();
    });

    return (
        <section className="p-6 pt-24 bg-gray-100 min-h-screen flex flex-col items-center">

            <ProfileUserSecction user={user} sameUser={sameUser} />

            <ProfileOffertsSecction></ProfileOffertsSecction>

        </section>
    );
}