import axios from "axios";

export const searchCustomer = async (searchType, searchValue) => {
    try{
        if(searchType === 'customerName'){
            const result = await axios.get('http://localhost:8080/api/customer/list/searchByName?customerName='+searchValue)
            console.log(result.data.content);
            return result.data.content;
        }
        else if (searchType === 'customerType'){
            const result = await axios.get('http://localhost:8080/api/customer/list/searchByType?customerType='+searchValue)
            console.log(result.data.content);
            return result.data.content;
        }
        else if (searchType === 'customerAge'){
            const result = await axios.get('http://localhost:8080/api/customer/list/searchByAge?age='+searchValue)
            console.log(result.data.content);
            return result.data.content;
        }
    }
    catch (e){
        console.log(e)
        throw e
    }
};

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