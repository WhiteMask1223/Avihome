import axios from "axios";

export const get_Session = async () => {
    const response = await axios.get('/login/api/session');
    return response.data
}

export const registerUser = async (data) => {
    const response = await axios.post('/signup/api/register', data);
    return response
}