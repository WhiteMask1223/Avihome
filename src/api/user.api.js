import axios from "axios";

export const get_UserById = async (data) => {
    const response = await axios.post('/login/api/get-user-by-id', data);
    return response.data
};

export const get_UserByEmail = async (data) => {
    const response = await axios.post('/login/api/get-user-by-email', data);
    return response
};

export const registerUser = async (data) => {
    const response = await axios.post('/signup/api/register', data);
    return response
};