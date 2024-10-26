import { users } from '@/utils/provisionalDB';

const bcrypt = require('bcrypt');

const saltRounds = 10;

export const registerUser_Service = async (data) => {
    console.log("datos desde service: ", data, data.password);

    try {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            if (err) throw err;
            console.log(`hash: ${hash}`)

            bcrypt.compare(data.password, hash, (err, result) => {
                if (result) {
                    console.log("Contraseña correcta");
                } else {
                    console.log("contraseña incorrecta")
                }
            })
        });

        return true
    } catch (error) {
        console.log(error);
    };
};

export const getUserByEmail_Service = async (email) => {
    console.log('get user by this email: ', email)
};