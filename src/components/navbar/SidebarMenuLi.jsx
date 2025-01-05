'use client'

import Link from "next/link";

import { NAVBAR_STYLES } from "./navBarStyles";

export default function SidebarMenuLi({text, href, onClick}) {
    
    
    return (
        <li className={NAVBAR_STYLES.SIDEBAR_LI}>
            <Link href={href} className="text-lg sm:text-base" onClick={onClick}>
                {text}
            </Link>
        </li>
    );
};