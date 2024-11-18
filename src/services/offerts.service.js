import { offertsData, offertType, sortedLocationData } from '../utils/offertsUtils'; //TODO: DELETE ME
import OffertModel from '@/models/Offert.model';


/**************************{ Read }**************************/

export const getOffertsByUserId_Service = async (userId) => {
    try {

        const offerts = await OffertModel.find({ user: userId });

        if (!offerts.length) {
            return { error: true, status: 404, message: "Este usuario no tiene Ofertas" }
        };

        return offerts
    } catch (error) {
        console.log(error);
    }
};


/*                         { Filter Data }                         */

export const getOffertsLocationAndType_Service = async () => {
    const data = { offertType, sortedLocationData };

    return data;
};


/*                         { MainPage }                         */

export const getMainPageOfferts_Service = async () => {
    try {
        const offerts = await OffertModel.find().populate('user');


        console.log(offerts)
        return offerts
    } catch (error) {
        throw new Error('Error fetching Offerts: ' + error.message);
    }
    //return offertsData;
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

export const changeRoomsAvailable_Service = async () => {
    try {
        
    } catch (error) {
        console.log(error)
    }
};