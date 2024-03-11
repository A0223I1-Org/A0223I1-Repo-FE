import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

import moment from "moment";
import {toast} from "react-toastify";

export function EmployeeList(){
    const [type,setType] = useState("employee_id");
    const [fill,setFill] = useState("");
    const [order,setOrder] = useState("employee_id");
    const [clickRow,setClickRow] = useState({id: 0, name: ""});
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [employees,setEmployees] = useState([]);

    const [currentPage,setCurrenPage] = useState(1);
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = employees?.slice(firstIndex,lastIndex);
    const npage = Math.ceil(employees?.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    useEffect(() => {
        findAll(type,fill,order);
    }, [type,fill,order]);

    const findAll = async (type,fill,order) => {
        try {
            if(type === "employee_id" && (fill === "" || fill) && order === "employee_id"){
                console.log("1")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName1?&fill=${fill}`);
                setEmployees(temp.data)
            }else if (type === "employee_id" && (fill === "" || fill) && order === "employee_name"){
                console.log("2")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName2?&fill=${fill}`);
                setEmployees(temp.data)
            }else if(type === "employee_name" && (fill === "" || fill) && order === "employee_id"){
                console.log("3")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName3?&fill=${fill}`);
                setEmployees(temp.data)
            }else if(type === "employee_name" && (fill === "" || fill) && order === "employee_name"){
                console.log("4")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName4?&fill=${fill}`);
                setEmployees(temp.data)
            }else {
                console.log("hello")
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/list`);
                setEmployees(temp.data)
            }
        }catch (e){
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/employee/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll(type,fill,order);
        }catch (e){
            console.log(e);
        }
    }
    return (
        <>
            <h1 className="bg-primary text-light">Danh sách nhân viên</h1>
            <div className="bo_loc">
                <label style={{marginLeft: "100px"}}>lọc theo</label>
                <select className="form-select" style={{width: "150px", display: "inline-block"}} onChange={(evt) => setType(evt.target.value)}>
                    <option value="employee_id">Mã nhân viên</option>
                    <option value="employee_name">Tên nhân viên</option>
                </select>
                <input className="form-control" style={{width: "150px", display: "inline-block"}} onChange={(evt) => setFill(evt.target.value)}/>
                <label style={{marginLeft: "550px"}}>sắp xếp theo</label>
                <select className="form-select" style={{width: "150px", display: "inline-block"}} onChange={(evt) => setOrder(evt.target.value)}>
                    <option value="employee_id">Mã nhân viên</option>
                    <option value="employee_name">Tên nhân viên</option>
                </select>
            </div>
            <div>
                {employees && employees?.length > 0 ? (
                    <table className="table" style={{marginTop: "10px"}}>
                        <thead>
                        <tr>
                            <th className="bg-primary text-light">Mã nhân viên</th>
                            <th className="bg-primary text-light">Tên</th>
                            <th className="bg-primary text-light">Số điện thoại</th>
                            <th className="bg-primary text-light">Ngày vào làm</th>
                            <th className="bg-primary text-light">Địa chỉ</th>
                            <th className="bg-primary text-light">Lương</th>
                            <th className="bg-primary text-light">Ảnh</th>
                            <th className="bg-primary text-light">Tài khoản</th>
                            <th className="bg-primary text-light">chức vụ</th>
                            <th className="bg-primary text-light">Ghi chú</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records?.map((item,index) => (
                            <tr key={item.employee_id} onClick={() =>
                                setClickRow({id: item.employee_id, name: item.employee_name})}>
                                <td>{item.employee_id}</td>
                                <td>{item.employee_name}</td>
                                <td>{item.phone_number}</td>
                                <td>{moment(item.date_start).format("DD/MM/yyyy")}</td>
                                <td>{item.address}</td>
                                <td>{item.salary}</td>
                                <td><img src={item.image} alt="employee" /></td>
                                <td>{item.email}</td>
                                <td>{item.role_id === 1 ? "nhân viên" : "quản lý"}</td>
                                <td>{item.note}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                ) : (<p style={{textAlign: "center", marginTop: "20px", fontSize: '1.5em'}}><b>No result found</b></p>) }

                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#" className="page-link"
                               onClick={prePage}>Pre</a>
                        </li>
                        {
                            numbers.map((n ,i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href="#" className="page-link"
                                       onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            <a href="#" className="page-link"
                               onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                bạn có muốn xóa name là <span style={{color: "red"}}>{clickRow.name}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => handleDelete(clickRow.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <NavLink style={{marginLeft: "1000px"}} to={"/employee/create"} className="btn btn-success">
                    <i className="bi bi-plus-circle"></i> Tạo mới</NavLink>
                <NavLink style={{marginLeft: "5px"}} to={`/employee/update/${clickRow.id}`} className="btn btn-custom">
                    <i className="bi bi-pencil-square"></i> Cập nhật</NavLink>
                <button style={{marginLeft: "5px"}} type="button" className="btn btn-danger"
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-x-circle"></i> Xóa</button>
            </div>
        </>
    )

    function prePage(){
        if(currentPage !== 1){
            setCurrenPage(currentPage - 1)
        }
    }
    function changeCPage(id){
        setCurrenPage(id)
    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrenPage(currentPage + 1)
        }
    }
}