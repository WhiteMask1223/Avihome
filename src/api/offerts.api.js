import axios from "axios";

/**************************{ Filter Data }**************************/

export const get_OffertsLocationAndType = async () => {
    const response = await axios.get('/offerts/api/getLocationAndType');

    return response.data
};


/**************************{ Main Page }**************************/

export const get_MainPageOfferts = async () => {
    const response = await axios.get('/offerts/api/getOfferts');

    return response.data
};