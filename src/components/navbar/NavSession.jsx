import { useContext } from "react";

import { UtilityContex } from "@/contexts/Utility.context";

export default function NavSession() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex);

    return(
        <div className="right-0 space-x-4 text-right">
            <button onClick={toggleSessionSidebar}>
                <i class={`ri-account-circle-fill text-6xl mr-2 text-white transition-all ${sessionSidebar? "text-[#13d6c3]" : ""}`}></i>
            </button>
        </div>
    );
}