import {
    getOffertsLocationAndType_Service,
    getMainPageOfferts_Service,
    saveOffert_Service,
    getOffertsByUserId_Service,
    changeRoomsAvailable_Service
} from "@/services/offerts.service";

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


/**************************{ Create, Update & Delete }**************************/

export const saveOffert_Controller = async (formData) => {

    const offertData = {
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
            "Solo Hombres": formData.admits["Solo Hombres"],
            "Solo Mujeres": formData.admits["Solo Mujeres"],
            "Cualquiera": formData.admits.Cualquiera
        },

        user: formData.user
    };

    const res = await saveOffert_Service(offertData);

    return res;
};

export const changeRoomsAvailable_Controller = async ({ data, action }) => {
    try {
        console.log(data, action)
        const res = changeRoomsAvailable_Service(data, action)

        return res;
    } catch (error) {
        console.log(error)
    }
};