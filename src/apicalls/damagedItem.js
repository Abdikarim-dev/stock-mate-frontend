import axios from "axios"
import { BASE_URL } from "."

export const getDamagedItems = async () => {
    try {
        const response = await axios.get(BASE_URL + "/damaged-item/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addDamagedItem = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/damaged-item/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editDamagedItem = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/damaged-item/update/${payload.id}`, payload.damagedItem, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}