"use client"

import { useContext } from "react";
import { usePathname } from 'next/navigation'

import { UtilityContex } from "@/contexts/Utility.context";

import HomeButton from "./HomeButton";
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
                    
                    <HomeButton isHomePage={isHomePage}/>

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

                    {isHomePage && (<SearchBar filterSidebar={false}/>)}

                    <NavSession/>
                    
                </div>
            </nav>

            <NavSessionSidebar/>

        </div>
    );
}