import './App.css';
import {ListCustomer} from "./components/ListCustomer";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import React from "react";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
