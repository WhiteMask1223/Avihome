import mongoose from "mongoose";
import { MONGODB_URI } from "@/config";

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
};

// Mantenemos la coneccion guardada en cache para evitar conecciones acumuladas

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}


//Coneccion a la DB

async function dbConnect() {

    //Devuelve coneccion existente si la hay
    if (cached.conn) {
        console.log("coneccion ya existente");
        return cached.conn;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            return mongoose;
        });
    };

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    };

    console.log("DB conectada en: ",MONGODB_URI);

    return cached.conn;
};

export default dbConnect;