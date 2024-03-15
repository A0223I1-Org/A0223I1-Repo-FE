import axios from "axios";
import {toast} from "react-toastify";


export const getAllphones = async ()=>{
    try{
        const result = await axios.get('http://localhost:8080/api/customer/listPhone')
        return result.data
    }catch (e){
        console.log(e)
        throw e
    }
}
export const getCustomerById = async (idCustomerEdit) =>{
    try{
        const result = await axios.get('http://localhost:8080/api/customer/getCustomerById/'+idCustomerEdit)
        console.log(result.data)
        return result.data
    }
    catch (e){
        console.log(e)
        throw e
    }
}


export const createCustomer = async (newCustomer) => {
    try {
        await axios.post('http://localhost:8080/api/customer/createCustomer', newCustomer)
    } catch (e) {
        console.log(e)
    }

}

export const updateCustomer = async (newCustomer) => {
    try {
        await axios.post('http://localhost:8080/api/customer/updateCustomer', newCustomer)
    } catch (e) {
        console.log(e)
    }
}
export const getAllCustomer = async () =>{
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/lists`)
        return result.data.content;
    }catch (e){
        console.log(e)
    }
}
export const findAllCustomer = async (sortOption, searchType, searchValue, page, size) => {
    try {
        // debugger
        const result = await axios.get(`http://localhost:8080/api/customer/list`, {
            params: {
                sortOption,
                searchType,
                searchValue,
                page,
                size
            }
        });
        return result.data.content;
    } catch (e) {
        // throw e;
        console.log(e)
    }
};

export const deleteCustomer = async (id) => {
    try {
        const result = await axios.delete(`http://localhost:8080/api/customer/` + id);
        toast.success("Đã xóa khách hàng thành công")
        return result.data.content;

    } catch (e) {
        toast.error(e.response.data)
        console.log(e)
        // throw e;
    }
};
export const detailCustomer = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/getCustomerById/` + id);
        return result.data;
    } catch (e) {
        toast.error(e.response.data)
        // throw e;
    }
};

export const seeInvoiceCustomer = async (customerId, startDate, endDate, startTime, endTime, page, size) => {
    try {
        const params = {
            id: customerId,
            startDay: startDate,
            endDay: endDate,
            startHour: startTime,
            endHour: endTime,
            page,
            size
        };

        const result = await axios.get(`http://localhost:8080/api/customer/getAllInvoiceCustomer`, { params });
        // console.log(result.data);
        return result.data.content;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const findAllCustomerIncludeDeleted = async () =>{
    try {
        const result2 = await axios.get(`http://localhost:8080/api/customer/lists`);
        console.log(result2.data);
        return result2.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
