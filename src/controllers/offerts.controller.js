import {
    saveOffert_Service,
    getOffertById_Service,
    getOffertsByUserId_Service,
    getOffertsLocationAndType_Service,
    getMainPageOfferts_Service,
    updateOffert_Service,
    changeRoomsAvailable_Service,
    hiddenOrShowOffert_Service,
    deleteOffertById_Service,

    saveImageInCloudinary,
    eliminateCdnryImg
} from "@/services/offerts.service";

import { IS_DEVELOPMENT } from "@/config"; //TODO: DELTE ME


/**************************{ Funciones Mixtas }**************************/

const hiddenHandeler = async (id, updatedOffert) => {
    if (updatedOffert.availability.roomsAvailable === 0) {
        updatedOffert = await hiddenOrShowOffert_Service(id, !updatedOffert.hidden);
    };

    if (
        updatedOffert.availability.roomsAvailable > 0 &&
        updatedOffert.hidden === true
    ) {
        updatedOffert = await hiddenOrShowOffert_Service(id, !updatedOffert.hidden);
    };

    return updatedOffert;
};

/**************************{ Filter Data }**************************/

export const getOffertsLocationAndType_Controller = async () => {
    const res = await getOffertsLocationAndType_Service();

    return res;
};


/**************************{ MainPage }**************************/

export const getMainPageOfferts_Controller = async () => {
    const res = await getMainPageOfferts_Service();

    return res;
};


/**************************{ Read }**************************/

export const getOffertsByUserId_Controller = async (userId) => {
    const res = await getOffertsByUserId_Service(userId);

    return res;
};

export const getOffertById_Controller = async (offertId) => {
    const res = await getOffertById_Service(offertId);

    return res;
};


/**************************{ Create }**************************/

export const saveOffert_Controller = async (formData) => {

    if (formData.images.length < 3) {
        return { error: true, status: 400, message: "Error del Cliente" }
    }

    const imgUrls = await saveImageInCloudinary(formData.images);

    if (!Array.isArray(imgUrls)) {
        return { error: true, status: 408, message: "Tiempo de espera excedido." }
    };

    let offertData = {};

    if (IS_DEVELOPMENT) { //TODO: DELTE ME
        offertData = {
            images: imgUrls,
    
            localImages: formData.images,
    
            title: formData.title,
            type: formData.type,
    
            location: formData.location,
            address: formData.address,
    
            description: formData.description,
    
            services: {
                "Agua": formData.services.Agua,
                "Aire Acondicionado": formData.services["Aire Acondicionado"],
                "Electricidad": formData.services.Electricidad,
                "Gas": formData.services.Gas,
                "Internet": formData.services.Internet
            },
    
            otherServices: formData.otherServices,
    
            availability: {
                capacity: formData.availability,
                roomsAvailable: formData.availability
            },
    
            admits: {
                Caballeros: formData.admits.Caballeros,
                Damas: formData.admits.Damas,
                Cualquiera: formData.admits.Cualquiera
            },
    
            user: formData.user
        };
    } else {
        offertData = {
            images: imgUrls,
    
            title: formData.title,
            type: formData.type,
    
            location: formData.location,
            address: formData.address,
    
            description: formData.description,
    
            services: {
                "Agua": formData.services.Agua,
                "Aire Acondicionado": formData.services["Aire Acondicionado"],
                "Electricidad": formData.services.Electricidad,
                "Gas": formData.services.Gas,
                "Internet": formData.services.Internet
            },
    
            otherServices: formData.otherServices,
    
            availability: {
                capacity: formData.availability,
                roomsAvailable: formData.availability
            },
    
            admits: {
                Caballeros: formData.admits.Caballeros,
                Damas: formData.admits.Damas,
                Cualquiera: formData.admits.Cualquiera
            },
    
            user: formData.user
        };
    };

    const res = await saveOffert_Service(offertData);

    return res;
};


/**************************{ Update }**************************/

export const changeRoomsAvailable_Controller = async (offertId, newAvailabilityValue) => {
    try {
        let updatedOffert = await changeRoomsAvailable_Service(offertId, newAvailabilityValue);

        if (!updatedOffert.error) {
            updatedOffert = await hiddenHandeler(offertId, updatedOffert);
        }

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};

export const updateOffert_Controller = async (offertId, newOffertData) => {
    try {

        const originalOffertData = await getOffertById_Controller(offertId.id);

        if (newOffertData.images.length < 3) {
            return { error: true, status: 400, message: "Error del Cliente" }
        }

        let toUploadImageArray = [];

        let alredyUploadedImg = [];

        let oldImgToDelete = originalOffertData.images;

        newOffertData.images.map((img) => {
            if (img.name) {
                alredyUploadedImg.push(img);
                return
            };
            toUploadImageArray.push(img);
        });

        oldImgToDelete.map((oldImg) => {
            const toDelete = alredyUploadedImg.map((alredyInDBImg) => {

                if (oldImg.name === alredyInDBImg.name) return false;

                return true;
            });

            if (toDelete) {
                eliminateCdnryImg(oldImg.public_id);
            };
        })

        if (toUploadImageArray.length) {
            const imgUrls = await saveImageInCloudinary(toUploadImageArray);

            if (!Array.isArray(imgUrls)) {
                return { error: true, status: 408, message: "Tiempo de espera excedido." }
            };

            imgUrls.map((cdnryImg) => alredyUploadedImg.push(cdnryImg))

            newOffertData.images = alredyUploadedImg
        };

        let updatedOffert = await updateOffert_Service(offertId.id, newOffertData);

        updatedOffert = await hiddenHandeler(offertId.id, updatedOffert);

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};


/**************************{ Delete }**************************/

export const deleteOffertById_Controller = async (offertId) => {

    const offert = await getOffertById_Service(offertId);

    offert.images.map((image) => eliminateCdnryImg(image.public_id));

    const res = await deleteOffertById_Service(offertId);

    return res;
};