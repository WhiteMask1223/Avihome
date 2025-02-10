import {
    getOffertsCommentById_Service,
    saveOffertsComment_Service,
    deleteOffertsCommentById_Service,
    getCommentById_Service
} from "@/services/comment.service";

import { updateOffert_Service } from "@/services/offerts.service";

import { getSession_Controller } from "./auth.controller";

import { saveLogEntrie_Service } from "@/services/log.service";
import { updateOffertStars } from "@/utils/commentsUtils";


/**************************{ Read }**************************/

export const getOffertsCommentById_Controller = async (offertId) => {
    try {
        const comments = await getOffertsCommentById_Service(offertId);

        return comments;
    } catch (error) {
        console.log("getOffertsCommentById_Controller error: ", error);
    };
};


/**************************{ Create }**************************/

export const saveOffertsComment_Controller = async (data) => {
    const res = await saveOffertsComment_Service(data);

    await updateOffertStars(data.offertId);
    
    const user = await getSession_Controller();

    await saveLogEntrie_Service({
        action: {
            actionId: "CREATE",
            actionText: "hizo el siguiente comentario:",
        },
        item: {
            _id: res.offertId,
            type: "COMMENT",
            name: `"${res.message}"`,
        },
        user: {
            _id: user.user.id,
            name: user.user.name
        }
    });

    return res;
};


/**************************{ Delete }**************************/

export const deleteOffertsCommentById_Controller = async (id) => {
    const deletedComment = await getCommentById_Service(id);
    
    const res = await deleteOffertsCommentById_Service(id);

    await updateOffertStars(deletedComment.offertId);

    const user = await getSession_Controller();

    await saveLogEntrie_Service({
        action: {
            actionId: "DELETE",
            actionText: "eliminó el siguiente comentario:",
        },
        item: {
            _id: deletedComment.offertId,
            type: "COMMENT",
            name: `"${deletedComment.message}" del ususario: "${deletedComment.userId.name}"`,
        },
        user: {
            _id: user.user.id,
            name: user.user.name
        }
    });

    return res;
};