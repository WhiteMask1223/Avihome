import LocationsModel from "@/models/Locations.model";
import TypeModel from "@/models/Type.model";


/**************************{ Read }**************************/

export const getOffertsLocationAndType_Service = async () => {
    try {
        const locations = await LocationsModel.find().lean();
        const types = await TypeModel.find().lean();

        return { types, locations };
    } catch (error) {
        throw new Error('Error getOffertsLocationAndType_Service: ' + error.message);
    }
};