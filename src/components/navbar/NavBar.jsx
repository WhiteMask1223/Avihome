"use client"

import Link from "next/link";

import SearchBar from "@/components/navbar/SearchBar";
import NavSession from "./NavSession";
import { usePathname } from 'next/navigation'

export default function NavBar() {

    const pathname = usePathname();
    const isHomePage = pathname === '/'

    return(
        <nav className="fixed top-0 left-0 w-screen bg-[#405453] z-50 p-1">
            <div className="w-full flex justify-between items-center p-1">
                <Link href="/" className="text-white text-left px-4 py-2">Home</Link>
                {isHomePage && (<SearchBar></SearchBar>)}
                <NavSession></NavSession>
            </div>
        </nav>
    );
}