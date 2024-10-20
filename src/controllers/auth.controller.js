
import { 
    getUserByEmail_Service, 
    getSession_Service 
} from "@/services/auth.service"

export const getUserByEmail_Controller = async () => {
    const res = await getUserByEmail_Service ();

    return res
};

export const getSession_Controller = async () => {
    const res = await getSession_Service();

    return res
};