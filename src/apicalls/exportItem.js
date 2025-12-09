import axios from "axios"
import { BASE_URL } from "."

export const getExportItems = async () => {
    try {
        const response = await axios.get(BASE_URL + "/export-item/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const getQOH = async (payload) => {
    try {
        const response = await axios.get(BASE_URL + `/export-item/read/qoh?new_item_id=${payload.name}&store_id=${payload.store}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addExportItem = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/export-item/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editExportItem = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/export-item/update/${payload.id}`, payload.exportItem, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}