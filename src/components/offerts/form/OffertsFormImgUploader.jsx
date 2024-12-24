"use client"

import { useState } from "react";
import imageCompression from "browser-image-compression";

import Asterisk from "@/components/UI/formElements/Asterisk";

export default function ImgUploader({ offertsFormData, setOffertsFormData, saving, setSaving }) {

    const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    }

    const handleFilesChange = async (event) => {

        setSaving(true);

        if (offertsFormData.images.length === 5) {
            console.log("limite")
            setSaving(false);
            return
        };

        let files = Array.from(event.target.files);

        if (!files) return;

        console.log(files.length)

        if (files.length >= 6) {
            console.log(files)
            setSaving(false);
            return
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
    };

    return (
        <div className="mt-5">
            <div className="flex justify-between">
                <div>
                    <label htmlFor="imgUploader" className="flex text-lg font-bold">
                        Imagenes de la Residencia <Asterisk />
                    </label>

                    <p className="text-grayFontThemeColor text-sm">Minimo 3 imágenes, maximo 5 imágenes</p>
                </div>
                <input
                    id="imgUploader"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFilesChange}
                    disabled={saving}
                    className={`${saving ? "file:bg-submitButtonDisabledColor file:cursor-wait" : "file:bg-submitButtonColor file:hover:bg-submitButtonHoverColor"} file:text-lg file:text-white file:p-2 file:font-bold file:rounded-lg file:sm:text-base file:py-2 file:px-4 file:transition file:duration-300 file:ease-in-out  file:focus:outline-none file:border-0`}
                />
            </div>

            <div className="flex justify-evenly gap-4 py-3">
                {offertsFormData.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-36 h-36 object-cover rounded-xl"
                    />
                ))}
            </div>


        </div>
    )
}

