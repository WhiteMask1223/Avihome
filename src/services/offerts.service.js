import { offertsData, offertType, sortedLocationData } from '../utils/offertsUtils'; //TODO: DELETE ME
import OffertModel from '@/models/Offert.model';
import cloudinary from '@/lib/cloudinary';

import { IS_DEVELOPMENT } from '@/config';


export const saveImageInCloudinary = async (images) => {
    try {
        if (!Array.isArray(images)) {
            return { error: true, status: 400, message: "Error del Cliente" }
        };

        const uploadResults = await Promise.all(
            images.map((image) => cloudinary.uploader.upload(image, {
                folder: "avihome/offerts",
            }))
        );

        const urls = uploadResults.map((result) => {
            return {
                name: result.display_name,
                public_id: result.public_id,
                url: result.secure_url
            }
        })

        return urls
    } catch (error) {
        console.log(error);
    }
};

export const eliminateCdnryImg = async (imgPublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imgPublicId);
        return result;
    } catch (error) {
        console.log(error);
    };
};


/**************************{ Read }**************************/

export const getOffertsByUserId_Service = async (userId) => {
    try {

        let offerts = [];

        if (IS_DEVELOPMENT) { //TODO: DELETE ME
            offerts = await OffertModel.find({ user: userId }, {
                localImages: 0,
            }).populate({ path: 'user', select: 'name email contEmail phone' }).lean();
        } else {
            offerts = await OffertModel.find({ user: userId }).populate({ path: 'user', select: 'name email contEmail phone' }).lean()
        };
        
        if (!offerts.length) {
            return { error: true, status: 404, message: "Este usuario no tiene Ofertas" }
        };

        return offerts;
    } catch (error) {
        console.log(error);
    }
};

export const getOffertById_Service = async (offertId) => {
    try {
        const offert = await OffertModel.findById(offertId).populate({ path: 'user', select: 'name email contEmail phone' }).lean();

        if (!offert) {
            return { error: true, status: 404, message: "Oferta no Encontrada" }
        };

        return offert;
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
        if (IS_DEVELOPMENT) { //TODO: DELETE ME

            const offerts = await OffertModel.find({}, {
                "localImages": { $slice: 1 },
            }).populate({ path: 'user', select: 'name email contEmail phone' }).lean();

            return offerts;

        } else {

            const offerts = await OffertModel.find().populate({ path: 'user', select: 'name email contEmail phone' }).lean();

            return offerts;

        };
    } catch (error) {
        throw new Error('Error fetching Offerts: ' + error.message);
    }
};


/**************************{ Create }**************************/

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

export const updateOffert_Service = async (id, newOffertData) => {
    try {
        const updatedOffert = await OffertModel.findByIdAndUpdate(
            id,
            newOffertData,
            { new: true, runVailidators: true }
        );

        if (!updatedOffert) return { error: true, status: 404, message: "Oferta no encontrada." }

        return updatedOffert;
    } catch (error) {
        console.log(error)
    };
};

export const changeRoomsAvailable_Service = async (id, newAvailabilityValue) => {
    try {
        const updatedOffert = await OffertModel.findByIdAndUpdate(
            id,
            { $inc: { "availability.roomsAvailable": newAvailabilityValue } },
            { new: true, runVailidators: true }
        );

        if (!updatedOffert) return { error: true, status: 404, message: "Oferta no encontrada." }

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
            { new: true, runVailidators: true }
        );

        if (!updatedOffert) return { error: true, status: 404, message: "Oferta no encontrada." }

        return updatedOffert;
    } catch (error) {
        console.log(error)
    }
};


/**************************{ Delete }**************************/

export const deleteOffertById_Service = async (offertId) => {
    try {
        const result = await OffertModel.deleteOne({ _id: offertId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Oferta no Encontrada" }
        };

        return result
    } catch (error) {
        console.log(error);
    }
};

export const deleteOffertsByUserId_Service = async (userId) => {
    try {
        const result = await OffertModel.deleteMany({ user: userId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Oferta no Encontrada" }
        };

        return result
    } catch (error) {
        console.log(error);
    }
};