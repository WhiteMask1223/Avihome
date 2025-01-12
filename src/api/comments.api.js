import axios from "axios";

const url = '/offerts/comments/api/'


/**************************{ Read }**************************/

export const get_CommentById = async (id) => {
    try {
        const response = await axios.post(`${url}get-comment-by-id`, id);

        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Create }**************************/

export const save_Comment = async (data) => {
    try {
        const response = await axios.post(`${url}save-comment`, data);

        return response.data
    } catch (error) {
        console.error(error)
    };
};


/**************************{ Delete }**************************/

export const delete_Comment = async (id) => {
    try {
        const response = await axios.delete(`${url}delete-comment/${id}`);

        return response.data
    } catch (error) {
        console.error(error)
    };
};