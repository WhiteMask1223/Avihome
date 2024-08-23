"use client"

import Link from "next/link";

import SearchBar from "./SearchBar";
import NavSession from "./NavSession";
import { usePathname } from 'next/navigation'

export default function NavBar() {

    const pathname = usePathname();
    const isHomePage = pathname === '/'

    return(
        <nav className="fixed top-0 left-0 w-full bg-[#405453] z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-white text-left px-4 py-2">Home</Link>
                {isHomePage && (<SearchBar></SearchBar>)}
                <NavSession></NavSession>
            </div>
        </nav>
    );
}