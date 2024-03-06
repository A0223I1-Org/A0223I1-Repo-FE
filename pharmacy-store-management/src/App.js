import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import {RetailSalesManagement} from '../../pharmacy-store-management/src/pages/SalesManagement/RetailSalesManagement';
function App() {
  return (
    <div>
    <Routes>
      <Route path={'/'} element={<RetailSalesManagement></RetailSalesManagement>}></Route>
      <Route path={'/retail'} element={<EditProduct></EditProduct>}></Route>
    </Routes>
    <ToastContainer/>
  </div>
  );
}

export default App;
