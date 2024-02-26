import axios from "axios";

const URL_API = "http://localhost:8080/generate-report";


export const generateReport = async (reportType, startDate, endDate, startTime, endTime) => {
    try {
        const  result=  await axios.get(`${URL_API}/reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`);
        return result.data;
    } catch (error) {
        return error.response.data;
    }
};
