import { useContext } from "react";

import { UtilityContex } from "@/contexts/Utility.context";

export default function NavSession() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex);

    return(
        <div className="right-0 space-x-4 text-right">
            <button onClick={toggleSessionSidebar}>
                <i class={`ri-account-circle-fill text-5xl mr-2 transition-all sm:text-6xl ${sessionSidebar ? "text-[#13d6c3]" : "text-white"}`}></i>
            </button>
        </div>
    );
}