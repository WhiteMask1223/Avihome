import useEmblaCarousel from "embla-carousel-react";

import { usePrevNextButtons } from "./CarrouselButtons";
import { useDotButton } from "./CarrouselIndicator";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import DotButton from "./DotButton";

export default function Carrousel({ offert }) {

    const [emblaRef, emblaApi] = useEmblaCarousel();

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
                        <div key={idx} className="embla__slide flex-[0_0_95%] mx-2 my-3">
                            <img
                                key={img.name}
                                src={img.url}
                                alt={`Imagen de ${offert.title}`}
                                className="w-full mx-auto h-80 object-cover rounded-[10px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls flex justify-between">
                <PrevButton buttonFunction={onPrevButtonClick} disabled={prevBtnDisabled} />
                <div>
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
        </section>
    );

};