import axios from "axios";


/**************************{ Get }**************************/

export const get_UserById = async (data) => {
    const response = await axios.post('/login/api/get-user-by-id', data);
    return response.data
};

export const get_UserByEmail = async (data) => {
    const response = await axios.post('/login/api/get-user-by-email', data);
    return response
};


/**************************{ Create }**************************/

export const registerUser = async (data) => {
    const response = await axios.post('/signup/api/register', data);
    return response.data
};


/**************************{ Update }**************************/

export const update_userPassword = async (id, data) => {
    try {
        const response = await axios.put('/profile/api/update-user-password', { id, data });
        
        return response.data
    } catch (error) {
        console.error(error)
    };
};

export const update_userInfo = async (id, data) => {
    try {
        const response = await axios.put('/profile/api/update-user-info', { id, data });
        
        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Delete }**************************/

export const delete_user = async (id) => {
    try {
        const response = await axios.delete(`/profile/api/delete-user/${id}`);
        
        return response.data
    } catch (error) {
        console.error(error)
    };
};
