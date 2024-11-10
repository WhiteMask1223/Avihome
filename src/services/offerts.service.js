import { offertsData, offertType, sortedLocationData } from '../utils/offertsUtils'; //TODO: DELETE ME
import OffertModel from '@/models/Offert.model';

/**************************{ Filter Data }**************************/

export const getOffertsLocationAndType_Service = async () => {
    const data = { offertType, sortedLocationData };

    return data;
};


/**************************{ MainPage }**************************/

export const getMainPageOfferts_Service = async () => {
    return offertsData;
};


/**************************{ Read }**************************/

export const getOffertsByUserId_Service = async (userId) => {
    try {
        const offerts = await OffertModel.find({ user: userId });
        console.log(offerts)
        //return offerts
    } catch (error) {
        console.log(error);
    }
};


/**************************{ Create, Update & Delete }**************************/

export const saveOffert_Service = async (data) => {

    try {
        const newOffert = new OffertModel(data);
        const savedOffert = await newOffert.save();

        return savedOffert
    } catch (error) {
        console.log(error);
    };
};