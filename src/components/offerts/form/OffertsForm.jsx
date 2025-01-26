import ImgUploader from "./OffertsFormImgUploader";
import OffertsFormSelector from "./OffertsFormSelector";
import OffertsFormTextArea from "./OffertsFormTextArea";
import OffertsFormDropList from "./OffertsFormDropList";

import VariableInput from "@/components/UI/formElements/VariableInput";
import Asterisk from "@/components/UI/formElements/Asterisk";
import SubmitButton from "@/components/UI/formElements/SubmitButton";
import DangerButton from "@/components/UI/utility/DangerButton";
import NumberSelector from "./OffertsFormNumberSelector";

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
    setFormError,
    saving,
    setSaving
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

            <h2 className="m-auto w-fit p-2 text-lg font-bold text-red-500">{formError[1]}</h2>

            {/**************************{ Imagenes }**************************/}

            <ImgUploader
                offertsFormData={offertsFormData}
                setOffertsFormData={setOffertsFormData}
                saving={saving}
                setSaving={setSaving}
                formError={formError}
                setFormError={setFormError}
                isOffertEdit={isOffertEdit}
            />

            {/**************************{ Nombre de la oferta }**************************/}

            <div className="mx-2 my-2">
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
                            id={"offertType"}
                            selectKey={'type'}
                            value={offertsFormData.type}
                            obj={offertsType}
                            handlerFunction={updateField}
                            error={formError}
                            type={true}
                        />

                    </div>


                    {/**************************{ Disponibilidad }**************************/}

                    {
                        isOffertEdit ?
                            <div>
                                <div>
                                    <label htmlFor="availability" className="flex text-lg font-bold">
                                        Número de total habitaciones <Asterisk />
                                    </label>

                                    <NumberSelector
                                        objKey={'availability'}
                                        objSubKey={'capacity'}
                                        value={offertsFormData.availability.capacity}
                                        maxNumber={Infinity}
                                        setStateFunction={updateSubObj}
                                        typeValue={offertsFormData.type}
                                        typeArray={offertsType}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="rooms" className="flex text-lg font-bold">
                                        Número de habitaciones disponibles <Asterisk />
                                    </label>

                                    <NumberSelector
                                        objKey={'availability'}
                                        objSubKey={'roomsAvailable'}
                                        value={offertsFormData.availability.roomsAvailable}
                                        maxNumber={offertsFormData.availability.capacity}
                                        setStateFunction={updateSubObj}
                                        typeValue={offertsFormData.type}
                                        typeArray={offertsType}
                                    />

                                </div>
                            </div>
                            :
                            <div>
                                <label htmlFor="availability" className="flex text-lg font-bold">
                                    Número de habitaciones <Asterisk />
                                </label>

                                <NumberSelector
                                    objKey={'availability'}
                                    value={offertsFormData.availability}
                                    maxNumber={Infinity}
                                    setStateFunction={updateField}
                                    typeValue={offertsFormData.type}
                                    typeArray={offertsType}
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
                    <label htmlFor="admits" className="flex text-lg font-bold">
                        Admite: <Asterisk />
                    </label>

                    <OffertsFormSelector
                        id={'admits'}
                        offertsFormData={offertsFormData}
                        handlerFunction={updateSubObj}
                        admits={true}
                    />
                </div>

                <div className="mt-6 sm:flex justify-evenly">

                    <DangerButton styles={"w-full mt-5"} text={isOffertEdit ? "Revertir Cambios" : "Limpiar Formulario"} buttonFunction={clearForm} />

                    <SubmitButton styles={"w-full mt-5 sm:ml-5 py-2"} text={isOffertEdit ? "Actualizar Oferta" : "Crear Oferta"} disabled={saving} />

                </div>
            </div>
        </form>
    );
};