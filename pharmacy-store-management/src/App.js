import './App.css';
import {ReportChart} from "./components/report/report-chart";
import {Report} from "./components/report/report";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Report/>}></Route>
      <Route path="/chart" element={<ReportChart/>}></Route>
    </Routes>
    <ToastContainer />
  </>
  );
}

export default App;
