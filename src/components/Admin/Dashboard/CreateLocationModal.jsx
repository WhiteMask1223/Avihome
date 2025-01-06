import ModalSection from "@/components/UI/utility/ModalSecction";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import Button from "@/components/UI/utility/Button";

export default function CreateLocationModal({ trigger, setTrigger }) {
    return (
        <ModalSection trigger={trigger} setTrigger={setTrigger}>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50 mt-32">

                <h1 className="m-auto w-fit p-2 text-2xl font-bold">Crear Localidad</h1>

                <h2 className="text-center font-bold text-red-500"></h2>

                <form>

                    <div className="mt-6">
                        <label htmlFor="location" className="font-bold">
                            Introduzca el nombre de la localidad:
                        </label>

                        <VariableInput
                            type={"text"}
                            id={"location"}
                            autoComplete={"off"}
                        />
                    </div>


                    <div className="flex justify-evenly mt-10">
                        <SubmitButton
                            text={"Crear"}
                            styles={'min-w-44'}
                        />

                        <Button
                            text={"Cancelar"}
                            buttonFunction={() => {
                                setTrigger(!trigger);
                            }}
                            styles={"py-2 px-4"}
                        />
                    </div>
                </form>
            </div>
        </ModalSection>
    );
};