import axios from "axios"
import { BASE_URL } from "./index"
export const dashboardCard = async () => {
    try {
        const response = await axios.get(BASE_URL + "/dashboard/cards", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}
export const topItems = async () => {
    try {
        const response = await axios.get(BASE_URL + "/dashboard/summary", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}