import ModalSection from "./ModalSecction";
import ReactImageMagnify from "react-image-magnify";

export default function ImageModal({ trigger, setTrigger, imgUrl, selectedImg }) {
    if (trigger) return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>

            <div className="w-fit h-fit m-auto inset-0 absolute z-40 mt-32">
                {/*<ReactImageMagnify 
                    {...{
                        smallImage: {
                            alt: 'Imagen Completa',
                            isFluidWidth: true,
                            src: imgUrl[selectedImg].url || imgUrl[selectedImg],
                        },
                        largeImage: {
                            src: imgUrl[selectedImg].url || imgUrl[selectedImg],
                            width: 1920,
                            height: 600,
                        },
                        enlargedImagePosition: 'over',
                    }}
                />*/}
                <img
                    className=""
                    src={imgUrl[selectedImg].url || imgUrl[selectedImg]} alt="IMG"
                />
                <button
                    type="button"
                    className="fixed top-24 right-2 w-8 h-8"
                    onClick={() => setTrigger(!trigger)}
                >
                    <i className="ri-close-large-line text-gl"></i>
                </button>
            </div>

        </ModalSection>
    );
};