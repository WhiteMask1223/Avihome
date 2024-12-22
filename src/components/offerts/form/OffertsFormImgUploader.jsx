"use client"

import { useState } from "react";

import Asterisk from "@/components/UI/formElements/Asterisk";

export default function ImgUploader({ offertsFormData, setOffertsFormData, isOffertEdit }) {

    const handleFilesChange = async (event) => {

        if (offertsFormData.images.length === 5) {
            console.log("limite")
            return
        }

        const files = Array.from(event.target.files);

        const fileReaders = files.map((file) => { //Base64
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then((selectedImages) => selectedImages.map((selectedImage) => setOffertsFormData(prevFormData => ({
                ...prevFormData,
                images: [...prevFormData.images, selectedImage]
            }))))
            .catch((err) => console.error("Error al leer las imágenes:", err));
            console.log(offertsFormData)
    };

    return (
        <div>
            <label htmlFor="imgUploader" className="flex text-lg font-bold">
                Imagenes de la Residencia <Asterisk />
            </label>

            <p className="text-grayFontThemeColor text-sm">Minimo 3 imágenes, maximo 5 imágenes</p>

            <div className="flex gap-4">
                {offertsFormData.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-32 h-32 object-cover"
                    />
                ))}
            </div>

            <input
                id="imgUploader"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
            />
        </div>
    )
}

