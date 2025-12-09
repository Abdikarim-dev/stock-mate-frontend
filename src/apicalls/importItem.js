import axios from "axios"
import { BASE_URL } from "."

export const getImportItems = async () => {
    try {
        const response = await axios.get(BASE_URL + "/import-item/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addImportItem = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/import-item/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editImportItem = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/import-item/update/${payload.id}`, payload.importItem, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}