import axios from "axios";

const url = '/offerts/api/'


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
    };
};

export const get_OffertById = async (offertId) => {
    try {
        const response = await axios.post(`${url}get-offert-by-id`, offertId);

        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Create }**************************/

export const save_Offert = async (data) => {
    try {
        const response = await axios.post(`${url}save-offert`, data);

        return response
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Update }**************************/

export const update_roomsAvailable = async (id, newAvailabilityValue) => {
    try {
        const response = await axios.put(`${url}update-rooms-available`, { id, newAvailabilityValue });

        return response.data
    } catch (error) {
        console.error(error)
    };
};

export const update_offert = async (id, newOffert) => {
    try {
        const response = await axios.put(`${url}update-offert`, { id, newOffert });

        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Delete }**************************/

export const delete_offert = async (id) => {
    try {
        const response = await axios.delete(`${url}delete-offert/${id}`);

        return response.data
    } catch (error) {
        console.error(error)
    };
};