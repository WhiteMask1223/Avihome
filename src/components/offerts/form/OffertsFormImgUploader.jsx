"use client"

import imageCompression from "browser-image-compression";

import Asterisk from "@/components/UI/formElements/Asterisk";
import Carrousel from "../carrousel/ImageCarrousel";
import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function ImgUploader({
    offertsFormData,
    setOffertsFormData,
    saving,
    setSaving,
    formError,
    setFormError,
    isOffertEdit,
    isOffertCreate
}) {

    const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    }

    const handleFilesChange = async (event) => {
        try {
            setSaving(true);

            if (offertsFormData.images.length === 5 || offertsFormData.localImages?.length === 5) {
                setFormError([false, "Límite de imágenes alcanzado."])
                setSaving(false);
                return
            };

            let files = Array.from(event.target.files);

            if (!files || files.length === 0) {
                setSaving(false);
                return
            };

            if (files.length > 5) {
                files = files.splice(0, 5);
            };

            if (files.length + offertsFormData.images.length > 5) {
                files = files.splice(0, 5 - offertsFormData.images.length);
            };

            const fileReaders = files.map(async (file) => {

                const compresedFile = await imageCompression(file, compressionOptions)

                return new Promise((resolve, reject) => { //Base64
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(compresedFile);
                });
            });

            Promise.all(fileReaders)
                .then((selectedImages) => selectedImages.map((image) => {
                    setOffertsFormData(prevFormData => ({
                        ...prevFormData,
                        images: [...prevFormData.images, image],
                        ...(isOffertEdit && { localImages: [...prevFormData.localImages, image] })
                    }));
                    setSaving(false);
                }))
                .catch((err) => console.error("Error al leer las imágenes:", err));
        } catch (error) {
            console.log("handleFilesChange error: ", error);
            setSaving(true);
        }
    };


    const deleteImage = (id) => {
        const deleteElementFromArray = (id, field) => {
            let newArray = offertsFormData[field];

            newArray.splice(id, 1);

            setOffertsFormData(prevFormData => ({
                ...prevFormData,
                [field]: newArray
            }));
        };

        if (isOffertEdit) {
            deleteElementFromArray(id, "localImages");
        };

        deleteElementFromArray(id, "images");
    };

    return (
        <div className="mt-5">
            <div className="sm:flex justify-between mx-2">
                <div>
                    <h3 className="flex text-lg font-bold">
                        Imagenes de la Residencia <Asterisk />
                    </h3>

                    <p className="text-grayFontThemeColor text-sm">Minimo 3 imágenes, maximo 5 imágenes</p>
                </div>
                <div className="w-fit mt-5 sm:mt-0">
                    <label htmlFor="imgUploader" className={`${saving ? "bg-submitButtonDisabledColor cursor-wait" : offertsFormData.images.length >= 5 ? "bg-submitButtonDisabledColor" : "bg-submitButtonColor hover:bg-submitButtonHoverColor"} w-40 h-full text-lg text-white font-bold rounded-lg sm:text-base transition duration-300 ease-in-out  focus:outline-none border-0 flex items-center place-content-center`}>
                        {saving ? <LoadingSpinners /> : "Subir Imagen"}
                    </label>
                    <input
                        id="imgUploader"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFilesChange}
                        disabled={saving || offertsFormData.images.length >= 5}
                        className={"hidden"}
                    />
                </div>
            </div>

            {offertsFormData.images.length || offertsFormData.localImages?.length ? //TODO:DELETE ME
                <Carrousel
                    offert={offertsFormData}
                    isEdit={true}
                    deleteImg={deleteImage}
                    saving={saving}
                    isCreating={isOffertCreate}
                />
                :
                <div className="flex justify-center gap-4 py-3 h-80 bg-subSectionThemeBackground sm:rounded-[20px] shadow-inner shadow-sectionThemeShadow my-4" />
            }
        </div>
    );
};

