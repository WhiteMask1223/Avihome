import {
    registerUser_Service,
    getUserByEmail_Service
} from "@/services/user.service";

export const registerUser_Controller = async (userData) => {
    
    const res = await registerUser_Service(userData);

    const data = {
        name: res.name,
        email: res.email,
        contEmail: res.contEmail,
        phone: res.phone,
        role: res.role,
        active: res.active,
        _id: res._id,
    };
      
    return data
};

export const getUserByEmail_Controller = async (email) => {
    const res = await getUserByEmail_Service(email);

    return res
};