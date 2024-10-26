import {
    registerUser_Service,
    getUserByEmail_Service
} from "@/services/user.service";

export const registerUser_Controller = async (userData) => {
    const res = await registerUser_Service(userData);

    return res
};

export const getUserByEmail_Controller = async (email) => {
    const res = await getUserByEmail_Service(email);

    return res
};