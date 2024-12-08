import Link from "next/link";

import AppLogo from "../UI/utility/AppLogo";

export default function HomeButton({ isHomePage }) {
    return (
        <Link href="/" className={`text-white text-left px-4 py-2 ${isHomePage ? "hidden sm:inline" : ""}`}>
            <AppLogo fixedTheme={true}/>
        </Link>
    );
}