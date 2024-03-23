import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

import styled from 'styled-components';
import Header from "../../../components/header/Header";
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

export function EmployeeCreate(){
    const navigate = useNavigate();
    const [employee,setEmployee] = useState({
        employee_id: "",
        employee_name: "",
        phone_number: "",
        date_start: "",
        address: "",
        note: "",
        salary: "",
        image: "",
        email: "",
        password: "",
        role_id: "1"
    });
    const validateSchema = {
        employee_name: Yup.string().required("yêu cầu nhập tên"),
        employee_id: Yup.string().required("yêu cầu nhập id"),
        phone_number: Yup.string().required("yêu cầu nhập số điện thoại").matches(/^\d{10}$/,"số điện thoại không hợp lệ"),
        address: Yup.string().required("yêu cầu nhập địa chỉ"),
        salary: Yup.string().required("yêu cầu nhập lương"),
        email: Yup.string().required("yêu cầu nhập email").email("email không hợp lệ"),
        password: Yup.string().required("yêu cầu nhập mật khẩu"),
        date_start: Yup.string().required("yêu cầu nhập ngày"),
        image: Yup.string().required("yêu cầu nhập ảnh"),
    }
    const handleCreate = async (values) => {
        try {
            await axios.post("http://localhost:8080/api/employee/create", values);
            navigate("/employee/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }
    return (
        <>
            <Header/>
        <StyledListEmployee>
            <h1 className="bg-primary text-light" style={{display: "flex", justifyContent: "center", marginLeft: "50px", marginRight: "50px"}}>Thêm mới nhân viên</h1>
            <Formik initialValues={employee} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                console.log(values)
                handleCreate(values);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">Mã nhân viên</label>
                                <Field type="text" className="form-control" name="employee_id"/>
                                <ErrorMessage name="employee_id" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">tên nhân viên</label>
                                <Field type="text" className="form-control" name="employee_name"/>
                                <ErrorMessage name="employee_name" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">số điện thoại</label>
                                <Field type="text" className="form-control" name="phone_number"/>
                                <ErrorMessage name="phone_number" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">ngày vào làm</label>
                                <Field type="datetime-local" className="form-control" name="date_start"/>
                                <ErrorMessage name="date_start" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">địa chỉ</label>
                                <Field type="text" className="form-control" name="address"/>
                                <ErrorMessage name="address" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">lương</label>
                                <Field type="number" className="form-control" name="salary"/>
                                <ErrorMessage name="salary" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">ảnh</label>
                                <Field type="file" className="form-control" name="image"/>
                                <ErrorMessage name="image" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">email</label>
                                <Field type="text" className="form-control" name="email"/>
                                <ErrorMessage name="email" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">password</label>
                                <Field type="text" className="form-control" name="password"/>
                                <ErrorMessage name="password" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">chức vụ</label>
                                <Field as="select" name="role_id" className="form-select">
                                    <option value="1">nhân viên</option>
                                    <option value="2">quản lý</option>
                                </Field>
                            </div>
                            <div className="mb-3" style={{marginLeft: "50px", marginRight: "50px"}}>
                                <label className="form-label">ghi chú</label>
                                <Field type="text" className="form-control" name="note"/>
                                <ErrorMessage name="note" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary" style={{marginLeft: "50px"}}>Tạo mới</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </StyledListEmployee>
            </>
    )
}