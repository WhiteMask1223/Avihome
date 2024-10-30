import { getMainPageOfferts_Service } from "@/services/offerts.service";

export const getMainPageOfferts_Controller = async () => {
    const res = await getMainPageOfferts_Service();
    
    return res
};