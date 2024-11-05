"use client"

import { useContext } from "react"
import { signOut } from "next-auth/react";

import { UtilityContex } from "@/contexts/Utility.context"
import { UserContext } from "@/contexts/User.context";

import SidebarMenuLi from "./SidebarMenuLi";

import { NAVBAR_STYLES } from "./navBarStyles";

export default function NavSessionSidebar() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex);
    const { userSession, userData, logout } = useContext(UserContext);

    return (
        <menu>
            <div
                className={NAVBAR_STYLES.SIDEBAR(sessionSidebar)}>
                <h1 className="text-2xl font-semibold mb-4">Menú de Sesión</h1>
                <ul>
                    {userSession === null ?
                        <div>
                            <SidebarMenuLi text={"Iniciar Sesión"} href={"/login"} onClick={toggleSessionSidebar}/>

                            <SidebarMenuLi text={"Registrarse"} href={"/signup"} onClick={toggleSessionSidebar}/>
                        </div>
                        :
                        <div>
                            <SidebarMenuLi text={"Perfil de Usuario"} href={`/profile/${userData?._id}`} onClick={toggleSessionSidebar}/>
                            
                            <li className={NAVBAR_STYLES.SIDEBAR_LI}>
                                <button className="text-lg sm:text-base" onClick={ async () => {
                                    await signOut();
                                    logout();
                                }}>Cerrar Sesión</button>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </menu>
    )
}