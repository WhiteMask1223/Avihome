import {
    registerUser_Service,
    getUserByEmail_Service, 
    getSession_Service 
} from "@/services/auth.service";

export const registerUser_Controller = async (data) => {
    const res = await registerUser_Service(data);

    return res
};

export const getUserByEmail_Controller = async () => {
    const res = await getUserByEmail_Service ();

    return res
};

export const getSession_Controller = async () => {
    const res = await getSession_Service();

    return res
};