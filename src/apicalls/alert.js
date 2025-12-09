import axios from "axios"
import { BASE_URL } from "./index"
export const getAlerts = async () => {
    try {
        const response = await axios.get(BASE_URL + "/alert/summary", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}