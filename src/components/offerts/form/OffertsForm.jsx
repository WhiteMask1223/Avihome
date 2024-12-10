import OffertsFormCheckbox from "@/components/offerts/form/OffertsFormCheckbox";
import OffertsFormAdmits from "@/components/offerts/form/OffertsFormAdmits";

import VariableTextArea from "@/components/UI/formElements/VariableTextArea";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SelectOption from "@/components/UI/formElements/SelectOption";
import Asterisk from "@/components/UI/formElements/Asterisk";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import DangerButton from "@/components/UI/utility/DangerButton";

export default function OffertsForm({

    //Objetos con la Data
    offertsFormData,
    setOffertsFormData,
    offertsType,
    offertsLocation,

    //Funciones para actualizar el objeto
    updateSubObj,
    updateField,

    //Submit
    handleSubmit,

    //utility
    isOffertEdit,
    clearForm,
    formError,
    saving
}) {


    /**************************{ Return }**************************/

    return (
        <form onSubmit={handleSubmit}>

            {/**************************{ Nombre de la oferta }**************************/}

            <h2 className="m-auto w-fit p-2 text-lg font-bold text-red-500 ">{formError[1]}</h2>

            <div className="mt-5">
                <label htmlFor="tittle" className="flex text-lg font-bold">
                    Nombre de la Oferta: <Asterisk />
                </label>

                <VariableTextArea
                    id={'title'}
                    value={offertsFormData.title}
                    setStateFunction={updateField}
                    required
                    error={formError[0]}
                    cols={'40'}
                    rows={'2'}
                    placeholder={"Ingrese un nombre descriptivo."}
                />
            </div>


            {/**************************{ Tipo y Disponibilidad }**************************/}

            <div className="mt-5 sm:flex justify-between">
                <div>
                    <label htmlFor="repPassword" className="flex text-lg font-bold">
                        Tipo de Residencia: <Asterisk />
                    </label>

                    <select className={`h-10 px-2 rounded-md bg-elementThemeColor ${formError[0] ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`} value={offertsFormData.type} onChange={(e) => updateField('type', e.target.value)}>

                        <option value="" className="text-grayFontThemeColor" disabled>Seleccione una opción</option>

                        {Object.entries(offertsType).map(([key]) => (
                            <SelectOption key={key} value={key} text={key} />
                        ))}

                    </select>
                </div>
                <div>
                    <label htmlFor="tittle" className="flex text-lg font-bold">
                        Número de habitaciones <Asterisk />
                    </label>
                    <VariableInput
                        type={'number'}
                        id={'availability'}
                        value={offertsFormData.availability}
                        setStateFunction={updateField}
                        required
                        autoComplete={"off"}
                        error={formError[0]}
                        onKeyDown={(e) => e.preventDefault()}
                    />

                </div>
            </div>


            {/**************************{ Direcciones }**************************/}

            <div className="mt-5">
                <label htmlFor="address" className="flex text-lg font-bold">
                    Localidad y Dirección <Asterisk />
                </label>
                <div className="sm:flex justify-between">

                    <select className={`h-10 px-2 rounded-md bg-elementThemeColor ${formError[0] ? "ring-2 ring-red-500 focus:ring" : "focus:ring-[#10c4b6]"}`} value={offertsFormData.location} onChange={(e) => updateField('location', e.target.value)}>

                        <option value="" className="text-grayFontThemeColor" disabled>Seleccione una opción</option>

                        {Object.entries(offertsLocation).map(([key]) => (
                            <SelectOption key={key} value={key} text={key} />
                        ))}

                    </select>

                    <VariableTextArea
                        id={'address'}
                        value={offertsFormData.address}
                        setStateFunction={updateField}
                        required
                        error={formError[0]}
                        cols={'40'}
                        rows={'2'}
                        placeholder={"Ingrese una dirección más específica."}
                    />

                </div>

                {/**************************{ Servicios }**************************/}

                <div className="mt-5">
                    <label htmlFor="services" className="flex text-lg font-bold">
                        Servicios <Asterisk />
                    </label>

                    <OffertsFormCheckbox offertsFormData={offertsFormData} handlerFunction={updateSubObj} />

                    <div className="mt-5">
                        <label htmlFor="services" className="flex text-lg font-bold">
                            Especifique otros Servicios <Asterisk />
                        </label>

                        <VariableTextArea
                            id={'otherServices'}
                            value={offertsFormData.otherServices}
                            setStateFunction={updateField}
                            required
                            error={formError[0]}
                            cols={'10'}
                            rows={'3'}
                            placeholder={"Ejemplo: Baños individuales, garaje, cocina, lavanderia, entre otros."}
                        />
                    </div>

                </div>

                {/**************************{ Descripcion }**************************/}

                <div className="mt-5">
                    <label htmlFor="services" className="flex text-lg font-bold">
                        Descripción <Asterisk />
                    </label>

                    <VariableTextArea
                        id={'description'}
                        value={offertsFormData.description}
                        setStateFunction={updateField}
                        required
                        error={formError[0]}
                        cols={'10'}
                        rows={'3'}
                        placeholder={"Describa la habitación, defina reglas internas o cualquier información que considere relevante."}
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="services" className="flex text-lg font-bold">
                        Admite <Asterisk />
                    </label>

                    <OffertsFormAdmits offertsFormData={offertsFormData} setOffertsFormData={setOffertsFormData} />
                </div>

                <div className="mt-6 sm:flex justify-between">
                    
                    <DangerButton text={"Limpiar Formulario"} buttonFunction={clearForm}/>

                    <SubmitButton text={"Crear Oferta"} disabled={saving}/>
                    
                </div>
            </div>
        </form>
    );
};