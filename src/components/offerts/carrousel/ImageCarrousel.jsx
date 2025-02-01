"use client"

import { useState, useEffect } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { usePrevNextButtons } from "./CarrouselButtons";
import { useDotButton } from "./CarrouselIndicator";
import ImageComponent from "./ImageComponent";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import DotButton from "./DotButton";
import ImageModal from "@/components/UI/utility/ImageModal";
import { IS_DEVELOPMENT } from "@/config";

export default function Carrousel({ offert, isEdit, isCreating, saving, deleteImg }) {

    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [triggerImgModal, setTriggerImgModal] = useState(false);
    const [images, setImages] = useState(IS_DEVELOPMENT && isEdit ? offert.localImages : offert.images)

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

    useEffect(() =>{
        const formImg = () => {
            if (isCreating) {
                return offert.images
            } else { 
                return offert.localImages
            } 
        };

        if(formImg() !== images) {  
            console.log("imgupdate");
            setImages(formImg());
        };  
    }, [offert]);

    return (
        <section className="embla overflow-hidden bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow my-4">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    { images?.map((img, idx) => (
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
                imgUrl={images}
                selectedImg={selectedIndex}
            />
        </section>
    );

};