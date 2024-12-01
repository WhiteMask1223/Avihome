import Button from "./Button"
import DangerButton from "./DangerButton"

export default function DeleteConfirm({ text, trigger, setTrigger, deleteFunction }) {

    if (trigger) return (
        <section onClick={() => setTrigger(!trigger)}>
            <div className="flex items-center justify-center fixed inset-0 z-30">
                <div className="w-full sm:max-w-md bg-sectionThemeBackground p-5 rounded-2xl shadow-lg">
                    <h2 className="font-bold text-lg">¿Seguro de querer borrar {text}?</h2>
                    <p className="mt-2">Se eliminará de forma permanente, no tendras manera alguna de recuperarlo.</p>

                    <div className="flex justify-between mt-2 space-x-5">
                        <DangerButton text={'Eliminar'} buttonFunction={deleteFunction}/>

                        <Button text={'Cancelar'} buttonFunction={() => setTrigger(!trigger)}/>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 bg-black opacity-50"/>
        </section>
    )
}