import UserModel from '@/models/User.model';

const bcrypt = require('bcrypt');

const saltRounds = 10;


/**************************{ Create }**************************/

export const registerUser_Service = async (data) => {

    const registeredUser = await getUserByEmail_Service(data.email)

    if (registeredUser) return { error: true, message: "Correo electrónico ya registrado." }

    try {
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const user = new UserModel(data);
        await user.save();

        return user
    } catch (error) {
        console.log(error);
        return { error: true, message: "Error interno" };
    };
};


/**************************{ Read }**************************/

export const getUserById_Service = async (_id) => {
    try {
        const user = await UserModel.findOne({ _id });

        return user ? user : null;
    } catch (error) {
        console.log(error);
        return { error: true, message: "Error interno" };
    }
};

export const getUserByEmail_Service = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user ? user : null
    } catch (error) {
        console.log(error);
        return { error: true, message: "Error interno" };
    }
};


/**************************{ Update }**************************/

export const updateUserPassword_Service = async (userId, data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.newPassword, saltRounds);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true, runVailidators: true }
        );

        if (!updatedUser) return { error: true, status: 404, message: "Usuario no encontrado." };

        return { error: false, status: 200 };
    } catch (error) {
        console.log(error)
    };
};


/**************************{ Delete }**************************/

export const deleteUserById_Service = async (userId) => {
    try {
        const result = await UserModel.deleteOne({ _id: userId });

        if (!result.deletedCount) {
            return { error: true, status: 404, message: "Usuario no Encontrado" }
        };

        return result
    } catch (error) {
        console.log(error);
    }
};