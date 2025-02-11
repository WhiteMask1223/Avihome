import {
    registerUser_Service,
    getUserById_Service,
    getUserByEmail_Service,
    getAdmins_Service,
    getAllUsers_Service,
    updateUserPassword_Service,
    updateUserInfo_Service,
    deleteUserById_Service,
} from "@/services/user.service";

import { deleteOffertsByUserId_Service } from "@/services/offerts.service";
import { deleteOffertsCommentByUserId_Controller } from "./comment.controller";

import { saveLogEntrie_Service } from "@/services/log.service";

import { getSession_Controller } from "./auth.controller";

const bcrypt = require('bcrypt');

import { validateEmail } from "@/validations/user.validation";

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

    await saveLogEntrie_Service({
        action: {
            actionId: "CREATE",
            actionText: "Se ha registrado en el sistema exitosamente",
        },
        item: {
            _id: res._id,
            type: "USER",
            name: "",
        },
        user: {
            _id: res._id,
            name: res.name
        }
    });

    return data
};


/**************************{ Read }**************************/

export const getTotalUsers_Controller = async () => {
    try {
        const res = await getAllUsers_Service();

        const data = res.length;
    
        return data;
    } catch (error) {
        console.log("getTotalUsers_Controller: ", error);
        return { error: true, status: 500, message: "Error interno" };
    };
};


export const getAdmins_Controller = async () => {
    try {
        const res = await getAdmins_Service();

        let data = [];

        if (!res.length) {
            return data
        };

        res.map((admin) => {
            data.push({
                name: admin.name,
                email: admin.email,
                contEmail: admin.contEmail,
                phone: admin.phone,
                role: admin.role,
                active: admin.active,
                _id: admin._id,
            });
        });

        return data;
    } catch (error) {
        console.log("getAdmins_Controller: ", error);
        return { error: true, status: 500, message: "Error interno" };
    };
};

export const getUserById_Controller = async (id) => {
    try {
        const res = await getUserById_Service(id);

        if (!res) return { error: true, status: 404, message: "Ususario no Encontrado" };

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
    } catch (error) {
        console.log("getUserById_Controller: ", error);
        return { error: true, status: 500, message: "Error interno" }
    };
};

export const getUserByEmail_Controller = async (email) => {
    try {
        if (!validateEmail(email)) return { error: true, status: 200, message: "Ingrese un formato de e-mail válido." };

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
    } catch (error) {
        console.log(error)
    }
};

export const getUserWithPasswordByEmail_Controller = async (email) => {
    const res = await getUserByEmail_Service(email);

    return res
};


/**************************{ Update }**************************/

export const updateUserPassword_Controller = async (userId, data) => {
    try {
        const user = await getUserById_Service(userId);

        if (!await bcrypt.compare(data.oldPassword, user.password)) {
            return { error: true, status: 200, message: "La antigua contraseña es incorrecta." };
        };

        const res = await updateUserPassword_Service(userId, data);

        return res;
    } catch (error) {
        console.log(error)
    };
};

export const updateUserInfo_Controller = async (userId, data) => {
    try {
        const res = await updateUserInfo_Service(userId, data);

        const userData = await getSession_Controller();

        if (res.name !== userData.user.name) {

            await saveLogEntrie_Service({
                action: {
                    actionId: "UPDATE",
                    actionText: "actualizó su usuario, cambiando su nombre a:",
                },
                item: {
                    _id: res._id,
                    type: "USER",
                    name: `"${res.name}"`,
                },
                user: {
                    _id: res._id,
                    name: userData.user.name
                }
            });

        } else {
            await saveLogEntrie_Service({
                action: {
                    actionId: "UPDATE",
                    actionText: "actualizó su usuario",
                },
                item: {
                    _id: res._id,
                    type: "USER",
                    name: "",
                },
                user: {
                    _id: res._id,
                    name: res.name
                }
            });
        };

        return res;
    } catch (error) {
        console.log(error)
    };
};



/**************************{ Delete }**************************/

export const deleteUserById_Controller = async (userId) => {
    try {
        const userData = await getSession_Controller();

        const deleteOffertsResponse = await deleteOffertsByUserId_Service(userId);
        const deletedCommentsResponse = await deleteOffertsCommentByUserId_Controller(userId);

        if (!deleteOffertsResponse.error && !deletedCommentsResponse.error) {
            const userDeleted = await getUserById_Controller(userId);

            const res = await deleteUserById_Service(userId);

            if (userId !== userData.user.id) {
                await saveLogEntrie_Service({
                    action: {
                        actionId: "DELETE",
                        actionText: "eliminó al usuario de nombre",
                    },
                    item: {
                        _id: userDeleted._id,
                        type: "USER",
                        name: `"${userDeleted.name}", junto con todas sus ofertas`,
                    },
                    user: {
                        _id: userData.user.id,
                        name: userData.user.name
                    }
                });
            } else {
                await saveLogEntrie_Service({
                    action: {
                        actionId: "DELETE",
                        actionText: "eliminó su usuario y todas sus ofertas del sistema.",
                    },
                    item: {
                        _id: userDeleted._id,
                        type: "USER",
                        name: "",
                    },
                    user: {
                        _id: userDeleted._id,
                        name: userDeleted.name
                    }
                });
            };

            return res;
        };
    } catch (error) {
        console.log(error);
    };
};