import '../SalesManagement/RetailSalesManagement.css';
import { useEffect, useState } from "react";
import { format, isValid, parse, parseISO } from "date-fns";
import { DateTime } from 'luxon';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as salesManagementService from '../../utils/SaleManagementService/RetailSalesManagementService';


export function RetailSalesManagement() {

    const [invoice, setInvoice] = useState([]);
    const [errorStatus, setErrorStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


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
        fromDate: Yup.date().required("From date is required"),
        toDate: Yup.date().required("To date is required"),
        fromTime: Yup.string().required("From time is required"),
        toTime: Yup.string().required("To time is required"),
      
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


    useEffect(() => {
        fetchApi();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorStatus) {
        return <div>Error: {errorStatus}</div>;
    }


    return (
        <>
    <Header />

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
                            <label htmlFor="fromDate">Từ ngày: </label>
                            <Field type="date" name="fromDate" as="input" className="form-control"/>
                            <span className="error-container">
                                <ErrorMessage name="fromDate" component="div" className="error-message"/>
                            </span>
                            </div>

                            <div className='input-date-time'>
                            <label htmlFor="toDate">Đến Ngày: </label>
                            <Field type="date" name="toDate" as="input" className="form-control"/>
                            <span className="error-container">
                                <ErrorMessage name="toDate" component="div" className="error-message"/>
                            </span>
                            </div>
                            
                            <div className='input-date-time'>
                            <label htmlFor="fromTime">Từ giờ: </label>
                            <Field type="time" name="fromTime"as="input" className="form-control"/>
                            
                            <span className="error-container">
                                <ErrorMessage name="fromTime" component="div" className="error-message"/>
                            </span>
                            </div>

                            <div className='input-date-time'>
                            <label htmlFor="toTime">Đến giờ: </label>
                            <Field type="time" name="toTime" as="input" className="form-control"/>
                            <span className="error-container">
                                <ErrorMessage name="toTime" component="div" className="error-message"/>
                            </span>
                            </div>
                        </div>
                        <div className="show-sort-button">
                            <div className="show">
                                <label htmlFor="displayField">Hiển thị: </label>
                                <Field name="displayField" as="select" style={{ marginLeft: "13px" }} onChange={handleChange}>
                                 <option value="">Chọn hiển thị</option>
                                 <option value="Bán lẻ">Bán lẻ</option>
                                 <option value="Bán sỉ">Bán sỉ</option>
                                 <option value="Bán theo đơn">Bán theo đơn</option>
                                 <option value="Khách hoàn trả">Khách hoàn trả</option>
                                </Field>
                            </div>
                            <div className="sort">
                                <label htmlFor="sortField">Sắp xếp: </label>
                                <Field name="sortField" as="select" style={{ marginLeft: "16px" }} onChange={handleChange}>
                                     <option value="">Chọn sắp xếp</option>
                                    <option value="customer_name">Tên khách hàng</option>
                                    <option value="date_create">Ngày lập - Giờ lập</option>
                                    <option value="employee_name">Người lập</option>
                                     <option value="total">Tổng tiền</option>
                               </Field>
                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary">
                                <span>
                                  <i className="bi bi-search"></i> Lọc
                                 </span>
                        </button>
                        </Form>
                        )}
                </Formik>
                </div>
            </fieldset>

            <br />
            
            <fieldset className="border p-2" style={{ borderRadius: "5px" }}>
                <legend className="w-auto">Danh sách hóa đơn</legend>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="checkbox-header" style={{innerWidth: "fit-content"}}>
                                Chọn</th> 
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
                                <td className="checkbox-container">
                                 <input type="checkbox" />
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
                            
                                {/* <td>
                                    <NavLink to={`/edit/${product.id}`} className="btn btn-primary">
                                        Edit
                                    </NavLink>
                                </td> */}
                            </tr>
                        ))
                        )}

                    </tbody>
                </table>
            </fieldset>

            <div className="action">
                <a href="add.html" className="btn btn-primary">
                    <span className="em-1">
                        <i className="bi bi-plus-circle"></i>
                    </span>
                    Thêm
                </a>

                <a  className="btn btn-info"><span className="em-1"><i className="bi bi-pencil-square"></i></span> Sửa</a>

                <a  data-bs-toggle="modal" data-bs-target="#delete" className="btn btn-danger"><span className="em-1"><i className="bi bi-x-circle"></i></span> Xoá</a>

                <a className="btn btn-secondary"><span className="em-1"><i className="bi bi-arrow-left-square"></i></span> Trở về</a>
            </div>
        </div>
    </div>
    </section>  
        </>
    )
}

