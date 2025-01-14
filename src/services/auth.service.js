import { auth } from "../../auth";

export const getSession_Service = async () => {
    try {
        const session = await auth();

        if (!session) {
            return { authenticated: false };
        };

        return session;
       
    } catch (error) {
        console.log(error);
    };
};