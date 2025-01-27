import axios from "axios";

const url = '/admin/api/'


/**************************{ Read }**************************/

export const get_OffertsLocationAndType = async () => {
    try {
        const response = await axios.get(`/offerts/api/get-location-and-type`);

        return response.data
    } catch (error) {
        console.error(error);
    }
};


/**************************{ Create }**************************/

export const save_location = async (data) => {
    try {
        const response = await axios.post(`${url}save-location`, data);

        return response
    } catch (error) {
        console.error(error)
    };
};

export const save_type = async (data) => {
    try {
        const response = await axios.post(`${url}save-type`, data);

        return response
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Update }**************************/

export const update_location = async (id, newData) => {
    try {
        const response = await axios.put(`${url}update-location`, { id, newData });

        return response.data
    } catch (error) {
        console.error(error)
    };
};

export const update_type = async (id, newData) => {
    try {
        const response = await axios.put(`${url}update-type`, { id, newData });

        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Delete }**************************/

export const delete_location = async (id) => {
    try {
        const response = await axios.delete(`${url}delete-location/${id}`);

        return response.data
    } catch (error) {
        console.error(error)
    };
};

export const delete_type = async (id) => {
    try {
        const response = await axios.delete(`${url}delete-type/${id}`);

        return response.data
    } catch (error) {
        console.error(error)
    };
};