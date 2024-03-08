import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/suppliers';

export const findAllSupplier = async (orderBy, searchType, searchValue) => {
    try {
        const result = await axios.get(`${BASE_URL}/listSupplier?orderBy=${orderBy}&searchType=${searchType}&searchValue=${searchValue}`);
        console.log(result.data.content);
        return result.data.content;
    } catch (e) {
        console.error('Error fetching suppliers:', e);
        throw e;
    }
};

export const deleteSupplier = async (id) => {
    try {
        const result = await axios.delete(`${BASE_URL}/${id}`);
        console.log(result.data.content);
        return result.data.content;
    } catch (e) {
        console.error('Error deleting supplier:', e);
        throw e;
    }
};

export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getSupplierById/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching supplier by id:', e);
        throw e;
    }
};

export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await axios.post(`${BASE_URL}/updateSupplier/${id}`, supplierData);
        return response.data;
    } catch (e) {
        console.error('Error updating supplier:', e);
        throw e;
    }
};

export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addSupplier`, supplierData);
        return response.data;
    } catch (e) {
        console.error('Error adding supplier:', e);
        throw e;
    }
};