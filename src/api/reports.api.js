import axios from "axios";

const url = '/admin/reports/api/'


/**************************{ Read }**************************/

export const get_reports = async () => {
    try {
        const response = await axios.get(`${url}get-reports`);

        return response.data
    } catch (error) {
        console.error(error);
    }
};


/**************************{ Create }**************************/

export const save_report = async (data) => {
    try {
        const response = await axios.post(`/offerts/api/save-report`, data);

        return response
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Delete }**************************/


export const delete_report = async (id) => {
    try {
        const response = await axios.delete(`${url}delete-report/${id}`);

        return response.data
    } catch (error) {
        console.error(error)
    };
};