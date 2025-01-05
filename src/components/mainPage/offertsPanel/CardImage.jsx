"use client"

import { useState } from "react"

import LoadingSpinners from "@/components/UI/utility/LoadingSpinners"

export default function CardImage({ imageSrc }) {

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="relative h-full w-full">
            <img
                src={imageSrc}
                alt={'IMG'}
                className={`w-full h-full object-cover rounded-xl ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={handleImageLoad}
            />

            {loading &&
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinners size={"large"} />
                </div>
            }
        </div>
    )
}