import {ListCustomer} from "./components/CreateUpdateCustomer/ListCustomer";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import React from "react";
import {ToastContainer} from "react-toastify";
import {MedicineGroupList} from "./pages/MedicineGroup/MedicineGroupList";
import 'react-toastify/dist/ReactToastify.css';
import {MedicineInfoList} from "./pages/MedicineInformation/MedicineInfoList";
import {ListPrescription} from "./pages/PrescriptionManagement/ListPrescription";
import {RetailSalesManagement} from "./pages/SalesManagement/RetailSalesManagement";
import RetailInvoice from "./pages/SalesManagement/RetailInvoice";
import {ReportChart} from "./components/report/report-chart";
import {Report} from "./components/report/report";
function App() {
  return (
    <>
          <Routes>
              <Route path={'/'} element={<RetailSalesManagement />} />
              <Route path={'/retail'} element={<RetailInvoice />} />
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
              <Route path="/medicineGroup" element={<MedicineGroupList/>}></Route>
              <Route path="/medicineInfo" element={<MedicineInfoList/>}></Route>
              <Route path="/listPrescription" element={<ListPrescription/>}></Route>
              <Route path="/report" element={<Report/>}></Route>
               <Route path="/chart" element={<ReportChart/>}></Route>
          </Routes>
    </>
  );
}

export default App;
