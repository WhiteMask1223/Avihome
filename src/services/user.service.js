import UserModel from '@/models/User.model';

const bcrypt = require('bcrypt');

const saltRounds = 10;

export const getUserByEmail_Service = async (email) => {
    const user = await UserModel.findOne({ email });
    return user ? user : null
};

export const registerUser_Service = async (data) => {

    const registeredUser = await getUserByEmail_Service(data.email)

    if (registeredUser) return { error: true, message: "Correo ya registrado"}

    try {
        bcrypt.hash(data.password, saltRounds, async (err, hash) => {
            if (err) throw err;

            data.password = hash;
            console.log(data);  

            const user = new UserModel(data);
            await user.save();

            
        });

        return true
    } catch (error) {
        console.log(error);
    };
};