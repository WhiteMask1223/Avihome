import { getOffertsLocationAndType_Service } from "@/services/locationsAndType.service";


/**************************{ Read }**************************/

export const getOffertsLocationAndType_Controller = async () => {
    const res = await getOffertsLocationAndType_Service();
    
    return res;
};