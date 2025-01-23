import {
    getOffertsCommentById_Service,
    saveOffertsComment_Service,
    deleteOffertsCommentById_Service
} from "@/services/comment.service";

import { updateOffert_Service } from "@/services/offerts.service";


/**************************{ Read }**************************/

export const getOffertsCommentById_Controller = async (offertId) => {
    try {
        const comment = await getOffertsCommentById_Service(offertId);

        if (comment.length) {
            const offertStars = comment.map((comment) => {
                return comment.stars
            });
    
            const sum = offertStars.reduce((totalStars, stars) => totalStars + stars, 0);
    
            const average = Math.round(sum / offertStars.length);
    
            await updateOffert_Service(offertId, { rating: average })
        };

        return comment;
    } catch (error) {
        console.log("getOffertsCommentById_Controller error: ", error);
    };
};


/**************************{ Create }**************************/

export const saveOffertsComment_Controller = async (data) => {
    const res = await saveOffertsComment_Service(data);

    return res;
};


/**************************{ Delete }**************************/

export const deleteOffertsCommentById_Controller = async (id) => {
    const res = await deleteOffertsCommentById_Service(id);

    return res;
};