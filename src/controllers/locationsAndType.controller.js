import {
    getOffertsLocation_Service,
    getOffertsTypes_Service,

    saveOffertsLocation_Service,
    saveOffertsType_Service,

    updateOffertsLocationById_Service,
    updateOffertsTypeById_Service,

    deleteOffertsLocationById_Service,
    deleteOffertsTypeById_Service
} from "@/services/locationsAndType.service";


/**************************{ Read }**************************/

export const getOffertsLocationAndType_Controller = async () => {
    const locations = await getOffertsLocation_Service();
    const types = await getOffertsTypes_Service();

    return { types, locations };
};


/**************************{ Create }**************************/

export const saveOffertsLocation_Controller = async (data) => {
    const res = await saveOffertsLocation_Service(data);

    return res;
};

export const saveOffertsType_Controller = async (data) => {
    const res = await saveOffertsType_Service(data);

    return res;
};


/**************************{ Update }**************************/

export const updateOffertsLocationById_Controller = async (id, newData) => {
    const res = await updateOffertsLocationById_Service(id);

    return res;
};

export const updateOffertsTypeById_Controller = async (id, newData) => {
    const res = await updateOffertsTypeById_Service(id);

    return res;
};


/**************************{ Delete }**************************/

export const deleteOffertsLocationById_Controller = async (id) => {
    const res = await deleteOffertsLocationById_Service(id);

    return res;
};

export const deleteOffertsTypeById_Controller = async (id) => {
    const res = await deleteOffertsTypeById_Service(id);

    return res;
};