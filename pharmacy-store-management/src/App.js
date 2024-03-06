import './App.css';
import {ListCustomer} from "./components/ListCustomer";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import {CreateCustomer} from "./components/CreateCustomer";
import {Supplier} from "./components/Supplier";
import React from "react";

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
              <Route path="/createCustomer" element={<CreateCustomer/>}></Route>
              <Route path="/supplier" element={<Supplier/>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
