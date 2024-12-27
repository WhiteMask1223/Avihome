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

    saveImageInCloudinary
} from "@/services/offerts.service";


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

    const imgUrls = await saveImageInCloudinary(formData.images);

    if (!Array.isArray(imgUrls)) {
        return { error: true, status: 408, message: "Tiempo de espera excedido." }
    };

    const offertData = {
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

    const res = await saveOffert_Service(offertData);

    return res;
};


/**************************{ Update }**************************/

export const changeRoomsAvailable_Controller = async ( offertId, newAvailabilityValue ) => {
    try {
        let updatedOffert = await changeRoomsAvailable_Service( offertId, newAvailabilityValue );

        if(!updatedOffert.error) {
            updatedOffert = await hiddenHandeler(offertId, updatedOffert);
        }

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};

export const updateOffert_Controller = async (offertId, newOffertData) => {
    try {
        let updatedOffert = await updateOffert_Service(offertId.id, newOffertData);

        updatedOffert = await hiddenHandeler(offertId.id, updatedOffert);

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};


/**************************{ Delete }**************************/

export const deleteOffertById_Controller = async (offertId) => {
    const res = await deleteOffertById_Service(offertId);

    return res;
};