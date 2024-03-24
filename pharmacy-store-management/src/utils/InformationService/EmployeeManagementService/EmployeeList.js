import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

import moment from "moment";
import {toast} from "react-toastify";

import styled from 'styled-components';

const StyledListEmployee = styled.div`

body {
    font-family: Poppins, serif;;
}
.row-scope{
    text-align: center;
}
.row-scope th{
    background-color: #449af8;
    color: white;
}
.row-name{
    text-align: left;
    width: 200px;
}
.row-address{
    text-align: left;
    width: 200px;
}
.myTable {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2px;
}
.form-select{
    width: 100%;
    margin-right: 10px;
}
.form-control{
    width: 100%;
    margin-right: 15px;
}
.search-selected{
    margin-right: 16%;
}
fieldset{
    width: 100%;
    box-sizing: border-box;
}
.boloc{
    margin-top: 25px;
    margin-bottom: 15px;
}
legend {
    all: revert;
}
b{
    font-size: 16px;
}
.myButton {
    background-color:  #449af8; /* Màu nền */
    border: none; /* Không viền */
    color: white; /* Màu chữ */
    padding: 8px 13px; /* Đệm */
    text-align: center; /* Căn giữa chữ */
    text-decoration: none; /* Không gạch chân */
    display: inline-block;
    font-size: 16px; /* Kích thước chữ */
    margin: 2px 0px; /* Lề */
    cursor: pointer; /* Con trỏ chuột */
    border-radius: 0.375rem;
    width: 70%;
}
.sort{
    margin-left: 150px;
}
.modal-label {
    height: 37px;
}
.modal-input{
    height: 37px;
}
.sort:last-child{
    margin-right: 0px;
}
nav {
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: center;
}
.chucNang{
    margin-top: 10px;
}
.btn-success {
    margin-left: 44.8%;
}
.chucNang button{
    margin-right: 1.4%;

}
.chucNang button:last-child{
    margin-right: 0px;
}
.btn-custom {
    background-color: #123456 !important;
    color: #ffffff !important;
}
.btn-custom:hover{
    background-color: #0c253f !important;
    color: #ffffff !important;
}




.myTable {
    width: 100%;
    border-collapse: collapse;
}

.myTable th, .myTable td {
    border: 1px solid #dee2e6;
    padding: 0.75rem;
    vertical-align: top;
}

.myTable thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

.myTable tbody + tbody {
    border-top: 2px solid #dee2e6;
}
.table-row{
    cursor: pointer;
}
.selected-row{
    background-color: #082b34;
    color: white;
}
i{
    margin-right: 5px;
}

.form-group {
    display: flex;
    /*justify-content: space-between;*/

}


.form-group div {
    margin-right: 85px;
}

.form-group div:last-child {
    margin-right: 0;
}
.report{
    display: flex;
}

.report .debt{
    margin: auto 150px;
}
.report .list{
    margin: auto 150px;
}
.action{
    display: flex;
    justify-content: space-between;
}
.action .chart{
    margin-right: 660px;
    margin-left: 20px;
}
.right{
    text-align: right;
}
`;

