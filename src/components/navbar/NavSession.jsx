import Link from "next/link";

import { useContext } from "react";

import { SidebarsContext } from "@/contexts/Sidebars.context";

export default function NavSession() {

    const { toggleSessionSidebar } = useContext(SidebarsContext);

    return(
        <div className="flex space-x-4 text-right">
            {/*<Link href="/login" className="text-white px-4 py-2">Iniciar Sesión</Link>*
            <Link href="/signin" className="bg-[#0FAB9F] text-white px-4 py-2 rounded-lg hover:bg-[#0B8D83]">Registrarse</Link>*/}   

            <button onClick={toggleSessionSidebar}>
                <i class="ri-account-circle-fill text-6xl mr-2 text-white"></i>
            </button>
        </div>
    );
}