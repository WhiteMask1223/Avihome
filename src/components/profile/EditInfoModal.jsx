import ModalSection from "../UI/utility/ModalSecction";

export default function EditInfoModal({ trigger, setTrigger }) {
    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50">edit info</div>
        </ModalSection>
    );
};