import { 
    getOffertsLocationAndType_Service,
    getMainPageOfferts_Service
} from "@/services/offerts.service";

/**************************{ Filter Data }**************************/

export const getOffertsLocationAndType_Controller = async () => {
    const res = await getOffertsLocationAndType_Service();

    return res
};


/**************************{ MainPage }**************************/

export const getMainPageOfferts_Controller = async () => {
    const res = await getMainPageOfferts_Service();
    
    return res
};