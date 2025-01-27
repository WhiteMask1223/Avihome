import CommentModel from "@/models/Comment.model";




/**************************{ Read }**************************/

export const getOffertsCommentById_Service = async (offertId) => {
    try {
        const comments = await CommentModel.find({ offertId: offertId }).populate({ path: 'userId', select: 'name' }).lean();
        
        return comments;
    } catch (error) {
        throw new Error('Error getOffertsCommentAndType_Service: ' + error.message);
    }
};

export const getCommentById_Service = async (commentId) => {
    try {
        const comment = await CommentModel.findById(commentId).populate({ path: 'userId', select: 'name' }).lean();
        
        return comment;
    } catch (error) {
        throw new Error('Error getOffertsCommentAndType_Service: ' + error.message);
    }
};


/**************************{ Create }**************************/

export const saveOffertsComment_Service = async (data) => {
    try {
        const newComment = new CommentModel(data);
        const savedComment = await newComment.save();

        return savedComment;
    } catch (error) {
        throw new Error('Error saveOffertsComment_Service: ' + error.message);
    };
};


/**************************{ Delete }**************************/

export const deleteOffertsCommentById_Service = async (commentId) => {
    try {
        const result = await CommentModel.deleteOne({ _id: commentId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Comentario no Encontrada" }
        };

        return result
    } catch (error) {
        throw new Error('Error deleteOffertsCommentById_Service: ' + error.message);
    };
};