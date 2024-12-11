import OffertsFormSelector from "./OffertsFormSelector";
import OffertsFormTextArea from "./OffertsFormTextArea";
import OffertsFormDropList from "./OffertsFormDropList";

import VariableInput from "@/components/UI/formElements/VariableInput";
import Asterisk from "@/components/UI/formElements/Asterisk";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import DangerButton from "@/components/UI/utility/DangerButton";

export default function OffertsForm({

    userData,

    //Objetos con la Data
    offertsFormData,
    setOffertsFormData,
    offertsType,
    offertsLocation,

    //Submit
    handleSubmit,

    //utility
    isOffertEdit,
    clearForm,
    formError,
    saving
}) {


    /**************************{ Funciones }**************************/

    const updateField = (field, newValue) => {
        if (!offertsFormData.user && userData) {
            setOffertsFormData(prevFormData => ({
                ...prevFormData,
                user: userData._id
            }));
        };

        if (field === "availability" && newValue < 0) return;

        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            [field]: newValue
        }));
    };

    const updateSubObj = (objKey, field, admits, value) => {

        if (admits) {
            setOffertsFormData((prevFormData) => ({
                ...prevFormData,
                admits: {
                    'Caballeros': field === 'Caballeros',
                    'Damas': field === 'Damas',
                    'Cualquiera': field === 'Cualquiera'
                }
            }))
            return
        }

        let newValue = value

        if (objKey === "availability" && newValue < 0) return


        if (objKey === "availability") newValue = Number(value);

        if (field === "capacity" && newValue < offertsFormData.availability.roomsAvailable) {
            updateSubObj('availability', 'roomsAvailable', false, offertsFormData.availability.roomsAvailable - 1)
        };

        if (field === "roomsAvailable" && newValue > offertsFormData.availability.capacity) return;

        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            [objKey]: {
                ...prevFormData[objKey],
                [field]: newValue
            }
        }));
    };

    /**************************{ Return }**************************/

    return (
        <form onSubmit={handleSubmit}>


            {/**************************{ Nombre de la oferta }**************************/}

            <h2 className="m-auto w-fit p-2 text-lg font-bold text-red-500 ">{formError[1]}</h2>

            <OffertsFormTextArea
                label={'Nombre de la Oferta:'}
                id={'title'}
                value={offertsFormData.title}
                handlerFunction={updateField}
                error={formError}
                textAreaSize={['40', '2']}
                placeholder={'Ingrese un nombre descriptivo.'}
            />


            {/**************************{ Tipo }**************************/}

            <div className="mt-5 sm:flex justify-between">
                <div>
                    <label htmlFor="offertType" className="flex text-lg font-bold">
                        Tipo de Residencia: <Asterisk />
                    </label>

                    <OffertsFormDropList
                        selectKey={'type'}
                        value={offertsFormData.type}
                        obj={offertsType}
                        handlerFunction={updateField}
                        error={formError}
                    />

                </div>


                {/**************************{ Disponibilidad }**************************/}

                {
                    isOffertEdit ?
                        <div>
                            <div>
                                <label htmlFor="roomsTotal" className="flex text-lg font-bold">
                                    Número de total habitaciones <Asterisk />
                                </label>
                                <VariableInput
                                    type={'number'}
                                    id={'availability'}
                                    value={offertsFormData.availability.capacity}
                                    autoComplete={"off"}
                                    error={formError[0]}
                                    onChange={(e) => updateSubObj('availability', 'capacity', false, e.target.value)}
                                    onKeyDown={(e) => e.preventDefault()}
                                />

                            </div>

                            <div>
                                <label htmlFor="rooms" className="flex text-lg font-bold">
                                    Número de habitaciones disponibles <Asterisk />
                                </label>
                                <VariableInput
                                    type={'number'}
                                    id={'availability'}
                                    value={offertsFormData.availability.roomsAvailable}
                                    autoComplete={"off"}
                                    error={formError[0]}
                                    onChange={(e) => updateSubObj('availability', 'roomsAvailable', false, e.target.value)}
                                    onKeyDown={(e) => e.preventDefault()}
                                />

                            </div>
                        </div>
                        :
                        <div>
                            <label htmlFor="rooms" className="flex text-lg font-bold">
                                Número de habitaciones <Asterisk />
                            </label>
                            <VariableInput
                                type={'number'}
                                id={'availability'}
                                value={offertsFormData.availability}
                                setStateFunction={updateField}
                                autoComplete={"off"}
                                error={formError[0]}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                        </div>
                }
            </div>


            {/**************************{ Direcciones }**************************/}

            <OffertsFormTextArea
                label={'Localidad y Dirección:'}
                id={'address'}
                value={offertsFormData.address}
                handlerFunction={updateField}
                error={formError}
                textAreaSize={['40', '2']}
                placeholder={'Especifique la dirección.'}
            >

                <OffertsFormDropList
                    selectKey={'location'}
                    value={offertsFormData.location}
                    obj={offertsLocation}
                    handlerFunction={updateField}
                    error={formError}
                />

            </OffertsFormTextArea>


            {/**************************{ Servicios }**************************/}

            <div className="mt-5">
                <label htmlFor="services" className="flex text-lg font-bold">
                    Servicios: <Asterisk />
                </label>

                <OffertsFormSelector
                    id={'services'}
                    offertsFormData={offertsFormData}
                    handlerFunction={updateSubObj}
                    admits={false}
                />

                <OffertsFormTextArea
                    label={'Especifique otros Servicios:'}
                    id={'otherServices'}
                    value={offertsFormData.otherServices}
                    handlerFunction={updateField}
                    error={formError}
                    textAreaSize={['40', '4']}
                    placeholder={'Ejemplos: Baños individuales, garaje, cocina, lavandería, entre otros.'}
                />

            </div>


            {/**************************{ Descripcion }**************************/}

            <OffertsFormTextArea
                label={'Descripción:'}
                id={'description'}
                value={offertsFormData.description}
                handlerFunction={updateField}
                error={formError}
                textAreaSize={['40', '4']}
                placeholder={'Describa la habitación (tamaño, mobiliario, etc.), defina reglas internas o cualquier información que considere relevante.'}
            />

            <div className="mt-5">
                <label htmlFor="services" className="flex text-lg font-bold">
                    Admite: <Asterisk />
                </label>

                <OffertsFormSelector
                    id={'admits'}
                    offertsFormData={offertsFormData}
                    handlerFunction={updateSubObj}
                    admits={true}
                />
            </div>

            <div className="mt-6 sm:flex justify-between">

                <DangerButton text={isOffertEdit ? "Revertir Cambios" : "Limpiar Formulario"} buttonFunction={clearForm} />

                <SubmitButton text={isOffertEdit ? "Actualizar Oferta" : "Crear Oferta"} disabled={saving} />

            </div>
        </form>
    );
};