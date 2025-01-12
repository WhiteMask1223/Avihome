"use client"

import { useState } from "react";

import LoadingSpinners from "./LoadingSpinners";

export default function DangerButton({ styles, text, buttonFunction, loader, ...props }) {

    const [deleting, setDeleting] = useState(false);

    return (
        <button
            type="button"
            onClick={() => {
                buttonFunction();
                setDeleting(true);
            }}
            disabled={deleting && loader}
            className={`${deleting && loader ? "bg-sectionThemeBackground cursor-wait" : "bg-[#ba0000] hover:bg-[#fa0707]"} text-lg text-white p-2 font-bold rounded-lg sm:text-base py-2 px-4 transition duration-300 ease-in-out focus:outline-none ${styles || ""}`}
            {...props}
        >
            {deleting && loader ? <LoadingSpinners /> : text}
        </button>
    );
};