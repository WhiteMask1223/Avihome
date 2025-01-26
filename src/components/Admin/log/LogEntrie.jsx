"use client"

import Link from "next/link";

export default function LogEntrie({ entrie }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    };
    

    return (
        <div>
            <p><strong>{formatDate(entrie.createdAt)} | <Link href={`/profile/${entrie.user._id}`}>{entrie.user.name}</Link></strong> {entrie.action}: {entrie.text}</p>
        </div>
    );
};