import {NavLink, useParams} from "react-router-dom";
import * as CustomerService from "../../utils/InformationService/CustomerManagementService/CustomerService";
import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styled from 'styled-components';

const StyledDetailCustomer = styled.div`
    .NhiNTH-detailCustomer body {
    font-family: Poppins, serif;
}
.NhiNTH-detailCustomer .row {
    margin-bottom: 5px;
}
.NhiNTH-detailCustomer .row-scope{
    text-align: center;
}
.NhiNTH-detailCustomer .row-scope td{
    background-color: #449af8;
    color: white;
}
.NhiNTH-detailCustomer .row-name{
    text-align: left;
    width: 200px;
}
.NhiNTH-detailCustomer .row-address{
    text-align: left;
    width: 200px;
}
.NhiNTH-detailCustomer .myTable {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2px;
}
.NhiNTH-detailCustomer .form-select{
    width: 100%;
    margin-right: 10px;
}
.NhiNTH-detailCustomer fieldset{
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
}
.NhiNTH-detailCustomer legend {
    all: revert;
}
.NhiNTH-detailCustomer b{
    font-size: 16px;
}
.NhiNTH-detailCustomer .chucNang {
    margin-top: 1%;
    display: flex;
    justify-content: flex-end; /* aligns items to the left */
}
.NhiNTH-detailCustomer .chucNang button{
    margin: 0px 5px;
}
.NhiNTH-detailCustomer nav {
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: center;
}
.NhiNTH-detailCustomer .myTable {
    width: 100%;
    border-collapse: collapse;
}
.NhiNTH-detailCustomer .myTable th, .myTable td {
    border: 1px solid #dee2e6;
    padding: 0.75rem;
    vertical-align: top;
}
.NhiNTH-detailCustomer .myTable thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}
.NhiNTH-detailCustomer .myTable tbody + tbody {
    border-top: 2px solid #dee2e6;
}
.NhiNTH-detailCustomer .table-row{
    cursor: pointer;
}
.NhiNTH-detailCustomer .selected-row{
    background-color: #082b34;
    color: white;
}

.NhiNTH-detailCustomer .time .form-group {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    align-items: center; /* Canh chỉnh các phần tử trong form-group theo chiều dọc */
}

.NhiNTH-detailCustomer .time .form-group label {
    width: 100px; /* Độ rộng cố định cho nhãn */
    margin-right: 20px; /* Khoảng cách giữa nhãn và ô input */
    /*text-align: right; !* Canh chỉnh nhãn sang phải *!*/
}

.NhiNTH-detailCustomer .time .form-group input,
.NhiNTH-detailCustomer .time .form-group .form-control {
    flex: 1; /* Ô input chiếm phần còn lại của form-group */
    margin-right: 15px; /* Khoảng cách giữa các ô input */
}

.NhiNTH-detailCustomer .time .form-group .yup-error-message {
    flex: 1; /* Hiển thị errormessage full width */
    margin-top: 5px; /* Khoảng cách giữa ô input và errormessage */
}

`;

const initialValues = {
    inputStartDate: '',
    inputEndDate: '',
    inputTimeStart: '',
    inputTimeEnd: ''
};
const currentDate = new Date();

