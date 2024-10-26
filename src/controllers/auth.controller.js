import {
    getSession_Service 
} from "@/services/auth.service";

export const getSession_Controller = async () => {
    const res = await getSession_Service();

    return res
};