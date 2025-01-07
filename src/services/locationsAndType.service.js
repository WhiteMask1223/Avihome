import LocationsModel from "@/models/Locations.model";
import TypeModel from "@/models/Type.model";
import { offertsData, offertType, sortedLocationData } from '../utils/offertsUtils'; //TODO: DELETE ME


/**************************{ Read }**************************/

export const getOffertsLocation_Service = async () => {
    try {
        const locations = await LocationsModel.find().lean();

        return locations;
    } catch (error) {
        throw new Error('Error getOffertsLocationAndType_Service: ' + error.message);
    }
};

export const getOffertsTypes_Service = async () => {
    try {
        const types = await TypeModel.find().lean();

        return types;
    } catch (error) {
        throw new Error('Error getOffertsLocationAndType_Service: ' + error.message);
    }
};

/**************************{ Create }**************************/

export const saveOffertsLocation_Service = async (data) => {
    try {
        const newLocation = new LocationsModel(data);
        const savedLocation = await newLocation.save();

        return savedLocation;
    } catch (error) {
        console.log(error);
    };
};

export const saveOffertsType_Service = async (data) => {
    try {
        const newType = new TypeModel(data);
        const savedType = await newType.save();

        return savedType;
    } catch (error) {
        console.log(error);
    };
};


/**************************{ Update }**************************/

export const updateOffertsLocationById_Service = async (id, newData) => {
    console.log(id,  newData)

    return true;
};

export const updateOffertsTypeById_Service = async (id, newData) => {
    console.log(id,  newData)

    return true;
};


/**************************{ Delete }**************************/

export const deleteOffertsLocationById_Service = async (id) => {
    console.log(id)

    return true;
};

export const deleteOffertsTypeById_Service = async (id) => {
    console.log(id)

    return true;
};