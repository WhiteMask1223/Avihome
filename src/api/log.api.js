import axios from "axios";

const url = '/admin/api/'


/**************************{ Read }**************************/

export const get_LogEntries = async () => {
    const response = await axios.get(`${url}get-log-entries`);

    return response.data
};

