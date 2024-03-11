import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EmployeeList} from "./utils/InformationService/EmployeeManagementService/EmployeeList";
import {EmployeeCreate} from "./utils/InformationService/EmployeeManagementService/EmployeeCreate";
import {EmployeeUpdate} from "./utils/InformationService/EmployeeManagementService/EmployeeUpdate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path={"/employee/list"} element={<EmployeeList/>}></Route>
                  <Route path={"/employee/create"} element={<EmployeeCreate/>}></Route>
                  <Route path={"/employee/update/:id"} element={<EmployeeUpdate/>}></Route>
              </Routes>
              <ToastContainer/>
          </BrowserRouter>
      </>
  );
}

export default App;
