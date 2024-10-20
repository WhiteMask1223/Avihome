import { auth } from "../../auth"

export const getUserByEmail_Service = async () => {
    console.log('s')
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