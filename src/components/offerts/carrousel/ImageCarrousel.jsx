"use client"

import { useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { usePrevNextButtons } from "./CarrouselButtons";
import { useDotButton } from "./CarrouselIndicator";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import DotButton from "./DotButton";
import ImageModal from "@/components/UI/utility/ImageModal";

import { IS_LOCAL } from "@/config";

export default function Carrousel({ offert, isEdit, saving, deleteImg }) {

    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [triggerImgModal, setTriggerImgModal] = useState(false);
    const [base64Img, setBase64Img] = useState(offert.localImages)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    } = useDotButton(emblaApi);

    return (
        <section className="embla overflow-hidden bg-subSectionThemeBackground rounded-[20px] shadow-inner shadow-sectionThemeShadow my-4">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    {offert.images.map((img, idx) => (
                        <div key={idx} className="embla__slide flex-[0_0_95%] mx-2 my-3 relative">
                            <img
                                key={img.name || idx}
                                src={img.url || img || base64Img[idx]}
                                alt={`Imagen ${offert.title || idx}`}
                                className="w-full mx-auto h-80 object-cover rounded-[10px] cursor-pointer"
                                onClick={() => setTriggerImgModal(!triggerImgModal)}
                            />

                            {isEdit &&
                                <button
                                    type="button"
                                    onClick={() => deleteImg(idx)}
                                    className="absolute top-1 right-2 bg-white rounded-full h-6 w-6 p-0 flex items-center place-content-center"
                                    disabled={saving}
                                >
                                    <i className="ri-close-circle-fill text-2xl text-red-600 hover:text-red-500 duration-300 ease-in-out focus:outline-none shadow-lg"></i>
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls flex justify-between">
                <PrevButton buttonFunction={onPrevButtonClick} disabled={prevBtnDisabled} />
                <div className="m-auto">
                    {scrollSnaps.map((_, idx) => (
                        <DotButton
                            key={idx}
                            buttonFunction={() => onDotButtonClick(idx)}
                            index={idx}
                            selectedIndex={selectedIndex}
                        />
                    ))}
                </div>
                <NextButton buttonFunction={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

            <ImageModal
                trigger={triggerImgModal}
                setTrigger={setTriggerImgModal}
                imgUrl={offert.images}
                selectedImg={selectedIndex}
            />

        </section>
    );

};