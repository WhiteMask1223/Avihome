import { offertsData, offertType, sortedLocationData  } from '../utils/offertsUtils'; //TODO: DELETE ME

/**************************{ Filter Data }**************************/

export const getOffertsLocationAndType_Service = async () => {
    const data = { offertType, sortedLocationData };

    return data;
};


/**************************{ MainPage }**************************/

export const getMainPageOfferts_Service = async () => {
    return offertsData;
};