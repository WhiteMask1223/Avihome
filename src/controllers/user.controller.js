import {
    registerUser_Service,
    getUserById_Service,
    getUserByEmail_Service,
    updateUserPassword_Service
} from "@/services/user.service";

const bcrypt = require('bcrypt');

/**************************{ Create }**************************/

export const registerUser_Controller = async (userData) => {
    
    const res = await registerUser_Service(userData);

    if (res.error) {
        return res
    };

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


/**************************{ Read }**************************/

export const getUserById_Controller = async (id) => {
    const res = await getUserById_Service(id);

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

export const getUserWithPasswordByEmail_Controller = async (email) => {
    const res = await getUserByEmail_Service(email);
      
    return res
};


/**************************{ Update }**************************/

export const updateUserPassword_Controller = async ( userId, data ) => {
    try {
        const user =  await getUserById_Service(userId);

        if (!await bcrypt.compare(data.oldPassword, user.password)) {
            return { error: true, status: 200, message: "La antigua contraseña es incorrecta." };
        };

        const res = await updateUserPassword_Service(userId, data);

        return res;
    } catch (error) {
        console.log(error)
    };
};