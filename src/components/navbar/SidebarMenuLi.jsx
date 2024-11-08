'use client'

import { useContext } from "react";
import Link from "next/link";

import { UtilityContex } from "@/contexts/Utility.context";

import { NAVBAR_STYLES } from "./navBarStyles";

export default function SidebarMenuLi({text, href, onClick}) {
    
    const { setLoading } = useContext(UtilityContex);
    
    return (
        <li className={NAVBAR_STYLES.SIDEBAR_LI}>
            <Link href={href} className="text-lg sm:text-base" onClick={() => {
                onClick()
                //setLoading(true);
            }}>
                {text}
            </Link>
        </li>
    );
};