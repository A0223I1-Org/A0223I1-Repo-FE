import axios from "axios";

export const findAllCustomer = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/list`);
        console.log(result.data.content);
        return result.data.content;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const deleteCustomer = async (id) => {
    // debugger;
    try {
        const result = await axios.delete(`http://localhost:8080/api/customer/`+id);
        console.log(result.data.content);
        return result.data.content;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
