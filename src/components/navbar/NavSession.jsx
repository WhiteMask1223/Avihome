import { useContext } from "react";

import { UtilityContex } from "@/contexts/Utility.context";
import { UserContext } from "@/contexts/User.context";

export default function NavSession() {

    const { sessionSidebar, toggleSessionSidebar } = useContext(UtilityContex);
    const { userSession } = useContext(UserContext);

    return(
        <div className="right-0 space-x-4 flex text-right">
            <h2 className="m-auto text-white text-lg font-semibold">{userSession?.user.name}</h2>
            <button onClick={toggleSessionSidebar}>
                <i className={`ri-account-circle-fill text-5xl mr-2 transition-all sm:text-6xl ${sessionSidebar ? "text-[#13d6c3]" : "text-white"}`}></i>
            </button>
        </div>
    );
}