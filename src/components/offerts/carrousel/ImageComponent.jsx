"use client"

import { useState } from "react";

import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function ImageComponent({
    idx,
    img,
    offert,
    setTriggerImgModal,
    triggerImgModal,
    deleteImg,
    saving,
    isEdit
}) {

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_97.5%]  sm:mx-2 my-2 min-h-xl relative">
            <img
                src={img.url || img || offert.localImages[idx]}
                alt={`Imagen ${offert.title || idx}`}
                className={`w-full mx-auto h-96 object-cover sm:rounded-[10px] ${loading ? "opacity-0" : "opacity-100 cursor-pointer"}`}
                onClick={() => {
                    if (!loading) {
                        setTriggerImgModal(!triggerImgModal);
                    };
                }}
                onLoad={handleImageLoad}
            />

            {loading &&
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinners size={"large"}/>
                </div>
            }

            {isEdit &&
                <button
                    type="button"
                    onClick={() => deleteImg(idx)}
                    className="absolute top-1 right-2 bg-white rounded-full h-6 w-6 p-0 flex items-center place-content-center"
                    disabled={saving}
                >
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center">
                        <p className="w-fit h-fit text-white mx-auto text-xs font-bold">X</p>
                    </div>
                </button>
            }
        </div>
    );
};