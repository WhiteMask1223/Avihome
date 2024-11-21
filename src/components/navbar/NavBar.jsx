"use client"

import Link from "next/link";
import { useContext } from "react";
import { usePathname } from 'next/navigation'

import { UtilityContex } from "@/contexts/Utility.context";

import SearchBar from "@/components/navbar/SearchBar";
import NavSession from "./NavSession";
import NavSessionSidebar from "./NavSessionSidebar";

import { NAVBAR_STYLES } from "./navBarStyles";

export default function NavBar() {

    const { filterSidebar, toggleFilterSidebar } = useContext(UtilityContex)

    const pathname = usePathname();
    const isHomePage = pathname === '/'

    return(
        <div>
            <nav className={NAVBAR_STYLES.GENERAL}>
                <div className="w-full flex justify-between items-center p-1">
                    <a href="/" className={`text-white text-left px-4 py-2 ${isHomePage ? "hidden sm:inline" : ""}`}>Home</a>
                    {isHomePage && (
                        <button 
                        onClick={toggleFilterSidebar}
                        className="ml-2 inline sm:hidden text-4xl text-white">
                            {filterSidebar ? (
                            <i className="ri-menu-2-line text-[#13d6c3]"></i>
                            ) : (
                            <i className="ri-menu-fill"></i>
                            )}
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