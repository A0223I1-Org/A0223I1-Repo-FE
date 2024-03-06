import axios from 'axios';

export const findAllInvoice = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/v1/retailSaleManagement/displayInvoice");
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findAllInvoice:", error);
        throw error; // Thêm dòng này để throw lỗi
    }
}

export const findInvoiceByDateAndTimeRange = async (fromDate, toDate, fromTime, toTime, sortField, displayField) => {
    try {
        // Check if sortField and displayField are provided
        const hasSortField = sortField ? `&sortField=${sortField}` : '';
        const hasDisplayField = displayField ? `&displayField=${displayField}` : '';

        const url = `http://localhost:8080/api/v1/retailSaleManagement/filterInvoice?fromDate=${fromDate}&toDate=${toDate}&fromTime=${fromTime}&toTime=${toTime}${hasSortField}${hasDisplayField}`;
        
        const result = await axios.get(url);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error in findInvoiceByDateAndTimeRange:", error);

        // Log detailed error information if available
        if (error.response) {
            console.error("Error details:", error.response.data);
        }

        throw error;
    }
};

