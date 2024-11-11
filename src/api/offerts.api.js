import axios from "axios";

const url = '/offerts/api/'

/**************************{ Filter Data }**************************/

export const get_OffertsLocationAndType = async () => {
    const response = await axios.get(`${url}getLocationAndType`);

    return response.data
};


/**************************{ Main Page }**************************/

export const get_MainPageOfferts = async () => {
    const response = await axios.get(`${url}getOfferts`);

    return response.data
};


/**************************{ Read }**************************/

export const get_OffertsByUserId = async (userId) => {
    try {
        const response = await axios.post(`${url}getOffertsByUserId`, userId);
        
        return response.data
    } catch (error) {
        console.error(error)
    }
};


/**************************{ Create, Update & Delete }**************************/

export const save_Offert = async (data) => {
    try {
        const response = await axios.post(`${url}saveOffert`, data);
        
        return response
    } catch (error) {
        console.error(error)
    }
};