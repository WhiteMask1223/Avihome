import axios from "axios";

export const get_MainPageOfferts = async () => {
    const response = await axios.get('/offerts/api/getOfferts');

    return response.data
}