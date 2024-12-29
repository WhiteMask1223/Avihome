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
    setFormError
}) {

    const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    }

    const handleFilesChange = async (event) => {

        setSaving(true);

        if (offertsFormData.images.length === 5) {
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

        const fileReaders = files.map(async (file) => { //Base64

            const compresedFile = await imageCompression(file, compressionOptions)

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(compresedFile);
            });
        });

        Promise.all(fileReaders)
            .then((selectedImages) => selectedImages.map((selectedImage) => {
                setOffertsFormData(prevFormData => ({
                    ...prevFormData,
                    images: [...prevFormData.images, selectedImage]
                }));

                setSaving(false);
            }))
            .catch((err) => console.error("Error al leer las imágenes:", err));

            console.log(offertsFormData)
    };


    const deleteImage = (id) => {
        let newArray = offertsFormData.images;

        newArray.splice(id, 1);

        setOffertsFormData(prevFormData => ({
            ...prevFormData,
            images: newArray
        }));
    };

    return (
        <div className="mt-5">
            <div className="flex justify-between">
                <div>
                    <h3 className="flex text-lg font-bold">
                        Imagenes de la Residencia <Asterisk />
                    </h3>

                    <p className="text-grayFontThemeColor text-sm">Minimo 3 imágenes, maximo 5 imágenes</p>
                </div>
                <label htmlFor="imgUploader" className={`${saving ? "bg-submitButtonDisabledColor cursor-wait" : offertsFormData.images.length >= 5 ? "bg-submitButtonDisabledColor" : "bg-submitButtonColor hover:bg-submitButtonHoverColor"} w-40 text-lg text-white font-bold rounded-lg sm:text-base transition duration-300 ease-in-out  focus:outline-none border-0 flex items-center place-content-center`}>
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

            {offertsFormData.images.length ?
                <Carrousel offert={offertsFormData} isEdit={true} deleteImg={deleteImage}/>
                :
                <div className="flex justify-center gap-4 py-3 h-80 bg-subSectionThemeBackground rounded-[20px] shadow-inner shadow-sectionThemeShadow my-4"/>
            } 
        </div>
    );
};

