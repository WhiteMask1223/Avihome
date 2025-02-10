import { updateOffert_Service, } from "@/services/offerts.service";
import { getOffertsCommentById_Service } from "@/services/comment.service";

export const updateOffertStars = async (offertId) => {
    const comments = await getOffertsCommentById_Service(offertId);

    if (comments.length) {
        const offertStars = comments.map((comment) => {
            return comment.stars
        });

        const sum = offertStars.reduce((totalStars, stars) => totalStars + stars, 0);

        const average = Math.round(sum / offertStars.length);

        await updateOffert_Service(offertId, { rating: average });
    } else {
        await updateOffert_Service(offertId, { rating: 0 });
    };
};