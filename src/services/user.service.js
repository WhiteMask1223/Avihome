import UserModel from '@/models/User.model';

const bcrypt = require('bcrypt');

const saltRounds = 10;

export const getUserById_Service = async (_id) => {
    try {
        const user = await UserModel.findOne({ _id });
        return user ? user : null
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

export const registerUser_Service = async (data) => {

    const registeredUser = await getUserByEmail_Service(data.email)

    if (registeredUser) return { error: true, message: "Correo electrónico ya registrado." }

    try {
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const user = new UserModel(data);
        await user.save();

        console.log('User post db save', user);

        return user
    } catch (error) {
        console.log(error);
        return { error: true, message: "Error interno" };
    };
};