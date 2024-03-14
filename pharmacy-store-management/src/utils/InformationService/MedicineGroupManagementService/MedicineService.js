import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/medicine";


export const findAllMedicine = async () => {
    try {
        const result = await axios.get(REST_API_BASE_URL)
        return result.data
    } catch (e) {
        console.log(e)
    }
}