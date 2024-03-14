import './App.css';
import {ListCustomer} from "./components/customer/ListCustomer";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import React from "react";
import {ToastContainer} from "react-toastify";
import {DetailCustomer} from "./components/customer/DetailCustomer";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
              <Route path="/detail-customer/:customerId" element={<DetailCustomer/>}/>
          </Routes>
          <ToastContainer></ToastContainer>
      </Router>
    </>
  );
}

export default App;
