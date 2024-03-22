import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/details";



export const findAll = async () => {
    try {
        const result = await axios.get(REST_API_BASE_URL)
        console.log(result.data)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const deletePrescription = async (id) => {
    try {
        const result = await axios.delete("http://localhost:8080/api/v1/details/" + id)
        return result.data
    } catch (e) {
        console.log(e)
    }
}
