import React, { useEffect, useRef, useState } from "react";
import * as SupplierService from "../../utils/InformationService/SupplierManagementService/SupplierService";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import * as Yup from 'yup';
import styled from 'styled-components';

const StyledContainer = styled.div`
    body {
    font-family: Poppins, serif;
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
.boloc fieldset {
    flex: 1;
    margin-right: 15px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .boloc fieldset {
        margin-right: 0;
        margin-bottom: 15px;
    }
}
legend b{
    font-size: 20px;
}
@media (max-width: 576px) {
    .boloc fieldset {
        flex: 100%;
    }
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
@media (max-width: 768px) {
    .sort {
        margin-left: 0;
        margin-top: 10px;
    }
}

@media (max-width: 576px) {
    .sort {
        flex: 100%;
    }
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
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
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
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2px;
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



`;


export const Supplier = () => {
    const defaultSearchType = "supplierId";
    const defaultOrderBy = "supplierId";

    const [suppliers, setSuppliers] = useState([]);
    const [searchType, setSearchType] = useState("supplierId");
    const [searchValue, setSearchValue] = useState("");
    const [orderBy, setOrderBy] = useState("supplierId");
    const [idSupplierDelete, setIdSupplierDelete] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);
    const [searchInput, setSearchInput] = useState("");
    const [errors, setErrors] = useState({});
    const [totalItems, setTotalItems] = useState(0); // Thêm state cho tổng số mục
    const [totalPages, setTotalPages] = useState(0); // Thêm state cho tổng số trang
    const [showAddModal, setShowAddModal] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [newSupplierData, setNewSupplierData] = useState({
        supplierId: "",
        supplierName: "",
        address: "",
        phoneNumber: "",
        email: "",
        note: ""
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editSupplierData, setEditSupplierData] = useState(null);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null); // Thêm state để lưu trữ ID của nhà cung cấp được chọn để chỉnh sửa
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Số mục trên mỗi trang

    const fetchSuppliers = async (page, size) => {
        try {
            // Lấy danh sách nhà cung cấp từ API với thứ tự sắp xếp được chỉ định
            const result = await SupplierService.findAllSupplier(orderBy, searchType, searchValue, page, size);

            // Đếm tổng số phần tử từ API
            const totalCount = await SupplierService.findAllSupplier(orderBy, searchType, searchValue);

            // Tính tổng số trang dựa trên tổng số phần tử và số phần tử trên mỗi trang
            const totalPageCount = Math.ceil(totalCount.length / size);

            // Cập nhật tổng số trang và tổng số phần tử
            setTotalPages(totalPageCount);
            setTotalItems(totalCount);
            // Kiểm tra và cập nhật lại trang hiện tại nếu cần
            if (currentPage >= totalPageCount) {
                setCurrentPage(totalPageCount - 1);
            }
            // Cập nhật danh sách nhà cung cấp
            setSuppliers(result);

            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSuppliers(currentPage, itemsPerPage);
    }, [searchType, searchValue, orderBy, currentPage, itemsPerPage, totalPages]);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handlePaginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        console.log("current page is: ",pageNumber);
        fetchSuppliers(pageNumber, itemsPerPage);
    };
    const highlightRow = (event, supplier) => {
        const row = event.currentTarget;
        removeHighlight();
        if (highlightedRowRef.current) {
            highlightedRowRef.current.classList.remove('selected-row');
        }
        if (row === selectedRow) {
            setSelectedRow(null);
            setIdSupplierDelete(null);
            setSelectedSupplierId(null); // Reset selectedSupplierId khi không có hàng nào được chọn
        } else {
            row.classList.add('selected-row');
            setSelectedRow(row);
            highlightedRowRef.current = row;
            setIdSupplierDelete(supplier.supplierId);
            setSelectedSupplierId(supplier.supplierId); // Lưu ID của nhà cung cấp được chọn
        }
    };
    const removeHighlight = () => {
        const highlightedRow = document.querySelector('.selected-row');
        if (highlightedRow) {
            highlightedRow.classList.remove('selected-row');
        }
    };
    const handleSortChange = (event) => {
        const newOrderBy = event.target.value;
        setOrderBy(newOrderBy); // Cập nhật giá trị orderBy ngay lập tức
        fetchSuppliers(currentPage, itemsPerPage); // Gọi fetchSuppliers với thứ tự mới
    };
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    const handleSearch = async () => {
        setSearchValue(searchInput); // Cập nhật giá trị của searchValue từ searchInput
        setCurrentPage(0); // Reset trang về trang đầu tiên khi thực hiện tìm kiếm
        await fetchSuppliers(0, itemsPerPage); // Gọi hàm fetchSuppliers với trang hiện tại và số lượng mục trên mỗi trang
    };
    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleReset = () => {
        setSearchType(defaultSearchType);
        setSearchValue("");
        setSearchInput("");
        setOrderBy(defaultOrderBy);
        setIdSupplierDelete(null);
        setCurrentPage(0);
        setSelectedRow(null);
    };

    const supplierSchema = Yup.object().shape({
        supplierId: Yup.string().required('Vui lòng nhập mã nhà cung cấp').max(50, 'Mã nhà cung cấp không được quá 50 ký tự'),
        supplierName: Yup.string().required('Vui lòng nhập tên nhà cung cấp').max(50, 'Tên nhà cung cấp không được quá 50 ký tự'),
        address: Yup.string().max(255, 'Địa chỉ không được quá 255 ký tự'),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các số và bắt đầu bằng số 0').max(11, 'Số điện thoại không được quá 11 ký tự'),
        email: Yup.string().email('Email không hợp lệ').max(50, 'Email không được quá 50 ký tự'),
        note: Yup.string().max(255, 'Ghi chú không được quá 255 ký tự'),
    });
    const validateSupplierData = async (supplierData) => {
        try {
            await supplierSchema.validate(supplierData, { abortEarly: false });
            return {}; // Không có lỗi
        } catch (errors) {
            // Chuyển đổi các lỗi thành định dạng key-value để dễ dàng hiển thị
            const formattedErrors = {};
            errors.inner.forEach(error => {
                formattedErrors[error.path] = error.message;
            });
            return formattedErrors;
        }
    };
    const resetErrors = () => {
        setErrors({});
    };
    const handleShowAddModal = () => {
        setShowAddModal(true);
    };
    const handleAddSupplier = async () => {
        const errors = await validateSupplierData(newSupplierData);
        if (Object.keys(errors).length === 0) {
            try {
                const existingSupplier = suppliers.find(supplier => supplier.supplierId === newSupplierData.supplierId);
                const existingName = suppliers.find(supplier => supplier.supplierName === newSupplierData.supplierName);
                const existingPhoneNumber = suppliers.find(supplier => supplier.phoneNumber === newSupplierData.phoneNumber);
                const existingEmail = suppliers.find(supplier => supplier.email === newSupplierData.email);


                if (existingSupplier) {
                    toast('Mã nhà cung cấp đã tồn tại. Vui lòng chọn mã khác!');
                    return;
                }
                if (existingName) {
                    toast('Tên nhà cung cấp đã tồn tại. Vui lòng nhập tên khác!');
                    return;
                }
                if (existingPhoneNumber) {
                    toast('Số điện thoại đã được dùng. Vui lòng nhập số khác!');
                    return;
                }
                if (existingEmail) {
                    toast('Email đã được dùng. Vui lòng nhập email khác!');
                    return;
                }
                await SupplierService.addSupplier(newSupplierData);
                await fetchSuppliers();
                handleCloseAddModal();
                setIsFormSubmitted(true); // Set isFormSubmitted to true after successful addition
                toast('🦄Thêm nhà cung cấp thành công!');
            } catch (error) {
                console.error('Error adding supplier:', error);
                toast('Xảy ra lỗi khi thêm nhà cung cấp!');
            }
        } else {
            console.error('Validation errors:', errors);
            setErrors(errors);
            toast('Vui lòng nhập đúng thông tin!');
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewSupplierData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setIsFormSubmitted(false);
        resetErrors(); // Xóa các lỗi khi đóng modal
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
        await SupplierService.deleteSupplier(idSupplierDelete);
        await fetchSuppliers();
        const deleteModal = document.getElementById('deleteModal');
        deleteModal.classList.remove('show');
        deleteModal.style.display = 'none';
        toast('🦄Xóa nhà cung cấp thành công!');

        removeHighlight();
    };
    const handleCancelDelete = () => {
        const deleteModal = document.getElementById('deleteModal');
        deleteModal.classList.remove('show');
        deleteModal.style.display = 'none';
        setSelectedRow(null);
        removeHighlight();
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditSupplierData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setIsFormSubmitted(false);
        resetErrors(); // Xóa các lỗi khi đóng modal
        removeHighlight();
    };
    const handleShowEditModal = () => {
        if (selectedRow) {
            if (selectedSupplierId) {
                const selectedSupplier = suppliers.find(supplier => supplier.supplierId === selectedSupplierId);
                setEditSupplierData(selectedSupplier);
                setShowEditModal(true);
            } else {
                console.error('Selected row does not contain supplierId.');
            }
        } else {
            console.error('No row selected.');
        }
    };
    const handleEditSupplier = async () => {
        const errors = await validateSupplierData(editSupplierData);
        if (Object.keys(errors).length === 0) {
            try {
                await SupplierService.updateSupplier(selectedSupplierId, editSupplierData);
                await fetchSuppliers();

                handleCloseEditModal();
                setIsFormSubmitted(true); // Set isFormSubmitted to true after successful addition

                toast('🦄Cập nhật nhà cung cấp thành công!');
            } catch (error) {
                console.error('Error updating supplier:', error);
                toast('Xảy ra lỗi khi cập nhật nhà cung cấp!');
            }
        } else {
            console.error('Validation errors:', errors);
            setErrors(errors); // Cập nhật giá trị của errors
            toast('Vui lòng nhập đúng thông tin!');
        }
        removeHighlight();
    };

    return (
        <StyledContainer>
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="boloc">
                            <fieldset className="border rounded-3 p-3">
                                <legend><b>Bộ lọc</b></legend>
                                <div style={{ display: "flex" }}>
                                    <div className="search-selected">
                                        <span>Lọc theo</span>
                                        <a style={{ display: "flex", alignItems: "center" }}>
                                            <select className="form-select" value={searchType} onChange={handleSearchTypeChange}>
                                                <option value="supplierId">Mã nhà cung cấp</option>
                                                <option value="supplierName">Tên nhà cung cấp</option>
                                                <option value="address">Địa chỉ</option>
                                                <option value="phoneNumber">Số điện thoại</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-sm"
                                                value={searchInput}
                                                onChange={handleSearchInputChange}
                                            />
                                            <button className="myButton" onClick={handleSearch}>
                                                <i className="bi bi-search"></i>Lọc kết quả
                                            </button>
                                        </a>
                                    </div>
                                    <div className="sort">
                                        <span>Sắp xếp theo</span>
                                        <a>
                                            <select className="form-select" value={orderBy} onChange={handleSortChange}>
                                                <option value="supplierId">Mã nhà cung cấp</option>
                                                <option value="supplierName">Tên nhà cung cấp</option>
                                                <option value="address">Địa chỉ</option>
                                                <option value="phoneNumber">Số điện thoại</option>
                                            </select>
                                        </a>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="border rounded-3 p-3">
                                <legend><b>Danh sách nhà cung cấp</b></legend>
                                <table className="myTable">
                                    <thead>
                                    <tr className="row-scope">
                                        <th>Mã nhà cung cấp</th>
                                        <th>Tên nhà cung cấp</th>
                                        <th>Địa chỉ</th>
                                        <th>SĐT</th>
                                        <th>Công nợ</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {suppliers && suppliers.length > 0 ? (
                                        suppliers.map((supplier, index) => (
                                            <tr className="table-row" key={index} onClick={(event) => highlightRow(event, supplier)}>
                                                <td className="row-id">{supplier.supplierId}</td>
                                                <td className="row-name">{supplier.supplierName}</td>
                                                <td className="row-address">{supplier.address}</td>
                                                <td>{supplier.phoneNumber}</td>
                                                <td>{supplier.toPayDebt.toLocaleString()} đ</td>
                                                <td>{supplier.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {currentPage !== 0 && (
                                            <li className="page-item">
                                                <span className="page-link" onClick={() => handlePaginate(currentPage - 1)}>Trước</span>
                                            </li>
                                        )}

                                        {Array.from({ length: totalPages }, (_, index) => {
                                            // Kiem tra neu index trang gan voi trang hien tai
                                            if (index === 0 || index === totalPages - 1 || Math.abs(currentPage - index) <= 2) {
                                                return (
                                                    <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                                                        <span className="page-link" onClick={() => handlePaginate(index)}>{index + 1}</span>
                                                    </li>
                                                );
                                            } else if (Math.abs(currentPage - index) === 3) {
                                                // Hien thi '...' neu khoang cach giua trang va trang hien tai la 3
                                                return <li key={index} className="page-item disabled"><span className="page-link">...</span></li>;
                                            }
                                            return null;
                                        })}
                                        {currentPage !== totalPages - 1 && (
                                            <li className="page-item">
                                                <span className="page-link" onClick={() => handlePaginate(currentPage + 1)}>Sau</span>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </fieldset>
                        </div>
                        <div className="chucNang">
                            <button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                                <i className="bi bi-plus-circle"></i> Thêm
                            </button>
                            <button type="button" className="btn btn-custom" onClick={handleShowEditModal}>
                                <i className="bi bi-pencil-square"></i> Sửa
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteButtonClick}>
                                <i className="bi bi-x-circle"></i> Xóa
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleReset}>
                                <i className="bi bi-arrow-return-left"></i> Trở về
                            </button>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
                {/* Modal xoá */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="deleteModalLabel">Xác nhận xóa</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                Bạn có chắc chắn muốn xóa nhà cung cấp <span id="deleteItem" className="text-danger">
                    {suppliers.find((x) => x.supplierId === idSupplierDelete)?.supplierName}
                </span> không?
                                <p></p>
                                <p className="text-danger"><i>Lưu ý: thao tác này không được hoàn tác</i></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelDelete}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal thêm */}
                {showAddModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h5 className="modal-title w-100" id="addSupplierModalLabel">Thêm Nhà Cung Cấp Mới</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseAddModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="supplierId" className="form-label modal-label">Mã nhà cung cấp</label>
                                            <input type="text" className="form-control" id="supplierId" name="supplierId" placeholder="ex: DOMESCO" onChange={handleChange} required />
                                            {errors.supplierId && <div className="text-danger">{errors.supplierId}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierName" className="form-label modal-label">Tên nhà cung cấp</label>
                                            <input type="text" className="form-control" id="supplierName" name="supplierName" placeholder="ex: Công ty DOMESCO" onChange={handleChange} required />
                                            {errors.supplierName && <div className="text-danger">{errors.supplierName}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierAddress" className="form-label modal-label">Địa chỉ</label>
                                            <input type="text" className="form-control" id="supplierAddress" name="address" placeholder="ex: 123 Phan Đăng Lưu, Đà Nẵng" onChange={handleChange}/>
                                            {errors.address && <div className="text-danger">{errors.address}</div>}

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierPhone" className="form-label modal-label">Điện thoại</label>
                                            <input type="tel" className="form-control" id="supplierPhone" name="phoneNumber" placeholder="ex: 0972346898" onChange={handleChange}/>
                                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierEmail" className="form-label modal-label">Email</label>
                                            <input type="email" className="form-control" id="supplierEmail" name="email" placeholder="ex: abc123@gmail.com" onChange={handleChange}/>
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierNote" className="form-label modal-label">Ghi chú</label>
                                            <textarea className="form-control" id="supplierNote" name="note" rows="3" onChange={handleChange}></textarea>
                                            {errors.note && <div className="text-danger">{errors.note}</div>}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" onClick={handleAddSupplier} disabled={isFormSubmitted}><i className="bi bi-plus-circle"></i>Thêm</button>
                                    <button type="button" className="btn btn-primary" onClick={handleCloseAddModal}><i className="bi bi-arrow-return-left"></i>Trở về</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal sửa */}
                {showEditModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h5 className="modal-title w-100" id="editSupplierModalLabel">Sửa Thông Tin Nhà Cung Cấp</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseEditModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        {/* Điền thông tin nhà cung cấp được chọn vào các input */}
                                        <div className="mb-3">
                                            <label htmlFor="supplierId" className="form-label modal-label">Mã nhà cung cấp</label>
                                            <input type="text" className="form-control" id="supplierId" name="supplierId" value={editSupplierData.supplierId} onChange={handleEditChange} required />
                                            {errors.supplierId && <div className="text-danger">{errors.supplierId}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierName" className="form-label modal-label">Tên nhà cung cấp</label>
                                            <input type="text" className="form-control" id="supplierName" name="supplierName" value={editSupplierData.supplierName} onChange={handleEditChange} required />
                                            {errors.supplierName && <div className="text-danger">{errors.supplierName}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierAddress" className="form-label modal-label">Địa chỉ</label>
                                            <input type="text" className="form-control" id="supplierAddress" name="address" value={editSupplierData.address} onChange={handleEditChange} />
                                            {errors.address && <div className="text-danger">{errors.address}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierPhone" className="form-label modal-label">Điện thoại</label>
                                            <input type="tel" className="form-control" id="supplierPhone" name="phoneNumber" value={editSupplierData.phoneNumber} onChange={handleEditChange} />
                                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierEmail" className="form-label modal-label">Email</label>
                                            <input type="email" className="form-control" id="supplierEmail" name="email" value={editSupplierData.email} onChange={handleEditChange} />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="supplierNote" className="form-label modal-label">Ghi chú</label>
                                            <textarea className="form-control" id="supplierNote" name="note" rows="3" value={editSupplierData.note} onChange={handleEditChange}></textarea>
                                            {errors.note && <div className="text-danger">{errors.note}</div>}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" onClick={handleEditSupplier} disabled={isFormSubmitted}>><i className="bi bi-check-circle"></i>Hoàn thành</button>
                                    <button type="button" className="btn btn-primary" onClick={handleCloseEditModal}><i className="bi bi-arrow-return-left"></i>Trở về</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StyledContainer>
    );
};
