import { auth } from "../../auth";

const bcrypt = require('bcrypt');

const password = 'contrseña';
const saltRounds = 10;

export const getUserByEmail_Service = async () => {
    console.log('get user by email')
};

export const registerUser_Service = async (data) => {
    console.log("datos desde service: ", data, data.password);

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

    
};

export const getSession_Service = async () => {
    try {
        const session = await auth();

        if (!session) {
            return { authenticated: false };
        } else {
            return session;
        };
    } catch (error) {
        console.log(error);
    }
};