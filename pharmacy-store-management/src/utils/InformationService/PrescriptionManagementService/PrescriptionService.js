import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/details";

export const createDetailPrescription = async (detailPrescription) => {
    try {
        const result = await axios.post(REST_API_BASE_URL, detailPrescription)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const updateDetailPrescription = async (id, detailPrescription) => {
    try {
        const result = await axios.put("http://localhost:8080/api/v1/details/" + id, detailPrescription)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const findDetailPrescriptionById = async (id) => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/details/" + id)
        return result.data
        console.log(result.data)
    } catch (e) {
        console.log(e)
    }
}

export const findAll = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/details")
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
