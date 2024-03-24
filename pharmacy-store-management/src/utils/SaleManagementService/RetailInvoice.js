import axios from 'axios';

export const createInvoice = async (formData) => {
    try {
      const result = await axios.post("http://localhost:8080/api/v1/retailSaleManagement/create", formData);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error("Error in createInvoice:", error);
      throw error; // Thêm dòng này để throw lỗi
    }
  }

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