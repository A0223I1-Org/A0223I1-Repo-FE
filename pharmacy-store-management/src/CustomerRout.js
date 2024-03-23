import {Route, Routes} from "react-router-dom";
import {Home} from "./components/customerSite/Home";
import {Contact} from "./components/customerSite/Contact";

export const CustomerRout = () =>{
return(
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
    </Routes>
    </>
)
}