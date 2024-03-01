import axios from "axios";

const URL_API = "http://localhost:8080/";


export const generateReport = async (reportType, startDate, endDate, startTime, endTime) => {
    try {
        const result = await axios.get(`${URL_API}generate-report?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`);
        return result.data;
    } catch (error) {
        return error.response.data;
    }
};
export const seeChartRevenueAndProfit = async (chartType, startDate, endDate) => {
    try {
        const result = await axios.get(`${URL_API}revenue-profit?chartType=${chartType}&startDate=${startDate}&endDate=${endDate}`);
        return result.data;
    } catch (error) {
        return error.response.data;
    }
}
