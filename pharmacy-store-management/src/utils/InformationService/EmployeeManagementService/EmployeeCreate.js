import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

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
        </>
    )
}