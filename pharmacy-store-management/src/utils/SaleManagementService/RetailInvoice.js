import axios from 'axios';

export const findAllSymtom = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/retailSaleManagement/displaySymtom");
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findAllSymtom:", error);
        throw error; // Thêm dòng này để throw lỗi
    }
}

export const findAllCustomer = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/retailSaleManagement/displayCustomer");
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findAllCustomer:", error);
        throw error; // Thêm dòng này để throw lỗi
    }
}

export const findAllEmployee = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/retailSaleManagement/displayEmployee");
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findAllEmployee:", error);
        throw error; // Thêm dòng này để throw lỗi
    }
}

export const findAllMedicine = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/retailSaleManagement/displayMedicine");
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findAllMedicine:", error);
        throw error; // Thêm dòng này để throw lỗi
    }
}