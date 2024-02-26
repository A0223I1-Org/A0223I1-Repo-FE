import './App.css';
import {MedicineGroupList} from "./pages/MedicineGroup/MedicineGroupList";
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {MedicineInfoList} from "./pages/MedicineInformation/MedicineInfoList";

function App() {
  return (
      <Routes>
          <Route path="/medicineGroup" element={<MedicineGroupList/>}></Route>
          <Route path="/medicineInfo" element={<MedicineInfoList/>}></Route>
      </Routes>

  );
}

export default App;
