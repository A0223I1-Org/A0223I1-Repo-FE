// import './App.css';

import {ListCustomer} from "./components/customer/ListCustomer";
import {Supplier} from "./components/supplier/Supplier";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import React from "react";
import {ToastContainer} from "react-toastify";
import {MedicineGroupList} from "./pages/MedicineGroup/MedicineGroupList";
import 'react-toastify/dist/ReactToastify.css';
import {MedicineInfoList} from "./pages/MedicineInformation/MedicineInfoList";

function App() {
  return (
    <>
          <Routes>
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
              <Route path="/medicineGroup" element={<MedicineGroupList/>}></Route>
              <Route path="/medicineInfo" element={<MedicineInfoList/>}></Route>
              <Route path="/supplier" element={<Supplier/>}></Route>
          </Routes>
        <ToastContainer/>

    </>
  );
}

export default App;
