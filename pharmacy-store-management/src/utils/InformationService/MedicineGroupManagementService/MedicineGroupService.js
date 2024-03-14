import axios from "axios";

export const getAllMedicineGroup = async ()=> {
    try {
        const data = await axios.get(`http://localhost:8080/api/v1/medicineGroup`);
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export const createNewMedicineGroup = async (medicineGroup) => {
    try {
        await axios.post(`http://localhost:8080/api/v1/medicineGroup`, medicineGroup);
    } catch (e) {
        console.log(e)
    }
}

export const updateMedicineGroupById = async (medicineGroup, id) => {
    try {
        await axios.put(`http://localhost:8080/api/v1/medicineGroup/${id}`, medicineGroup);
    } catch (e) {
        console.log(e)
    }
}

export const deleteMedicineGroup = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/v1/medicineGroup/${id}`)
    } catch (e) {
        console.log(e)
    }
}