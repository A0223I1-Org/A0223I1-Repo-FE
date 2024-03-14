import React, {useEffect, useRef, useState} from "react";
import './ListCustomer.css'

import * as CustomerService from "../../utils/InformationService/CustomerManagementService/CustomerService";
// import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';



export const ListCustomer = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [phonesValid,setPhonesValid] = useState([])
    const [duplicatePhone,setDuplicatePhone] = useState({})
    const [showAddModal, setShowAddModal] = useState(false); // State để điều khiển hiển thị modal thêm nhà cung cấp
    const [newCustomer, setNewCustomer] = useState({
        customerId: '',
        customerName: "",
        age: 18,
        address: "",
        phoneNumber: "",
        customerType: "",
        note: "",
        accountId: 0
    });
    const [selectedCustomer, setSelectedCustomer] = useState(
        {
            customerId: '',
            customerName: "",
            age: 18,
            address: "",
            phoneNumber: "",
            customerType: "",
            note: "",
            accountId: 0
        }
    );
    const [idCustomerDelete,  setIdCustomerDelete] = useState([]);
    const [searchType, setSearchType] = useState('customerName');
    const [searchValue, setSearchValue] = useState("");
    const [searchInput, setSearchInput] = useState(""); // Thêm state mới để lưu trữ giá trị tìm kiếm mới
    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);
    const [lastestCustomerId, setLastestCustomerId] = useState("")

    const generateCustomerId = () => {
        const currentNumber = parseInt(lastestCustomerId.slice(2), 10)
        const nextNumber = currentNumber + 1;
        const nextCustomerId = `KH${nextNumber.toString().padStart(2, "0")}`
        console.log(nextCustomerId)
        return nextCustomerId
    }

    const validPhone = async () =>{
        try{
            const result = await CustomerService.getAllphones();
            setPhonesValid(result)
            console.log(result)
        }
        catch (e){
            console.log(e)
        }
    }
    const fetchApi = async () => {
        try {
            const result = await CustomerService.findAllCustomer();
            // const result2 = await CustomerService.findAllCustomerIncludeDeleted();
            if (result.length > 0) {
                // Find the customer with the highest ID
                const latestCustomer = result.reduce((prev, current) => (parseInt(prev.customerId.slice(2), 10) > parseInt(current.customerId.slice(2), 10)) ? prev : current);
                setLastestCustomerId(latestCustomer.customerId);
            }
            console.log(lastestCustomerId)
            setCustomers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchSelectedCustomer = async (id) => {
        try {
            const result = await CustomerService.getCustomerById(id);
            console.log(result)
            setSelectedCustomer(result);
        } catch (error) {
            console.error('Error getting data:', error);
        }
    }
    const fetchCustomersBySearch = async () => {
        try {
            const result = await CustomerService.searchCustomer(searchType, searchValue);
            setCustomers(result);
            console.log(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        validPhone()
        fetchApi()
    }, [searchValue, searchType])

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value); // Cập nhật giá trị tìm kiếm mới
    };

    const handleSearch = () => {
        setSearchValue(searchInput); // Sử dụng giá trị tìm kiếm mới
        fetchCustomersBySearch(); // Gọi hàm tìm kiếm
    };
    const handleShowAddModal = () => {
        // const newCustomerId = generateCustomerId()
        // console.log(newCustomerId)
        // document.getElementById("createCustomerId").value = newCustomerId
        setShowAddModal(true); // Khi bấm vào nút "Thêm mới", hiển thị modal thêm khách hàng
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false); // Đóng modal thêm nhà cung cấp
    };
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

    const handleDeleteButtonClick = () => {
        if (selectedRow) {
            const deleteItem = selectedRow.querySelector('.row-name').textContent;
            const deleteModal = document.getElementById('deleteModal');
            deleteModal.classList.add('show');
            deleteModal.style.display = 'block';
        }
    };

    const handleConfirmDelete = async () => {
        await CustomerService.deleteCustomer(idCustomerDelete);
        // toast.success('Xóa khánh hàng ${customers.find((x) => x.customerId === idCustomerDelete)?.customerName} thành công.')
        await fetchApi();
        const deleteModal = document.getElementById('deleteModal');
        deleteModal.classList.remove('show');
        deleteModal.style.display = 'none';
        removeHighlight();
    };

    const handleCancelDelete = () => {
        const deleteModal = document.getElementById('deleteModal');
        deleteModal.classList.remove('show');
        deleteModal.style.display = 'none';
        setSelectedRow(null);
        removeHighlight();
    };

    const handleEditButtonClick = async () => {
        if (selectedRow) {
            try {
                const customer = selectedCustomer;
                const editModal = document.getElementById('editModal');
                document.getElementById('customerId').value = customer.customerId;
                document.getElementById('customerName').value = customer.customerName;
                document.getElementById('address').value = customer.address;
                document.getElementById('age').value = customer.age;
                document.getElementById('phoneNumber').value = customer.phoneNumber;
                document.getElementById('customerType').value = customer.customerType;
                document.getElementById('note').value = customer.note;

                editModal.classList.add('show');
                editModal.style.display = 'block';
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        } else {
            alert('Chọn khách hàng cần chỉnh sửa');
        }
    };
    const saveChanges = async () => {
        resetErrorMessages()
        let isValid = true
        const newCustomer = selectedCustomer
        const customerId = document.getElementById('customerId').value
        const customerName = document.getElementById('customerName').value
        const customerAddress = document.getElementById('address').value
        const customerAge = document.getElementById('age').value
        const customerPhone = document.getElementById('phoneNumber').value
        const customerType = document.getElementById('customerType').value
        const customerNote = document.getElementById('note').value


        const nameRegex = /^[a-zA-Z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểđìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷ]+$/
        const ageRegex = /^(1[8-9]|[2-6][0-9]|70)$/
        const addressRegex = /^[a-zA-Z0-9\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểđìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷ]+$/
        const phoneRegex = /^0\d{9}$/

        if (customerName.trim() === ""){
            displayErrorMessage("updateCustomerNameError", "Tên khách hàng không được để trống.");
            isValid = false
        }
        else if (!nameRegex.test(customerName.trim())) {
            displayErrorMessage("updateCustomerNameError", "Tên khách hàng không đúng định dạng.");
            isValid = false;
        }
        if(customerAge.trim() === ""){
            displayErrorMessage("updateCustomerAgeError", "Tuổi không được để trống.");
            isValid = false
        }
        else if(!ageRegex.test(customerAge)){
            displayErrorMessage("updateCustomerAgeError", "Tuổi phải là số từ 18 đến 70.");
            isValid = false
        }
        if(customerAddress.trim() === ""){
            displayErrorMessage("updateCustomerAddressError", "Địa chỉ không được để trống .");
            isValid = false
        }
        else if(!addressRegex.test(customerAddress)){
            displayErrorMessage("updateCustomerAddressError", "Địa chỉ không chứa ký tự đặc biệt .");
            isValid = false
        }
        if(customerPhone.trim() === ""){
            displayErrorMessage("updateCustomerPhoneNumberError", "Số điện thoại không được để trống.");
            isValid = false
        }
        else if(!phoneRegex.test(customerPhone)){
            displayErrorMessage("updateCustomerPhoneNumberError", "Số điện thoại gồm 10 chữ số, bắt đầu từ số 0.");
            isValid = false
        }
        if(customerType === ""){
            displayErrorMessage("updateCustomerTypeError", "Bắt buộc chọn loại khách hàng.");
            isValid = false
        }
        if(isValid) {
            newCustomer.customerId = customerId
            newCustomer.customerName = customerName
            newCustomer.address = customerAddress
            newCustomer.age = customerAge
            newCustomer.phoneNumber = customerPhone
            newCustomer.customerType = customerType
            newCustomer.note = customerNote
            await CustomerService.updateCustomer(newCustomer)
            closeModal()
            alert('🦄 Sửa thành công')
            fetchApi()
            removeHighlight()
        }
    };
    const saveCreate = async () => {
        resetErrorMessages()
        let isValid = true
        const newCreateCustomer = newCustomer
        const customerId = document.getElementById('createCustomerId').value
        const customerName = document.getElementById('createCustomerName').value
        const customerAddress = document.getElementById('createCustomerAddress').value
        const customerAge = document.getElementById('createCustomerAge').value
        const customerPhone = document.getElementById('createCustomerPhoneNumber').value
        const customerType = document.getElementById('createCustomerType').value
        const customerNote = document.getElementById('createCustomerNote').value

        const nameRegex = /^[a-zA-Z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểđìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷ]+$/
        const ageRegex = /^(1[8-9]|[2-6][0-9]|70)$/
        const addressRegex = /^[a-zA-Z0-9\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểđìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷ]+$/
        const phoneRegex = /^0\d{9}$/

        for (let i of phonesValid){
            if(customerPhone === i){
                setDuplicatePhone(customerPhone)
                break
            }
        }
        if (customerName.trim() === ""){
            displayErrorMessage("createCustomerNameError", "Tên khách hàng không được để trống.");
            isValid = false
        }
        else if (!nameRegex.test(customerName.trim())) {
            displayErrorMessage("createCustomerNameError", "Tên khách hàng không đúng định dạng.");
            isValid = false;
        }
        if(customerAge.trim() === ""){
            displayErrorMessage("createCustomerAgeError", "Tuổi không được để trống.");
            isValid = false
        }
        else if(!ageRegex.test(customerAge)){
            displayErrorMessage("createCustomerAgeError", "Tuổi phải là số từ 18 đến 70.");
            isValid = false
        }
        if(customerAddress.trim() === ""){
            displayErrorMessage("createCustomerAddressError", "Địa chỉ không được để trống .");
            isValid = false
        }
        else if(!addressRegex.test(customerAddress)){
            displayErrorMessage("createCustomerAddressError", "Địa chỉ không chứa ký tự đặc biệt .");
            isValid = false
        }
        if(customerPhone.trim() === ""){
            displayErrorMessage("createCustomerPhoneNumberError", "Số điện thoại không được để trống.");
            isValid = false
        }
        else if(!phoneRegex.test(customerPhone)){
            displayErrorMessage("createCustomerPhoneNumberError", "Số điện thoại gồm 10 chữ số, bắt đầu từ số 0.");
            isValid = false
        }
        else if(customerPhone === duplicatePhone){
            displayErrorMessage("createCustomerPhoneNumberError", "Số điện thoại đã tồn tại.");
            isValid = false
        }
        if(customerType === ""){
            displayErrorMessage("createCustomerTypeError", "Bắt buộc chọn loại khách hàng.");
            isValid = false
        }

        if(isValid) {
            newCreateCustomer.customerId = customerId
            newCreateCustomer.customerName = customerName
            newCreateCustomer.address = customerAddress
            newCreateCustomer.age = customerAge
            newCreateCustomer.phoneNumber = customerPhone
            newCreateCustomer.customerType = customerType
            newCreateCustomer.note = customerNote
            await CustomerService.createCustomer(newCreateCustomer)
            alert("Thêm mới khách hàng thành công ");
            isValid = true
            closeModal()
            fetchApi()
            setLastestCustomerId(newCreateCustomer.customerId)
            handleCloseAddModal();
        }

    }
    function displayErrorMessage(fieldId, message) {
        const errorSpan = document.getElementById(fieldId);
        if (errorSpan) {
            errorSpan.innerText = message;
        }
    }

    function resetErrorMessages() {
        const errorSpans = document.querySelectorAll(".error-message");
        errorSpans.forEach((span) => {
            span.innerText = "";
        });
    }

    const closeModal = () => {
        const modal = document.getElementById('editModal');
        modal.style.display = 'none'
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="boloc">
                        <fieldset className="border rounded-3 p-3">
                            <legend><b>Bộ lọc</b></legend>
                            <div style={{display: "flex"}}>
                                <div className="search-selected">
                                    <span>Lọc theo</span>
                                    <a style={{display: "flex", alignItems: "center"}}>
                                        <select className="form-select" value={searchType}
                                                onChange={handleSearchTypeChange}>
                                            <option value="customerType">Nhóm khách hàng</option>
                                            <option value="customerName">Tên khách hàng</option>
                                            <option value="customerAge">Tuổi khách hàng</option>
                                        </select>
                                        <input type="text" className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"
                                               value={searchInput}
                                               onChange={handleSearchInputChange}
                                        />
                                        <button className="myButton" type="submit" onClick={handleSearch}>
                                            <i className="bi bi-search"></i> Tìm kiếm
                                        </button>
                                    </a>
                                </div>
                                <div className="sort">
                                    <span>Sắp xếp theo</span>
                                    <a>
                                        <select className="form-select">
                                            <option selected>Vui lòng chọn</option>
                                            <option value="Nhóm khách hàng">Nhóm khách hàng</option>
                                            <option value="Tên khách hàng">Tên khách hàng</option>
                                            <option value="Địa chỉ">Địa chỉ</option>
                                            <option value="SĐT">Số điện thoại</option>
                                        </select>
                                    </a>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border rounded-3 p-3">
                            <legend><b>Danh sách khách hàng</b></legend>
                            <table className="myTable">
                                <thead>
                                <tr className="row-scope">
                                    <td>Mã khách hàng</td>
                                    <td>Tên khách hàng</td>
                                    <td>Tuổi</td>
                                    <td>Địa chỉ</td>
                                    <td>SĐT</td>
                                    <td>Nhóm khách hàng</td>
                                    <td>Ghi chú</td>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map((customer, index) => (
                                    <tr className="table-row" key={index} onClick={(event) => {
                                        setIdCustomerDelete(customer.customerId);
                                        highlightRow(event)
                                        fetchSelectedCustomer(customer.customerId)
                                    }}>
                                        <td>{customer.customerId}</td>
                                        <td className="row-name">{customer.customerName}</td>
                                        <td>{customer.age}</td>
                                        <td className="row-address">{customer.address}</td>
                                        <td>{customer.phoneNumber}</td>
                                        <td>{customer.customerType}</td>
                                        <td>{customer.note}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item"><span className="page-link" href="#">Trước</span></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><span className="page-link" href="#">Sau</span></li>
                                </ul>
                            </nav>
                        </fieldset>
                    </div>
                    <div className="chucNang">
                        <button type="button" className="btn btn-secondary" style={{width: "auto"}}><i
                            className="bi bi-info-square"></i> Thông tin chi tiết
                        </button>
                        <button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                            <i className="bi bi-plus-circle"></i> Thêm
                        </button>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#editModal"
                                className="btn btn-custom" onClick={handleEditButtonClick}><i
                            className="bi bi-pencil-square"></i> Sửa
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteButtonClick}>
                            <i className="bi bi-x-circle"></i> Xóa
                        </button>
                        <button type="button" className="btn btn-primary"><i
                            className="bi bi-arrow-return-left"></i> Trở về
                        </button>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            {/* Modal Delete*/}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa khách hàng
                            <span style={{color: "red"}}>
                                 <b>{customers.find((x) => x.customerId === idCustomerDelete)?.customerName}</b>
                            </span> không?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={handleCancelDelete}>Hủy
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal update*/}
            <div className="modal fade" tabIndex="-1" id="editModal" aria-labelledby="editModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="editModalLabel">Sửa Thông Tin Khách Hàng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="customerId" className="form-label modal-label">Mã khách
                                        hàng</label>
                                    <input type="text" className="form-control" id="customerId"
                                           name="customerId"
                                           style={{background: "gray", color: "blue"}}
                                           readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label modal-label">Tên khách
                                        hàng</label>
                                    <input type="text" className="form-control" id="customerName"
                                           name="customerName" />
                                    <span className="error-message" style={{color: "#dc3545"}} id="updateCustomerNameError"></span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age"
                                           className="form-label modal-label">Tuổi </label>
                                    <input type="text" className="form-control" id="age"
                                           name="age" />
                                    <span className="error-message" style={{color: "#dc3545"}} id="updateCustomerAgeError"></span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label modal-label">Địa
                                        chỉ</label>
                                    <input type="text" className="form-control" id="address"
                                           name="address" />
                                    <span className="error-message" style={{color: "#dc3545"}} id="updateCustomerAddressError"></span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label modal-label">Điện
                                        thoại</label>
                                    <input type="tel" className="form-control" id="phoneNumber"
                                           name="phoneNumber"  placeholder="ex: 0972346898"/>
                                    <span className="error-message" style={{color: "#dc3545"}} id="updateCustomerPhoneNumberError"></span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerType" className="form-label modal-label">Nhóm
                                        khách hàng: </label>
                                    <select  id="customerType" name="customerType"
                                             className="form-control">
                                        <option value="">--Chọn--</option>
                                        <option value="Khách lẻ">Khách lẻ</option>
                                        <option value="Khách sỉ">Khách sỉ</option>
                                        <option value="Khách theo đơn">Khách theo đơn</option>
                                    </select>
                                    <span className="error-message" style={{color: "#dc3545"}} id="updateCustomerTypeError"></span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="note" className="form-label modal-label">Ghi
                                        chú</label>
                                    <textarea className="form-control" id="note"
                                              name="note" rows="3"></textarea>
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="submit" onClick={saveChanges} className="btn btn-success"
                                        id="btnSaveEdit">
                                    <i className="bi bi-plus-circle"></i> Chấp nhận
                                </button>
                                <button type="reset" className="btn btn-secondary"><i
                                    className="bi bi-arrow-clockwise"></i> Đặt lại
                                </button>
                                <button type="button" data-dismiss="modal" onClick={closeModal}
                                        className="btn btn-primary"><i
                                    className="bi bi-arrow-return-left"></i> Trở về
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal create*/}
            {showAddModal && (
                <div className="modal fade show" tabIndex="-1" style={{display: "block"}}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="addCustomerModalLabel">Thêm mới khách hàng</h5>
                                <button type="button" className="btn-close" onClick={handleCloseAddModal}
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerId" className="form-label modal-label">Mã khách
                                            hàng</label>
                                        <input type="text" className="form-control" id="createCustomerId"
                                               name="createCustomerId"
                                               style={{background: "gray", color: "blue"}}
                                               value={generateCustomerId()} readOnly/>

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerName" className="form-label modal-label">Tên khách
                                            hàng</label>
                                        <input type="text" className="form-control" id="createCustomerName"
                                               name="createCustomerName" />
                                        <span className="error-message" style={{color: "#dc3545"}} id="createCustomerNameError"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerAge"
                                               className="form-label modal-label">Tuổi: </label>
                                        <input type="text" className="form-control" id="createCustomerAge"
                                               name="createCustomerAge"/>
                                        <span className="error-message" style={{color: "#dc3545"}} id="createCustomerAgeError"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerAddress" className="form-label modal-label">Địa
                                            chỉ</label>
                                        <input type="text" className="form-control" id="createCustomerAddress"
                                               name="createCustomerAddress"/>
                                        <span className="error-message" style={{color: "#dc3545"}} id="createCustomerAddressError"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerPhoneNumber" className="form-label modal-label">Điện
                                            thoại</label>
                                        <input type="tel" className="form-control" id="createCustomerPhoneNumber"
                                               name="createCustomerPhoneNumber" placeholder="ex: 0972346898" />
                                        <span className="error-message" style={{color: "#dc3545"}} id="createCustomerPhoneNumberError"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerType" className="form-label modal-label">Nhóm
                                            khách hàng: </label>
                                        <select required id="createCustomerType" name="createCustomerType"
                                                className="form-control">
                                            <option value="">--Chọn--</option>
                                            <option value="Khách lẻ">Khách lẻ</option>
                                            <option value="Khách sỉ">Khách sỉ</option>
                                            <option value="Khách theo đơn">Khách theo đơn</option>
                                        </select>
                                        <span className="error-message" style={{color: "#dc3545"}} id="createCustomerTypeError"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="createCustomerNote" className="form-label modal-label">Ghi
                                            chú</label>
                                        <textarea className="form-control" id="createCustomerNote"
                                                  name="createCustomerNote" rows="3"></textarea>
                                    </div>
                                </form>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" onClick={saveCreate}><i
                                        className="bi bi-plus-circle"></i> Thêm
                                    </button>
                                    <button type="reset" className="btn btn-secondary"><i
                                        className="bi bi-arrow-clockwise"></i> Đặt lại
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleCloseAddModal}><i
                                        className="bi bi-arrow-return-left"></i> Trở về
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}