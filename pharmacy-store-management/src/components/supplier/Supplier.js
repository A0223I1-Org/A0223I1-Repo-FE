import React, { useEffect, useRef, useState } from "react";
import './Supplier.css';
import * as SupplierService from "../../utils/InformationService/SupplierManagementService/SupplierService";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import * as Yup from 'yup';


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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Số mục trên mỗi trang



    const fetchSuppliers = async (page, size) => {
        try {
            // Lấy danh sách nhà cung cấp từ API
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

    // console.log("currentPage:", currentPage);
    // console.log("itemsPerPage:", itemsPerPage);
    // console.log("totalItems:", totalItems);
    // console.log("totalPages:", totalPages);

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
        console.log("search type : ", searchType);
        console.log("order by: ", orderBy);
        await fetchSuppliers(0, itemsPerPage); // Gọi hàm fetchSuppliers với trang hiện tại và số lượng mục trên mỗi trang
    };


    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        console.log("search type : ", searchType);
        console.log("order by: ", orderBy);
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
        address: Yup.string().max(50, 'Địa chỉ không được quá 50 ký tự'),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các số').max(11, 'Số điện thoại không được quá 11 ký tự'),
        email: Yup.string().email('Email không hợp lệ'),
    });
// Hàm validate dữ liệu sử dụng schema đã định nghĩa
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
    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleAddSupplier = async () => {
        const errors = await validateSupplierData(newSupplierData);
        if (Object.keys(errors).length === 0) {
            try {
                const existingSupplier = suppliers.find(supplier => supplier.supplierId === newSupplierData.supplierId);
                if (existingSupplier) {
                    toast('Mã nhà cung cấp đã tồn tại. Vui lòng chọn mã khác!');
                    return;
                }

                await SupplierService.addSupplier(newSupplierData);
                await fetchSuppliers();
                handleCloseAddModal();
                toast('Thêm nhà cung cấp thành công!');
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
        toast('Xóa nhà cung cấp thành công!');

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

// Trong phương thức handleEditSupplier
    const handleEditSupplier = async () => {
        const errors = await validateSupplierData(editSupplierData);
        if (Object.keys(errors).length === 0) {
            try {
                await SupplierService.updateSupplier(selectedSupplierId, editSupplierData);
                await fetchSuppliers();
                handleCloseEditModal();
                toast('Cập nhật nhà cung cấp thành công!');
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
                                            <i className="bi bi-search"></i> Tìm kiếm
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
                                    <td>Mã nhà cung cấp</td>
                                    <td>Tên nhà cung cấp</td>
                                    <td>Địa chỉ</td>
                                    <td>SĐT</td>
                                    <td>Công nợ</td>
                                    <td>Ghi chú</td>
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
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <span className="page-link" onClick={() => handlePaginate(currentPage - 1)}>Trước</span>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index  ? 'active' : ''}`}>
                                            <span className="page-link" onClick={() => handlePaginate(index )}>{index + 1}</span>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                        <span className="page-link" onClick={() => handlePaginate(currentPage + 1)}>Sau</span>
                                    </li>
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
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleAddSupplier}><i className="bi bi-plus-circle"></i> Thêm</button>
                                <button type="button" className="btn btn-primary" onClick={handleCloseAddModal}><i className="bi bi-arrow-return-left"></i> Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleEditSupplier}><i className="bi bi-check-circle"></i> Hoàn thành</button>
                                <button type="button" className="btn btn-primary" onClick={handleCloseEditModal}><i className="bi bi-arrow-return-left"></i> Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};