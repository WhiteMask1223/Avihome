import { 
    getOffertsCommentById_Service,
    saveOffertsComment_Service,
    deleteOffertsCommentById_Service
 } from "@/services/comment.service";


/**************************{ Read }**************************/

export const getOffertsCommentById_Controller = async (commentId) => {
    const comment = await getOffertsCommentById_Service(commentId);

    return comment;
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