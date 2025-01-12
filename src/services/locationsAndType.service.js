import LocationsModel from "@/models/Locations.model";
import TypeModel from "@/models/Type.model";


/**************************{ Read }**************************/

export const getOffertsLocation_Service = async () => {
    try {
        const locations = await LocationsModel.find().sort({ text: 1 }).lean();

        return locations;
    } catch (error) {
        throw new Error('Error getOffertsLocationAndType_Service: ' + error.message);
    }
};

export const getOffertsTypes_Service = async () => {
    try {
        const types = await TypeModel.find().sort({ text: 1 }).lean();

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

export const deleteOffertsLocationById_Service = async (locationId) => {
    try {
        const result = await LocationsModel.deleteOne({ _id: locationId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Localidad no Encontrada" }
        };

        return result
    } catch (error) {
        console.log(error);
    };
};

export const deleteOffertsTypeById_Service = async (typeId) => {
    try {
        const result = await TypeModel.deleteOne({ _id: typeId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Tipo no Encontrado" }
        };

        return result
    } catch (error) {
        console.log(error);
    };
};