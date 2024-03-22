import {ListCustomer} from "./components/customer/ListCustomer";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {MedicineGroupList} from "./pages/MedicineGroup/MedicineGroupList";
import 'react-toastify/dist/ReactToastify.css';

import {DetailCustomer} from "./components/customer/DetailCustomer";
import {MedicineInfoList} from "./pages/MedicineInformation/MedicineInfoList";
import {ListPrescription} from "./pages/PrescriptionManagement/ListPrescription";
import {RetailSalesManagement} from "./pages/SalesManagement/RetailSalesManagement";
import RetailInvoice from "./pages/SalesManagement/RetailInvoice";
import {ReportChart} from "./components/report/report-chart";
import {Report} from "./components/report/report";
import {Nav} from "./components/customerSite/Nav";
import {Home} from "./components/customerSite/Home";
import {CustomerSite} from "./CustomerSite";
import {Contact} from "./components/customerSite/Contact";
import {CustomerService} from "./components/customerService/CustomerService";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<CustomerSite />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customerService" element={<CustomerService/>}/>
            <Route path='/retailSale' element={<RetailSalesManagement />} />
            <Route path='/retail' element={<RetailInvoice />} />
            <Route path="/listCustomer" element={<ListCustomer/>}></Route>
            <Route path="/detail-customer/:customerId" element={<DetailCustomer/>}/>
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
