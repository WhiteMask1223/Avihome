import Button from "./Button"
import DangerButton from "./DangerButton"

export default function DeleteConfirm({ text, otherText, trigger, setTrigger, deleteFunction }) {

    if (trigger) return (
        <section>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50">
                <h2 className="font-bold text-lg">¿Seguro de querer borrar {text}?</h2>
                <p className="mt-2">Se eliminará de forma permanente, no tendras manera alguna de recuperarlo. {otherText}</p>

                <div className="flex justify-evenly mt-5 space-x-5">
                    <DangerButton text={'Eliminar'} buttonFunction={deleteFunction} loader={true} />

                    <Button text={'Cancelar'} buttonFunction={() => setTrigger(!trigger)} />
                </div>
            </div>

            <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setTrigger(!trigger)} />
        </section>
    )
}