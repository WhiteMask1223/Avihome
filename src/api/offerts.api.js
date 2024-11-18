import axios from "axios";

const url = '/offerts/api/'

/**************************{ Filter Data }**************************/

export const get_OffertsLocationAndType = async () => {
    const response = await axios.get(`${url}get-location-and-type`);

    return response.data
};


/**************************{ Main Page }**************************/

export const get_MainPageOfferts = async () => {
    const response = await axios.get(`${url}get-offerts`);

    return response.data
};


/**************************{ Read }**************************/

export const get_OffertsByUserId = async (userId) => {
    try {
        const response = await axios.post(`${url}get-offerts-by-user-id`, userId);
        
        return response.data
    } catch (error) {
        console.error(error)
    }
};


/**************************{ Create, Update & Delete }**************************/

export const save_Offert = async (data) => {
    try {
        const response = await axios.post(`${url}save-offert`, data);
        
        return response
    } catch (error) {
        console.error(error)
    }
};

export const update_roomsAvailable = async ( data, action ) => {
    try {
        const response = await axios.put(`${url}change-rooms-available`, { data, action });
        
        return response.data
    } catch (error) {
        console.error(error)
    }
};