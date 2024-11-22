import { offertsData, offertType, sortedLocationData } from '../utils/offertsUtils'; //TODO: DELETE ME
import OffertModel from '@/models/Offert.model';


/**************************{ Read }**************************/

export const getOffertsByUserId_Service = async (userId) => {
    try {

        const offerts = await OffertModel.find({ user: userId });

        if (!offerts.length) {
            return { error: true, status: 404, message: "Este usuario no tiene Ofertas" }
        };

        return offerts;
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
        const offerts = await OffertModel.find().populate({ path: 'user', select: 'name email contEmail phone'});

        return offerts;
    } catch (error) {
        throw new Error('Error fetching Offerts: ' + error.message);
    }
};


/**************************{ Create & Delete }**************************/

export const saveOffert_Service = async (data) => {
    try {
        const newOffert = new OffertModel(data);
        const savedOffert = await newOffert.save();

        return savedOffert;
    } catch (error) {
        console.log(error);
    };
};


/**************************{ Update }**************************/

export const changeRoomsAvailable_Service = async ({ id, newAvailabilityValue }) => {
    try {
        let updatedOffert = await OffertModel.findByIdAndUpdate(
            id,
            { $inc: { "availability.roomsAvailable": newAvailabilityValue } },
            { new: true, runVailidators: true}
        );

        if (!updatedOffert) return { error: true, status: 404, message: "Oferta no encontrada."}

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};


export const hiddenOrShowOffert_Service = async (id, hiddenValue) => {
    try {
        const updatedOffert = await OffertModel.findByIdAndUpdate(
            id,
            { $set: { "hidden": hiddenValue } },
            { new: true, runVailidators: true}
        );

        if (!updatedOffert) return { error: true, status: 404, message: "Oferta no encontrada."}

        return updatedOffert;
    } catch (error) {
        console.log(error)
    }
}