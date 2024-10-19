import axios from "axios";

const url = "/login/api/user";

export const get_Session = async () => {
    const response = await axios.get(url);
    return response.data
}