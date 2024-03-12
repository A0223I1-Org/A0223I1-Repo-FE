import axios from "axios";
import {toast} from "react-toastify";

const URL_API = "http://localhost:8080/";


export const generateReport = async (reportType, startDate, endDate, startTime, endTime) => {
    try {
        // debugger;
        const result = await axios.get(`${URL_API}generate-report?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`);
        toast.success(result.data)
        return result.data;
    } catch (error) {

        toast.warning(error.response.data)
        toast.warning(error.response.data.message)
        // return error.response.data;
    }
};
export const seeChartRevenueAndProfit = async (chartType, startDate, endDate) => {
    try {
        const result = await axios.get(`${URL_API}revenue-profit?chartType=${chartType}&startDate=${startDate}&endDate=${endDate}`);
        return result.data;
    } catch (error) {
        toast.warning(error.response.data)
        return error.response.data;
    }
}
