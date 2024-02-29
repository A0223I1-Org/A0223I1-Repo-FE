import './App.css';
import {ListCustomer} from "./components/ListCustomer";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import {CreateCustomer} from "./components/CreateCustomer";

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/listCustomer" element={<ListCustomer/>}></Route>
              <Route path="/createCustomer" element={<CreateCustomer/>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
