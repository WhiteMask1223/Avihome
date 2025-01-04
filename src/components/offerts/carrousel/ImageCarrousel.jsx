"use client"

import { useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { usePrevNextButtons } from "./CarrouselButtons";
import { useDotButton } from "./CarrouselIndicator";
import ImageComponent from "./ImageComponent";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import DotButton from "./DotButton";
import ImageModal from "@/components/UI/utility/ImageModal";

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
        <section className="embla overflow-hidden bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow my-4">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    {offert.images.map((img, idx) => (
                        <ImageComponent
                            key={idx}
                            idx={idx}
                            img={img}
                            offert={offert}
                            triggerImgModal={triggerImgModal}
                            setTriggerImgModal={setTriggerImgModal}
                            deleteImg={deleteImg}
                            isEdit={isEdit}
                            saving={saving}
                        />
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