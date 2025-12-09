import axios from "axios"
import { BASE_URL } from "."

export const getNewItems = async () => {
    try {
        const response = await axios.get(BASE_URL + "/new-item/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addNewItem = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/new-item/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editNewItem = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/new-item/update/${payload.id}`, payload.newItem, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}