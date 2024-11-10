import {
    getOffertsLocationAndType_Service,
    getMainPageOfferts_Service,
    saveOffert_Service,
    getOffertsByUserId_Service
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
            agua: formData.services.Agua,
            aireAcondicionado: formData.services["Aire Acondicionado"],
            electricidad: formData.services.Electricidad,
            gas: formData.services.Gas,
            intrnet: formData.services.Internet
        },

        otherServices: formData.otherServices,

        availability: {
            capacity: formData.availability,
            roomsAvailable: formData.availability
        },

        admits: {
            onlyMen: formData.admits["Solo Hombres"],
            onlyWoman: formData.admits["Solo Mujeres"],
            any: formData.admits.Cualquiera
        },

        user: formData.user
    };

    const res = await saveOffert_Service(offertData);

    return res;
}