"use client"

import Link from "next/link";
import { useContext } from "react";
import { usePathname } from 'next/navigation'

import { UtilityContex } from "@/contexts/Utility.context";

import SearchBar from "@/components/navbar/SearchBar";
import NavSession from "./NavSession";
import NavSessionSidebar from "./NavSessionSidebar";

export default function NavBar() {

    const { toggleFilterSidebar } = useContext(UtilityContex)

    const pathname = usePathname();
    const isHomePage = pathname === '/'

    return(
        <div>
            <nav className="fixed h-[80px] top-0 left-0 w-screen bg-[#405453] z-50 p-1">
                <div className="w-full flex justify-between items-center p-1">
                    <Link href="/" className={`text-white text-left px-4 py-2 ${isHomePage ? "hidden sm:inline" : ""}`}>Home</Link>
                    {isHomePage && (
                        <button 
                        onClick={toggleFilterSidebar}
                        className="ml-2 inline sm:hidden text-4xl text-white"
                        >
                            <i class="ri-menu-fill"></i>
                        </button>
                    )}
                    {isHomePage && (<SearchBar filterSidebar={false}></SearchBar>)}
                    <NavSession></NavSession>
                </div>
            </nav>
            <NavSessionSidebar></NavSessionSidebar>
        </div>
    );
}