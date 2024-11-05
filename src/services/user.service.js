import UserModel from '@/models/User.model';

const bcrypt = require('bcrypt');

const saltRounds = 10;

export const getUserById_Service = async (_id) => {
    const user = await UserModel.findOne({ _id });
    return user ? user : null
};

export const getUserByEmail_Service = async (email) => {
    const user = await UserModel.findOne({ email });
    return user ? user : null
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
        return { error: true, message: "Error interno" }
    };
};