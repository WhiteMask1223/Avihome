import axios from "axios";

export const get_Session = async () => {
    const response = await axios.get('/login/api/session');
    return response.data
}