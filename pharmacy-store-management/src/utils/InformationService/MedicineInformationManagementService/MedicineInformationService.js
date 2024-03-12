import axios from "axios";

export const getAllMedicine = async () => {
    try {
        const data = await axios.get(`http://localhost:8080/api/v1/medicine`);
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteMedicine = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/v1/medicine/${id}`)
    } catch (e) {
        console.log(e)
    }
}