import { useEffect, useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { format, isValid, parse, parseISO } from "date-fns";
import { DateTime } from 'luxon';
import Nav from '../../components/nav/Nav';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as salesManagementService from '../../utils/SaleManagementService/RetailSalesManagementService';
import styled from 'styled-components';

const StyleReportChart = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap');

:root {
    --blue: #0072BC;
    --light-blue:#3794d2;
    --dark-blue:  #0b68a6;
    --black: #444;
    --light-color: #666;
    --border: .1rem solid rgba(0, 0, 0, .1);
    --border-hover: .1rem solid var(--black);
    --box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
}

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-transform: capitalize;
    transition: all .2s linear;
}
.main {
    display: flex;
    padding-left: 3px;
    padding-top: 10px;
     /* Sử dụng Flexbox để xếp các div trên cùng một hàng */
  }
  
/* main-right */
legend{
    all: revert !important;
    font-weight: bold !important;
}

.alo {
    display: flex;
    flex-direction: column;
}

.date-time-inputs,
.show-sort-button {
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
    padding: 13px 0px;
}

.date-time-inputs .form-control,
.show-sort-button .form-control
{
    border: 1px solid;
}
.date-time-inputs div,
.show-sort-button .show,
.show-sort-button .sort {
    display: flex;
    align-items: center;
}

.date-time-inputs .input-date-time label{
    max-width: 100px;
    min-width: 78px;
}

.date-time-inputs .input-date-time label,
.date-time-inputs .form-control,
.show-sort-button .show label,
.show-sort-button .show select,
.show-sort-button .sort label,  
.show-sort-button .sort select {
    font-size: 13px;
    margin-right: 5px;
    padding: 0 5px;
    border-radius: 5px;
    
}

.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.date-time-inputs .input-date-time {
    position: relative;
    display: flex;
    flex-direction: column;
}

.error-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.show-sort-button .demo {
   position: absolute;
   right: 72px;
}
.show-sort-button .demo .btn {
    height: 40px;
    width: 65px
}

.main-right {
    flex: 5; 
    display: flex;
    flex-direction: row;
    border-radius: 7px;
}

.action1 {
    margin-top: 10px;
    padding: 5px 5px;
    display: flex; /* Sử dụng flexbox để xếp các button cùng một hàng */
}

 .action1 a  {
    margin-right: 8px;
    width: 85px;
    height: 40px ;
    padding-top: 8px;
 }

.btn i {
    margin-right: 3px; 
} 


