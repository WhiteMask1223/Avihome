import axios from "axios";

const url = "/login/api/";

export const get_Session = async () => {
    const response = await axios.get(`${url}session`);
    return response.data
}