export function EmployeeList() {
    const [type, setType] = useState("employee_id");
    const [fill, setFill] = useState("");
    const [order, setOrder] = useState("employee_id");
    const [clickRow, setClickRow] = useState({id: 0, name: ""});
    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);
    const [employees, setEmployees] = useState([]);

    const [currentPage, setCurrenPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = employees?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(employees?.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    useEffect(() => {
        findAll(type, fill, order);
    }, [type, fill, order]);

    const findAll = async (type, fill, order) => {
        try {
            if (type === "employee_id" && (fill === "" || fill) && order === "employee_id") {
                console.log("1")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName1?&fill=${fill}`);
                setEmployees(temp.data)
            } else if (type === "employee_id" && (fill === "" || fill) && order === "employee_name") {
                console.log("2")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName2?&fill=${fill}`);
                setEmployees(temp.data)
            } else if (type === "employee_name" && (fill === "" || fill) && order === "employee_id") {
                console.log("3")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName3?&fill=${fill}`);
                setEmployees(temp.data)
            } else if (type === "employee_name" && (fill === "" || fill) && order === "employee_name") {
                console.log("4")
                console.log(type, fill, order)
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/listSearchName4?&fill=${fill}`);
                setEmployees(temp.data)
            } else {
                console.log("hello")
                let temp =
                    await axios.get(`http://localhost:8080/api/employee/list`);
                setEmployees(temp.data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/employee/" + id);
            toast("xóa thành công", {
                position: "top-center",
                autoClose: 2000
            })
            findAll(type, fill, order);
        } catch (e) {
            console.log(e);
        }
    }
    const highlightRow = (event) => {
        const row = event.currentTarget;
        console.log(row)
        removeHighlight();
        if (highlightedRowRef.current) {
            highlightedRowRef.current.classList.remove('selected-row');
        }
        if (row === selectedRow) {
            setSelectedRow(null);
        } else {
            row.classList.add('selected-row');
            setSelectedRow(row);
            highlightedRowRef.current = row;
        }
    };
    const removeHighlight = () => {
        const highlightedRow = document.querySelector('.selected-row');
        if (highlightedRow) {
            highlightedRow.classList.remove('selected-row');
        }
    };

    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
        if (match) {
            return match[1] + ' ' + match[2] + ' ' + match[3];
        }
        return phoneNumber;
    }

    return (
        <StyledListEmployee>
            <div className='container'>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <div className="boloc">
                            <fieldset className="border rounded-3 p-3">
                                <legend><b>Bộ lọc</b></legend>
                                <div style={{display: "flex"}}>
                                    <div className="search-selected">
                                        <span>Lọc theo</span>
                                        <div style={{display: "inline-block", alignItems: "center"}}>
                                            <select className="form-select"
                                                    style={{width: "150px", display: "inline-block"}}
                                                    onChange={(evt) => setType(evt.target.value)}>
                                                <option value="employee_id">Mã nhân viên</option>
                                                <option value="employee_name">Tên nhân viên</option>
                                            </select>
                                            <input className="form-control"
                                                   style={{width: "150px", display: "inline-block"}}
                                                   onChange={(evt) => setFill(evt.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="sort">
                                        <span>Sắp xếp theo</span>
                                        <select className="form-select"
                                                style={{width: "150px", display: "inline-block"}}
                                                onChange={(evt) => setOrder(evt.target.value)}>
                                            <option value="employee_id">Mã nhân viên</option>
                                            <option value="employee_name">Tên nhân viên</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            {employees && employees?.length > 0 ? (
                                <fieldset className="border rounded-3 p-3">
                                    <legend><b>Danh sách khách hàng</b></legend>
                                    <table className="myTable">
                                        <thead>
                                        <tr className="row-scope">
                                            <th>Mã nhân viên</th>
                                            <th>Tên</th>
                                            <th>Số điện thoại</th>
                                            <th>Ngày vào làm</th>
                                            <th>Địa chỉ</th>
                                            <th>Lương</th>
                                            <th>Ảnh</th>
                                            <th>Tài khoản</th>
                                            <th>chức vụ</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {records?.map((item, index) => (
                                            <tr className="table-row" key={index} onClick={(event) => {
                                                setClickRow({id: item.employee_id, name: item.employee_name});
                                                highlightRow(event)
                                            }}>
                                                <td>{item.employee_id}</td>
                                                <td>{item.employee_name}</td>
                                                <td>{formatPhoneNumber(item.phone_number)}</td>
                                                <td>{moment(item.date_start).format("DD/MM/yyyy")}</td>
                                                <td>{item.address}</td>
                                                <td>{item.salary} VND</td>
                                                <td><img src={item.image} alt="employee"/></td>
                                                <td>{item.email}</td>
                                                <td>{item.role_id === 1 ? "nhân viên" : "quản lý"}</td>
                                                <td>{item.note}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item">
                                                <a href="#" className="page-link"
                                                   onClick={prePage}>Trước</a>
                                            </li>
                                            {
                                                numbers.map((n, i) => (
                                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                        <a href="#" className="page-link"
                                                           onClick={() => changeCPage(n)}>{n}</a>
                                                    </li>
                                                ))
                                            }
                                            <li className="page-item">
                                                <a href="#" className="page-link"
                                                   onClick={nextPage}>Sau</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </fieldset>

                            ) : (<p style={{textAlign: "center", marginTop: "20px", fontSize: '1.5em'}}><b>Không tìm thấy kết quả</b></p>)}



                            <div className="modal fade" id="exampleModal" tabIndex="-1"
                                 aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            bạn có muốn xóa name là <span style={{color: "red"}}>{clickRow.name}</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close
                                            </button>
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                    onClick={() => handleDelete(clickRow.id)}>Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chucNang">
                            <NavLink  to={"/employee/create"} className="btn btn-success">
                                <i className="bi bi-plus-circle"></i> Tạo mới</NavLink>
                            <NavLink style={{marginLeft: "5px"}} to={`/employee/update/${clickRow.id}`}
                                     className="btn btn-primary">
                                <i className="bi bi-pencil-square"></i> Cập nhật</NavLink>
                            <button style={{marginLeft: "5px"}} type="button" className="btn btn-danger"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="bi bi-x-circle"></i> Xóa
                            </button>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        </StyledListEmployee>
    )

    function prePage() {
        if (currentPage !== 1) {
            setCurrenPage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrenPage(id)
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrenPage(currentPage + 1)
        }
    }
}