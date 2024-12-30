import ModalSection from "./ModalSecction";

export default function ImageModal({ trigger, setTrigger, imgUrl, selectedImg }) {
    if (trigger) return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>

            <div className="w-fit h-fit m-auto inset-0 absolute z-40 mt-32">
                <img
                className=""
                    src={imgUrl[selectedImg].url || imgUrl[selectedImg]} alt="IMG"
                />
            </div>

        </ModalSection>
    );
};