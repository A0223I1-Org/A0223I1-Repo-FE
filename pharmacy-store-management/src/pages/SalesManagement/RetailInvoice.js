import React from 'react';
import { useEffect, useState, useMemo, useRef, useContext  } from "react";
import { format, isValid, parse, parseISO } from "date-fns";
import { DateTime } from 'luxon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useFormikContext } from 'formik';
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Nav from '../../components/nav/Nav';
import * as retailInvoice from '../../utils/SaleManagementService/RetailInvoice';
import styled from 'styled-components';
import Header from "../../components/header/Header";

const StyleReportChart = styled.div`
  
.main {
  display: flex;
  padding-left: 3px;
  padding-top: 10px;
   /* Sử dụng Flexbox để xếp các div trên cùng một hàng */
}

.main-left {
  flex: 1;
  width: 220px; /* Điều chỉnh chiều rộng của thanh điều hướng */
  height: 100%;
  background: #0072BC;
  border-radius: 7px;  
  margin-right: 15px;
  margin-left: 2px;
}
img {
  width: 32px; 
  height: 32px; 
}
.sidebar ul {
  list-style-type: none; /* Loại bỏ dấu đầu dòng mặc định */
  margin-top: 10px;
  
}

.sidebar ul li a {
  display: flex; /* Sắp xếp biểu tượng và văn bản theo hàng ngang */
  align-items: center; /* Căn giữa biểu tượng và văn bản theo chiều dọc */
  padding: 7.5px; /* Thêm đệm xung quanh mỗi mục */
  text-decoration: none; /* Loại bỏ gạch chân của liên kết */
  color: rgb(255, 255, 255); /* Đặt màu văn bản */
  margin-top: 8.5px;
  margin-bottom: 8.5px;
}

.sidebar ul li img  {
  margin-right: 5px; 
 
}
.sidebar ul li a:hover img  {
  margin-right: 10px; /* Thêm khoảng cách giữa biểu tượng và văn bản */
  background: #0b68a6;
  border-radius: 4px; 
}


/* main-right*/

legend {
    all: revert;
    font-weight: bold;
}

.alo {
    display: flex;
    flex-direction: column;
}

.form {
    display: flex;
    flex-wrap: wrap;
}

.secondary-infomation-1,
.secondary-infomation-2,
.main-infomation {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 5px;
    padding: 15px 30px;
}

select,
input {
    border: 1px solid;
    height: 40px;
    width: 170px;
}


.secondary-infomation-1 label,
.secondary-infomation-1 input[type="text"],
.secondary-infomation-1 input[type="date"],
.secondary-infomation-1 textarea,
.secondary-infomation-2 .employee label,
.secondary-infomation-2 .employee select,
.secondary-infomation-2 .employee input,
.secondary-infomation-2 .customer label,
.secondary-infomation-2 .customer select,
.secondary-infomation-2 .customer input,
.secondary-infomation-2 .disease-symptoms label,
.secondary-infomation-2 .disease-symptoms select,
.secondary-infomation-2 .disease-symptoms input,
.main-infomation .disease-symptoms label,
.main-infomation .disease-symptoms select,
.main-infomation .disease-symptoms input,
.main-infomation label,
.main-infomation input[type="number"] {
    font-size: 15px;
    margin: 0 5px;
    padding: 0 5px;
    border-radius: 5px;
}


.secondary-infomation-2 .employee input,
.secondary-infomation-2 .employee datalist {
    width: 170px; /* Đặt chiều rộng của input và datalist tương ứng */
    margin-right: 30px; /* Đặt khoảng cách giữa input và các phần tử khác */
}

.secondary-infomation-2 .employee datalist option {
    font-size: 15px; /* Đặt kích thước chữ cho các mục trong datalist */
    padding: 5px; /* Đặt khoảng cách bên trong mỗi mục trong datalist */
}

.secondary-infomation-2 .customer button {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    font-size:15px;
    color: green;
    cursor: pointer;
}

.secondary-infomation-2 .customer button:hover {
    color: darkgreen;
}

.error-message {
    color: red;
    font-size: 11px;
    margin-top: 1px;
}
.secondary-infomation-1 .erros-mess,
.secondary-infomation-2 .erros-mess {
    position: relative;
    display: flex;
    flex-direction: column;
}

.main-right {
    flex: 5;
    display: flex;
    flex-direction: row;
    border-radius: 7px;
}

.action2 {
    margin-left: 55%;
    padding: 2px 2px;
    margin-top: 8px;   
    display: flex;
    font-size: 15px;
}

.action2 button  {
    margin-right: 4px; /* Khoảng cách giữa các button */
}

.total {
  margin-top: 10px;
    font-size: 15px;
    margin-left: 75%;
}

.myTable {
  text-align: center;
  border-radius: 2px;
  width: 100%;
  border-collapse: collapse;
  boder-radius: 3px;
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
.row-scope{
  text-align: center;
}

.row-scope th{
  background-color: #449af8;
  color: white;
}

.selected-row{
  background-color: #082b34;
  color: white;
}

.btn i {
    margin-right: 4px; /* Khoảng cách giữa biểu tượng và chữ */
}
`;

 function RetailInvoice() {

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const highlightedRowRef = useRef(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [idMedicineDelete, setIdMedicineDelete] = useState(null);
  const deleteModalRef = useRef();
  const formik = useFormikContext();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const ResetFormContext = React.createContext();

  const resetForm = useContext(ResetFormContext);

  const [formData, setFormData] = useState({
    dateCreateF: '',
    noteF: '',
    employeeIdF: '',
    customerIdF: '',
    symptomIdF:'',
    totalF: '',
    medicineListF: [{ medicineIdF: '', medicineNameF: '', unitF: '', quantityF: '', retailPriceF: '' }],
  });

 

  useEffect(() => {
    fetchData();
  }, []); 

  
  const fetchData = async () => {
    try {
      const employeeData = await retailInvoice.findAllEmployee();
      const formattedEmployees = employeeData.data.map(employee => ({
        employeeId: employee.employeeId,
        employeeName: employee.employeeName
      }));
      setEmployees(formattedEmployees);

      const customerData = await retailInvoice.findAllCustomer();
      const formattedCustomer = customerData.data.map(customer => ({
        customerId: customer.customerId,
        customerName: customer.customerName
      }));
      setCustomers(formattedCustomer);

      const symptomData = await retailInvoice.findAllSymtom();
      const formattedSymtom = symptomData.data.map(symtom => ({
        symptomId: symtom.symptomId,
        symptomName: symtom.symptomName
      }));
      setSymptoms(formattedSymtom);

      const medicineData = await retailInvoice.findAllMedicine();
      const formattedMedicine = medicineData.data.map(medicine => ({
        medicineId: medicine.medicineId,
        medicineName: medicine.medicineName,
        retailPrice: medicine.retailPrice,
        unit: medicine.unit
      }));
      setMedicines(formattedMedicine);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isValueInList = (value, list) => list.some(item => item === value);

  const validationSchema = Yup.object({
    dateCreate: Yup.date()
      .max(new Date(), 'Ngày không thể trong tương lai')
      .required('Ngày lập không được bỏ trống'),
    employeeName: Yup.string()
      .test('is-in-list', 'Không có dữ liệu', value => isValueInList(value, employees.map(employee => employee.employeeName)))
      .required('Không được bỏ trống'),
    customerName: Yup.string()
      .test('is-in-list', 'Không có dữ liệu', value => isValueInList(value, customers.map(customer => customer.customerName)))
      .required('Không được bỏ trống'),
    medicineName: Yup.string()
      .test('is-in-list', 'Không có dữ liệu', value => isValueInList(value, medicines.map(medicine => medicine.medicineName)))
      .required('Không được bỏ trống'),
    quantity: Yup.number()
      .integer('Số lượng phải là số nguyên')
      .min(1, 'Số lượng phải lớn hơn 0')
      .required('Không được bỏ trống'),
  });
  
  
  const findIdByNameInList = (name, list) => {
    const selectedItem = list.find(item => item.employeeName === name || item.customerName === name || item.symptomName === name);
    return selectedItem ? selectedItem.employeeId || selectedItem.customerId || selectedItem.symptomId : null;
  };

  const handleAddInvoiceSubmit = async (values) => {
    try {
      const { dateCreate, note, employeeName, customerName, symptomName, medicineName, quantity } = values;
  
      if (isFirstTime) {
        const formattedFromDate = DateTime.fromISO(dateCreate).toFormat('yyyy-MM-dd');
        const employeeId = findIdByNameInList(employeeName, employees);
        const customerId = findIdByNameInList(customerName, customers);
        const symptomId = findIdByNameInList(symptomName, symptoms);
        
        const selectedMedicine = medicines.find(item => item.medicineName === medicineName);
        const medicineId = selectedMedicine ? selectedMedicine.medicineId : null;
        const retailPrice = selectedMedicine ? selectedMedicine.retailPrice : null;
        const unit = selectedMedicine ? selectedMedicine.unit : null;
  
        setFormData({
          dateCreateF: formattedFromDate,
          noteF: note,
          employeeIdF: employeeId,
          customerIdF: customerId,
          symptomIdF: symptomId,
          medicineListF: [{ medicineIdF: medicineId, medicineNameF: medicineName, unitF: unit, quantityF: quantity, retailPriceF: retailPrice }],
          
        });
        console.log(formData);
        setIsFirstTime(false); // Đặt lại giá trị của isFirstTime
      } else {
        // Xử lý thêm thuốc và số lượng vào danh sách medicineListF
        const selectedMedicine = medicines.find(item => item.medicineName === medicineName);
        const medicineId = selectedMedicine ? selectedMedicine.medicineId : null;
        const retailPrice = selectedMedicine ? selectedMedicine.retailPrice : null;
        const unit = selectedMedicine ? selectedMedicine.unit : null;
  
        // Tạo một đối tượng medicine mới và thêm vào danh sách
        const newMedicine = { medicineIdF: medicineId, medicineNameF: medicineName, unitF: unit, quantityF: quantity, retailPriceF: retailPrice };
        setFormData((prevData) => ({
          ...prevData,
          medicineListF: [...prevData.medicineListF, newMedicine],
        }));
        console.log(formData);
      }
    } catch (error) {
      console.error("Error in handleAddInvoiceSubmit:", error);
    }
  };
  
  const calculateTotal = () => {
    if (formData.medicineListF.length === 0) {
      return 0; // Trả về 0 nếu không có mục nào trong danh sách thuốc
    }
  
    // Sử dụng reduce để tính tổng tiền từ mảng medicineListF
    const total = formData.medicineListF.reduce((acc, medicine) => {
      const subtotal = medicine.quantityF * medicine.retailPriceF;
      return acc + subtotal;
    }, 0);
    return total;
  };

  const totalAmount = useMemo(() => calculateTotal(), [formData.medicineListF]);

  const handlePayment = async () => {
            if (isProcessingPayment) {
              return;
            }

            // Tính tổng tiền mới
            const newTotal = formData.medicineListF.reduce((acc, medicine) => {
              const subtotal = medicine.quantityF * medicine.retailPriceF;
              return acc + subtotal;
            }, 0);

            // Kiểm tra nếu tổng tiền mới là 0, hiện thông báo và không thực hiện thanh toán
            if (newTotal === 0) {
              toast.error('Hãy chọn thuốc vào hóa đơn');
              return;
            }

            try {
              setIsProcessingPayment(true);

              const updatedFormData = {
                ...formData,
                totalF: newTotal,
              };

              await retailInvoice.createInvoice(updatedFormData);

              // Reset form và hiển thị thông báo khi thanh toán thành công
              setFormData({
                dateCreateF: '',
                noteF: '',
                employeeIdF: '',
                customerIdF: '',
                symptomIdF: '',
                totalF: '',
                medicineListF: [{ medicineIdF: '', medicineNameF: '', unitF: '', quantityF: '', retailPriceF: '' }],
              });

              setIsFirstTime(true);

              toast.success('Thanh toán thành công');
            } catch (error) {
              console.error('Error in handlePayment:', error);
              toast.error('Thanh toán thất bại');
            } finally {
              setIsProcessingPayment(false);
            }
          };


  const highlightRow = (event, medicineId) => {
    const row = event.currentTarget;
    console.log(row);
    removeHighlight();

    if (highlightedRowRef.current) {
        highlightedRowRef.current.classList.remove('.selected-row');
    }

    if (row === selectedRow) {
        setSelectedRow(null);
        setIdMedicineDelete(null); // Bạn có thể set null khi không có hàng được chọn
    } else {
        row.classList.add('.selected-row');
        setSelectedRow(row);
        setIdMedicineDelete(medicineId);
        highlightedRowRef.current = row;
    }
};

  const removeHighlight = () => {
    const highlightedRow = document.querySelector('.selected-row');
    if (highlightedRow) {
      highlightedRow.classList.remove('.selected-row');
      setSelectedRow(null);
      setIdMedicineDelete(null); // Set to null when removing the highlight
    }
  };
  

  const handleDeleteButtonClick = () => {
    if (idMedicineDelete !== null) {
      const medicineToDelete = formData.medicineListF.find(
        (medicine) => medicine.medicineIdF === idMedicineDelete
      );

      if (medicineToDelete) {
        setMedicineToDelete(medicineToDelete.medicineNameF);
        setDeleteModalVisible(true);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (idMedicineDelete !== null) {
      setFormData((prevData) => {
        const updatedMedicineList = [...prevData.medicineListF];
        updatedMedicineList.splice(idMedicineDelete, 1);
        return { ...prevData, medicineListF: updatedMedicineList };
      });
      setDeleteModalVisible(false);
      setIdMedicineDelete(null);
      removeHighlight();
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    if (selectedRow !== null) {
      removeHighlight();
      setSelectedRow(null);
    }
  };

  const medicineData = [
    { label: 'ALFIGOLD 100mg', height: 35, width: 35, defaultValue: 2 },
    { label: 'ALFIGOLD 200mg', height: 38, width: 38, defaultValue: 2 },
    { label: 'ALFIGOLD 300mg', height: 38, width: 38, defaultValue: 2 },
    { label: 'ALFIGOLD 400mg', height: 38, width: 38, defaultValue: 2 },
    { label: 'ALFIGOLD 500mg', height: 38, width: 38, defaultValue: 2 },
    { label: 'ALFIGOLD 600mg', height: 38, width: 38, defaultValue: 2 },
    { label: 'ALFIGOLD 700mg', height: 38, width: 38, defaultValue: 2 },
  ];

    return (
        <>
            <Header/>
        <StyleReportChart>
    <section className="main">
        <Nav />
    <div className="main-right">
      <div className="container">
        <fieldset className="border p-2" style={{ borderRadius: '5px' }}>
          <legend className="w-auto">Bán lẻ</legend>
          <div className="alo">
          <Formik
                initialValues={{
                  invoiceId: '',
                  dateCreate: formData.dateCreateF,
                  note: '',
                  employeeName: formData.employeeIdF,
                  customerName: '',
                  systomName: '',
                  medicineName: '',
                  quantity: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddInvoiceSubmit}
              >        
              {({ values, handleChange, handleSubmit, resetForm }) => (
                <ResetFormContext.Provider value={resetForm}>
                  <Form onSubmit={handleSubmit} className="form">
                 <div className="secondary-infomation-1">
                      <div>
                      <label htmlFor="invoiceId" style={{ marginTop: '6.75px' }}>Số phiếu: </label>
                      <input type="text" id="invoiceId" name="invoiceId" style={{ marginLeft: '14px', marginRight: '30px' }} placeholder="TT00001" readOnly/>
                    
                      </div>
                      <div>
                      <label htmlFor="dateCreate" style={{ marginTop: '6.75px' }}>Ngày lập: </label>
                      <input type="date" id="dateCreate" name="dateCreate" style={{ marginLeft: '24px', marginRight: '33px' }}
                       value={values.dateCreate}
                       onChange={handleChange} />
                      <div className='erros-mess'> 
                          <ErrorMessage name="dateCreate" component="div" className="error-message"/>
                      </div>
                      </div>
                      <div>
                      <label htmlFor="note" style={{ marginTop: '6.75px' }}>Ghi chú : </label>
                      <textarea id="note" name="note" rows="1.5" cols="30" placeholder="Ghi chú" style={{ border: '.1rem solid rgba(0, 0, 0, .1)', verticalAlign: 'middle', paddingTop: '7px' }}
                       value={values.note}
                       onChange={handleChange}></textarea>
             
                      </div>

                        </div>
                <div className="secondary-infomation-2">
                    <div className="employee">
                      <label htmlFor="employeeName">Nhân viên: </label>
                      <input type="text" name="employeeName" id="employeeName" list="employeeList" placeholder="Tên nhân viên"  
                      value={values.employeeName}
                       onChange={handleChange}/>
                      <datalist id="employeeList">
                      {Array.isArray(employees) && employees.map((employee, index) => (
                          <option key={index} value={employee.employeeName} />
                        ))}
                      </datalist>
                      <div className='erros-mess'> 
                                <ErrorMessage name="employeeName" component="div" className="error-message"/>
                      </div>
                    </div>
                    <div className="customer">
                          <label htmlFor="customerName" aria-required="true">Khách hàng: </label>
                          <input type="text" name="customerName" id="customerName" list="customerList" placeholder="Tên khách hàng" 
                           value={values.customerName}
                           onChange={handleChange}/>
                          <datalist id="customerList">
                            {Array.isArray(customers) && customers.map((customer, index) => (
                              <option key={index} value={customer.customerName}/>
                            ))}
                          </datalist>
                          <button type="button" style={{ margin: '0%', padding: '0%', marginRight: '15px' }}><i className="bi bi-plus"></i></button>
                          <div className='erros-mess'> 
                                <ErrorMessage name="customerName" component="div" className="error-message"/>
                         </div>
                    </div>
                    <div className="disease-symptoms">
                        <label htmlFor="systomName">Triệu chứng: </label>
                        <input type="text" name="systomName" id="systomName" list="symptomList" placeholder="Tên triệu chứng"
                         value={values.systomName}
                         onChange={handleChange} />
                        <datalist id="symptomList">
                          {Array.isArray(symptoms) && symptoms.map((symptom, index) => (
                            <option key={index} value={symptom.symptomName} />
                          ))}
                        </datalist>
                    </div>
              </div>
              <div className="main-infomation">
                    <div className="disease-symptoms">
                      <label htmlFor="medicineName">Tên thuốc: </label>
                      <input type="text" name="medicineName" id="medicineName" list="medicineList" placeholder="Tên thuốc" style={{ marginRight: '29px' }}
                       value={values.medicineName}
                       onChange={handleChange}/>
                      <datalist id="medicineList">
                        {Array.isArray(medicines) && medicines.map((medicine, index) => (
                          <option key={index} value={medicine.medicineName} />
                        ))}
                      </datalist>
                      <div className='erros-mess'> 
                                <ErrorMessage name="medicineName" component="div" className="error-message"/>
                      </div>
                    </div>
                    <div>                   
                     <label htmlFor="quantity" style={{ marginTop: '6.75px' }}>Số lượng: </label>
                    <input type="number" id="quantity" name="quantity" style={{ marginLeft: '25px', marginRight: '36px' }} placeholder="0" 
                     value={values.quantity}
                     onChange={handleChange}
                    />
                    <div className='erros-mess'> 
                                <ErrorMessage name="quantity" component="div" className="error-message"/>
                    </div></div>
                    <div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginLeft: '10px' }}
                        // onClick={handleOpenDetailModal}
                      >
                        <span>
                          <i className="bi bi-file-earmark-ruled"></i> Nhập thuốc từ toa sẵn
                        </span>
                      </button>
                    </div>
                    
                              
              </div>
              <button type="submit" className="btn btn-primary" style={{ height: '40px', marginTop: '16px', marginLeft: '34.5px' }}><i className="bi bi-patch-plus"></i>Thêm</button>
           
              </Form>
             </ResetFormContext.Provider>
                        )}
                </Formik>
          </div>
        </fieldset>
        <br />
        <fieldset className="border p-2" style={{ borderRadius: '5px' }}>
          <legend className="w-auto">Danh sách thuốc</legend>
          <table className="myTable">
            <thead>
            <tr className="row-scope">
                <th>Tên thuốc</th>
                <th>Đơn vị tính</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
                {formData.medicineListF.map((medicine, index) => (
                      <tr 
                      className="table-row"
                      key={index}
                      onClick={(event) => {
                          highlightRow(event, medicine.medicineIdF);
                      }}
                  >              
                    <td>{medicine.medicineNameF}</td>
                    <td>{medicine.unitF}</td>
                    <td>{medicine.quantityF}</td>
                    <td>{medicine.retailPriceF} VNĐ</td>
                    <td>{medicine.quantityF * medicine.retailPriceF} VNĐ</td>
                  </tr>
                ))}
              </tbody>
          </table>
          <div className="total">
            <label htmlFor="total-money" style={{ marginRight: '5px'}}>Tổng tiền: </label>
            <input
              type="text"
              id="total-money"
              name="total-money"
              style={{ borderRadius: '5px', paddingLeft: '8px' }}
              readOnly
              value={totalAmount}
              placeholder="...VNĐ"
            />
          </div>
        </fieldset>
        <div className="action2">
        <button type="button" className="btn btn-primary" onClick={() => handlePayment(resetForm)}>
            <span className="em-1">
              <i className="bi bi-plus-circle"></i>
            </span>
            Thanh toán
          </button>
        
        
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteButtonClick}
        >
          <span className="em-1">
            <i className="bi bi-x-circle"></i>
          </span>
          Xoá thuốc
        </button>        
          <button type="button" className="btn btn-info"><span className="em-1"><i className="bi bi-printer"></i></span>In phiếu</button>
          <NavLink to={`/retailSale`} type="button" className="btn btn-secondary">
            <span className="em-1">
              <i className="bi bi-arrow-left-square"></i>
            </span>
            Trở về
          </NavLink>
        </div>
      </div>
    </div> 
        </section>
           

    {/* <!-- MODAL XÁC NHẬN XÓA --> */}
    <Modal show={isDeleteModalVisible} onHide={handleCancelDelete} ref={deleteModalRef}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá đơn thuốc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {medicineToDelete ? `Bạn có chắc chắn muốn xoá thuốc "${medicineToDelete}" hay không?` : 'Xác nhận xoá đơn thuốc?'}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>

        </StyleReportChart>
            </>
    );
}


export default RetailInvoice;
