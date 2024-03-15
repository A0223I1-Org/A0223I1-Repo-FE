import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/symptoms";


export const findAllSymptom = async () => {
    try {
        const result = await axios.get(REST_API_BASE_URL)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const createSymptom = async (symptom) => {
    try {
        const result = await axios.post(REST_API_BASE_URL, symptom)
        return result.data
    } catch (e) {
        console.log(e)
    }
}