export const DetailCustomer = () => {
    const {customerId} = useParams();
    const [isTimeRequired, setTimeRequired] = useState(true);
    const [invoicesCustomer, setInvoiceCustomer] = useState([]);
    const [customer, setCustomer] = useState({
            customerId: "",
            customerName: "",
            age: "",
            address: "",
            customerType: "",
            note: "",
            phoneNumber: ""
        }
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage] = useState(3); // Số hóa đơn trên mỗi trang
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalItems, setTotalItems] = useState(0); // Thêm state cho tổng số mục

    const handlePaginate = async (pageNumber) => {
        setCurrentPage(pageNumber);
        try {
            // const { inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd } = values;
            const {inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd} = formikValues;
            const invoicesResult = await CustomerService.seeInvoiceCustomer(
                customerId,
                inputStartDate,
                inputEndDate,
                inputTimeStart,
                inputTimeEnd,
                pageNumber, // Cập nhật currentPage mới
                itemsPerPage
            );

            setInvoiceCustomer(invoicesResult);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchApi = async () => {
        try {
            const result = await CustomerService.detailCustomer(customerId);
            setCustomer(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        fetchApi()
    }, [customerId])


    const onSubmit = async (values, actions, formikProps) => {
        const {inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd} = values;
        const result = await CustomerService.seeInvoiceCustomer(
            customerId, inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd, currentPage, itemsPerPage
        );
        const totalCount = await CustomerService.seeInvoiceCustomer(
            customerId, inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd
        );
        const totalPageCount = Math.ceil(totalCount.length / itemsPerPage);
        setTotalPages(totalPageCount);
        setTotalItems(totalCount);
        if (currentPage >= totalPageCount) {
            setCurrentPage(totalPageCount - 1);
        }
        setInvoiceCustomer(result);
    };

    const validationSchema = Yup.object().shape({
        inputStartDate: Yup.date()
            .nullable()
            .required('Vui lòng nhập ngày bắt đầu')
            .test('is-date', 'Không được phép nhập lớn hơn ngày hiện tại', function (value) {
                if (value instanceof Date || value === null) {
                    return value <= currentDate || this.createError({message: 'Không được phép nhập lớn hơn ngày hiện tại'});
                }
                return true;
            }),
        inputEndDate: Yup.date()
            .required('Vui lòng nhập ngày kết thúc')
            .test('is-valid-end-date', 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu', function (value) {
                const {inputStartDate} = this.parent;
                if (inputStartDate) {
                    return value && new Date(value) >= new Date(inputStartDate);
                }
                return true;
            })
            .test('is-valid-end-date-2', 'Ngày kết thúc không lớn hơn ngày hiện tại', function (value) {
                return value && value <= currentDate;
            }),
        inputTimeStart: Yup.string().nullable().required('Vui lòng nhập thời gian bắt đầu').test(
            'is-valid-start-time',
            'Thời gian bắt đầu không hợp lệ',
            function (value) {
                const isTimeValid = (time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
                };
                return isTimeValid(value);
            }
        ),
        inputTimeEnd: Yup.string().nullable().test(
            'is-valid-end-time',
            'Thời gian kết thúc phải sau hoặc bằng thời gian bắt đầu',
            function (value) {
                const {inputTimeStart} = this.parent;
                if (inputTimeStart) {
                    const isTimeValid = (time) => {
                        const [hours, minutes] = time.split(':').map(Number);
                        return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
                    };
                    return isTimeValid(value) && new Date(`2000-01-01T${value}`) >= new Date(`2000-01-01T${inputTimeStart}`);
                }
                return true;
            }
        ).required('Vui lòng nhập thời gian kết thúc'),
    });

    const [formikValues, setFormikValues] = useState();

    return (
        <StyledDetailCustomer>
                    <div className="NhiNTH-detailCustomer">
                        <div className="container">
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-10">
                                    <div>
                                        <fieldset className="border rounded-3 p-3">
                                            <legend><b style={{fontSize: "19px"}}>Thông tin khách hàng</b></legend>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label htmlFor="customerId" className="col-sm-4 col-form-label">Mã
                                                            khách
                                                            hàng</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" id="customerId"
                                                                   aria-describedby="customerNameHelp"
                                                                   value={customer.customerId}
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="customerName"
                                                               className="col-sm-4 col-form-label">Tên khách
                                                            hàng</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control"
                                                                   id="customerName"
                                                                   aria-describedby="customerNameHelp"
                                                                   value={customer.customerName} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="customerType"
                                                               className="col-sm-4 col-form-label">Nhóm khách
                                                            hàng</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control"
                                                                   id="customerType"
                                                                   aria-describedby="customerAgeHelp"
                                                                   value={customer.customerType} disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label htmlFor="customerAddress"
                                                               className="col-sm-4 col-form-label">Địa
                                                            chỉ</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control"
                                                                   id="customerAddress"
                                                                   aria-describedby="customerAddressHelp"
                                                                   value={customer.address}
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="customerPhoneNumber"
                                                               className="col-sm-4 col-form-label">Số
                                                            điện thoại</label>
                                                        <div className="col-sm-8">
                                                            <input type="tel" className="form-control"
                                                                   id="customerPhoneNumber"
                                                                   aria-describedby="customerPhoneNumberHelp"
                                                                   value={customer.phoneNumber} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="customerNote"
                                                               className="col-sm-4 col-form-label">Ghi
                                                            chú</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control"
                                                                   id="customerNote"
                                                                   aria-describedby="customerNoteHelp"
                                                                   value={customer.note}
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={onSubmit}
                                        >
                                            {(formikProps) => {
                                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                                useEffect(() => {
                                                    setFormikValues(formikProps.values);
                                                }, [formikProps.values]);
                                                return (

                                                    <Form noValidate>

                                                        <fieldset className="border rounded-3 p-3">
                                                            <legend><b style={{fontSize: "19px"}}>Thời gian</b></legend>
                                                            <div className="row time">
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label htmlFor="inputStartDate">Từ ngày</label>
                                                                        <Field
                                                                            type="date"
                                                                            name="inputStartDate"
                                                                            className="form-control"
                                                                            disabled={!isTimeRequired}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="inputStartDate"
                                                                            component="div"
                                                                            className="yup-error-message text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label htmlFor="inputEndDate">Đến ngày</label>
                                                                        <Field
                                                                            type="date"
                                                                            className="form-control"
                                                                            name="inputEndDate"
                                                                            disabled={!formikProps.values.inputStartDate}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="inputEndDate"
                                                                            component="div"
                                                                            className="yup-error-message text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="inputTimeStart">Từ giờ</label>
                                                                        <Field
                                                                            type="time"
                                                                            className="form-control"
                                                                            name="inputTimeStart"
                                                                            disabled={!isTimeRequired}

                                                                        />
                                                                        <ErrorMessage
                                                                            name="inputTimeStart"
                                                                            component="div"
                                                                            className="yup-error-message text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="inputTimeEnd">Đến giờ</label>
                                                                        <Field
                                                                            type="time"
                                                                            className="form-control"
                                                                            name="inputTimeEnd"
                                                                            disabled={!formikProps.values.inputTimeStart}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="inputTimeEnd"
                                                                            component="div"
                                                                            className="yup-error-message text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <button type="submit" className="btn btn-primary"
                                                                            style={{marginTop: "24px"}}>Xem hóa đơn
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>
                                        {/*</fieldset>*/}
                                    </div>
                                    <div>
                                        <fieldset className="border rounded-3 p-3">
                                            <legend><b style={{fontSize: "19px"}}>Danh sách hóa đơn</b></legend>
                                            <table className="myTable">
                                                <thead>
                                                <tr className="row-scope">
                                                    <td>Mã hóa đơn</td>
                                                    <td>Ngày lập</td>
                                                    <td>Giờ lập</td>
                                                    <td>Người lập</td>
                                                    <td>Tổng tiền</td>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {invoicesCustomer ? (
                                                    invoicesCustomer.length > 0 ? invoicesCustomer.map((i, index) => (
                                                        <tr className="table-row">
                                                            <td>{i.invoiceId}</td>
                                                            <td>{i.date}</td>
                                                            <td>{i.time}</td>
                                                            <td>{i.employeeName}</td>
                                                            <td className="row-name">{Number(i.total).toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}</td>

                                                        </tr>
                                                    )) : <td style={{textAlign: "center"}} colSpan="5">Không có dữ
                                                        liệu</td>
                                                ) : (
                                                    <div>Loading...</div>
                                                )}
                                                </tbody>
                                            </table>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                            <span className="page-link"
                                                  onClick={() => handlePaginate(currentPage - 1)}>Trước</span>
                                                    </li>
                                                    {Array.from({length: totalPages}, (_, index) => (
                                                        <li key={index}
                                                            className={`page-item ${currentPage === index ? 'active' : ''}`}>
                                                <span className="page-link"
                                                      onClick={() => handlePaginate(index)}>{index + 1}</span>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                            <span className="page-link"
                                                  onClick={() => handlePaginate(currentPage + 1)}>Sau</span>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </fieldset>
                                    </div>
                                    <div className="chucNang">
                                        <NavLink to={`/`}>
                                            <button type="button" className="btn btn-primary"><i
                                                className="bi bi-arrow-return-left"></i> Trở về
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-1"></div>
                            </div>
                        </div>
                    </div>
        </StyledDetailCustomer>
    )
}