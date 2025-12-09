import axios from "axios"
import { BASE_URL } from "."

export const getStores = async () => {
    try {
        const response = await axios.get(BASE_URL + "/store/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addStore = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/store/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editStore = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/store/update/${payload.id}`, payload.store, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}