`;

export function RetailSalesManagement() {

    const [invoice, setInvoice] = useState([]);
    const [errorStatus, setErrorStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        setIsLoading(true);
        try {
            let fetchedInvoice = await salesManagementService.findAllInvoice();
            console.log('Fetched Invoice:', fetchedInvoice);
            setInvoice(fetchedInvoice || []);
            setIsLoading(false);
        } catch (error) {
            if (!error.response) {
                setErrorStatus('Error: Network Error');
            } else {
                setErrorStatus(error.response.data.message);
            }
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object({
        fromDate: Yup.date().required("Từ ngày là bắt buộc"),
        toDate: Yup.date().required("Đến ngày là bắt buộc"),
        fromTime: Yup.string().required("Từ giờ là bắt buộc"),
        toTime: Yup.string().required("Đến giờ là bắt buộc")
          
      });
      
      
      const handleFilterSubmit = async (values) => {
        try {
          const { fromDate, toDate, fromTime, toTime, sortField, displayField } = values;
      
          const formattedFromDate = DateTime.fromISO(fromDate).toFormat('yyyy-MM-dd');
          const formattedToDate = DateTime.fromISO(toDate).toFormat('yyyy-MM-dd');
      
          const formattedFromTime = DateTime.fromFormat(fromTime, 'HH:mm').toFormat('HH:mm:ss');
          const formattedToTime = DateTime.fromFormat(toTime, 'HH:mm').toFormat('HH:mm:ss');
          
          let result = await salesManagementService.findInvoiceByDateAndTimeRange(
            formattedFromDate,
            formattedToDate,
            formattedFromTime,
            formattedToTime,
            sortField,
            displayField
          );
          console.log(result);
          setInvoice(result || []);
        } catch (error) {
          console.error("Error in handleFilterSubmit:", error);
        }
      };


    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorStatus) {
        return <div>Error: {errorStatus}</div>;
    }


    return (
        <>
    <StyleReportChart>

    <section className="main">
     <Nav />

    <div className="main-right">
        <div className="container">
            <fieldset className="border p-2" style={{ borderRadius: "5px" }}>
                <legend className="w-auto">Bộ lọc</legend>
                <div className="alo">
                   
                <Formik
                initialValues={{
                    fromDate: "",
                    toDate: "",
                    fromTime: "",
                    toTime: "",
                    sortField: "",
                    displayField: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleFilterSubmit} 
              >        
               {({ values, handleChange }) => (
               <Form action=""> 
                        <div className="date-time-inputs">
                            <div className='input-date-time'>
                            <div >
                            <label htmlFor="fromDate">Từ ngày: </label>
                            <Field type="date" name="fromDate" as="input" style={{ height: "40px", minWidth: "200px", maxWidth: "55px" }} className="form-control"/>
                            </div>
                            <div>
                            <ErrorMessage name="fromDate" component="div" className="error-message"/>                 
                            </div>
                           
                            </div>

                            <div className='input-date-time'>
                            <div>
                            <label htmlFor="toDate">Đến Ngày: </label>
                            <Field type="date" name="toDate" as="input" style={{ height: "40px", minWidth: "200px", maxWidth: "55px" }} className="form-control"/>
                            </div>
                           <div>
                           <ErrorMessage name="toDate" component="div" className="error-message"/>
                           </div>
                            </div>
                            
                            <div className='input-date-time'>
                            <div>
                            <label htmlFor="fromTime">Từ giờ: </label>
                            <Field type="time" name="fromTime"as="input" style={{ height: "40px", minWidth: "200px", maxWidth: "55px" }} className="form-control"/>
                            </div>
                            
                            <div>
                                <ErrorMessage name="fromTime" component="div" className="error-message"/>
                            </div>
                            </div>

                            <div className='input-date-time'>
                                <div>
                                <label htmlFor="toTime">Đến giờ: </label>
                                 <Field type="time" name="toTime" as="input" style={{ height: "40px", minWidth: "200px", maxWidth: "55px" }} className="form-control"/>
                                </div>
                           
                            <div>
                                <ErrorMessage name="toTime" component="div" className="error-message"/>
                            </div>
                            </div>
                        </div>
                        <div className="show-sort-button">
                            <div className="show">
                                <label htmlFor="displayField">Hiển thị: </label>
                                <Field name="displayField" as="select"  onChange={handleChange} style={{ height: "40px", minWidth: "200px", maxWidth: "55px", marginLeft: "13px" }} className="form-control">
                                 <option value="">Chọn hiển thị</option>
                                 <option value="Bán lẻ">Bán lẻ</option>
                                 <option value="Bán sỉ">Bán sỉ</option>
                                 <option value="Bán theo đơn">Bán theo đơn</option>
                                 <option value="Khách hoàn trả">Khách hoàn trả</option>
                                </Field>
                            </div>
                            <div className="sort" style={{marginLeft: '15px'}}>
                                <label htmlFor="sortField">Sắp xếp: </label>
                                <Field name="sortField" as="select"  onChange={handleChange} style={{ height: "40px", minWidth: "200px", maxWidth: "55px" }} className="form-control"> 
                                    <option value="">Chọn sắp xếp</option>
                                    <option value="customer_name">Tên khách hàng</option>
                                    <option value="date_create">Ngày lập - Giờ lập</option>
                                    <option value="employee_name">Người lập</option>
                                     <option value="total">Tổng tiền</option>
                               </Field>
                            </div>
                            <div className='demo'>
                                    <button type="submit" className="btn btn-primary">
                                            <span>
                                            <i className="bi bi-search"></i> Lọc
                                            </span>
                                    </button>
                        </div> 
                        </div>
                      
                        </Form>
                        )}
                </Formik>
                </div>
            </fieldset>

            <br />
            
            <fieldset className="border p-2" style={{ borderRadius: "5px" }}>
                <legend className="w-auto">Danh sách hóa đơn</legend>
                <table className="myTable">
                    <thead className="row-scope">
                        <tr >
                            <th>
                                STT</th> 
                            <th>Mã hóa đơn</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày lập</th>
                            <th>Giờ lập</th>
                            <th>Người lập</th>
                            <th>Tổng tiền</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(invoice?.data) && invoice.data.length === 0 ? (
                    <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                      <td colSpan="9" style={{ padding: '10px', fontSize: '30px', fontStyle: 'italic', color: 'red' }}>
                      No matching products found.
                    </td>
                 </tr>
                ) : (
                    invoice?.data.map((displayInvoice, index) => (
                        <tr key={displayInvoice.invoice_id}>
                                <td >
                                 {index +1}
                                 </td>
                                <td>{displayInvoice.invoice_id}</td>
                                <td>{displayInvoice.customer_name}</td>
                                <td>
                                    {displayInvoice.create_date && isValid(parseISO(displayInvoice.create_date))
                                        ? format(parseISO(displayInvoice.create_date), 'dd/MM/yyyy')
                                        : 'Invalid Date'}
                                </td>
                                <td>{displayInvoice.create_time}</td>
                                <td>{displayInvoice.employee_name}</td>
                                 <td>{displayInvoice.total}</td>
                                 <td>{displayInvoice.note}</td>
                            </tr>
                        ))
                        )}

                    </tbody>
                </table>
            </fieldset>

            <div className="action1" style= {{ marginLeft: '65%' }}> 
                <NavLink to={`/retail`} className="btn btn-primary">
                    <span className="em-1">
                        <i className="bi bi-plus-circle"></i>
                    </span>
                    Thêm
                </NavLink>

                <a  className="btn btn-info"><span className="em-1"><i className="bi bi-pencil-square"></i></span> Sửa</a>

                <a  data-bs-toggle="modal" data-bs-target="#delete" className="btn btn-danger"><span className="em-1"><i className="bi bi-x-circle"></i></span> Xoá</a>

                <a className="btn btn-secondary"><span className="em-1"><i className="bi bi-arrow-left-square"></i></span> Trở về</a>
            </div>
        </div>
    </div>
    </section>  
    </StyleReportChart>
        </>
    )
}

