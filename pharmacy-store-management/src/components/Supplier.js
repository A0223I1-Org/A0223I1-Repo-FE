import React, { useEffect, useRef, useState } from "react";
import './Supplier.css';
import * as SupplierService from "../utils/InformationService/SupplierManagementService/SupplierService";

export const Supplier = () => {
    const defaultSearchType = "supplierId"; // Giá trị mặc định cho loại tìm kiếm
    const defaultOrderBy = "supplierId"; // Giá trị mặc định cho phương thức sắp xếp
    const [suppliers, setSuppliers] = useState([]);
    const [searchType, setSearchType] = useState("supplierId");
    const [searchValue, setSearchValue] = useState("");
    const [orderBy, setOrderBy] = useState("supplierId");
    const [idSupplierDelete, setIdSupplierDelete] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);
    const [searchInput, setSearchInput] = useState(""); // Thêm state mới để lưu trữ giá trị tìm kiếm mới

    const [showAddModal, setShowAddModal] = useState(false); // State để điều khiển hiển thị modal thêm nhà cung cấp
    const [newSupplierData, setNewSupplierData] = useState({
        supplierId: "",
        supplierName: "",
        address: "",
        phoneNumber: "",
        email: "",
        note: ""
    }); // State để lưu thông tin của nhà cung cấp mới

    const fetchSuppliers = async () => {
        try {
            const result = await SupplierService.findAllSupplier(orderBy, searchType, searchValue);
            setSuppliers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchSuppliers();
    }, [orderBy, searchType, searchValue]);

    const highlightRow = (event, supplier) => {
        const row = event.currentTarget;
        removeHighlight();
        if (highlightedRowRef.current) {
            highlightedRowRef.current.classList.remove('selected-row');
        }
        if (row === selectedRow) {
            setSelectedRow(null);
            setIdSupplierDelete(null);
        } else {
            row.classList.add('selected-row');
            setSelectedRow(row);
            highlightedRowRef.current = row;
            setIdSupplierDelete(supplier.supplierId);
        }
    };

    const removeHighlight = () => {
        const highlightedRow = document.querySelector('.selected-row');
        if (highlightedRow) {
            highlightedRow.classList.remove('selected-row');
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value); // Cập nhật giá trị tìm kiếm mới
    };

    const handleSearch = () => {
        setSearchValue(searchInput); // Sử dụng giá trị tìm kiếm mới
        fetchSuppliers(); // Gọi hàm tìm kiếm
    };

    const handleSortChange = (event) => {
        console.log(event.target.value)
        setOrderBy(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleReset = () => {
        setSearchType(defaultSearchType);
        setSearchValue("");
        setOrderBy(defaultOrderBy);
        setIdSupplierDelete(null);
        setSelectedRow(null);
    };
    const handleShowAddModal = () => {
        setShowAddModal(true); // Khi bấm vào nút "Thêm mới", hiển thị modal thêm nhà cung cấp
    };
    const handleAddSupplier = async () => {
        try {
            await SupplierService.addSupplier(newSupplierData); // Gửi đi dữ liệu từ state newSupplierData
            await fetchSuppliers(); // Làm mới danh sách nhà cung cấp
            handleCloseAddModal(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            console.error('Error adding supplier:', error);
            // Xử lý lỗi nếu cần thiết
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
        setShowAddModal(false); // Đóng modal thêm nhà cung cấp
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
        // toast.success('Xóa khánh hàng ${suppliers.find((x) => x.supplierId === idSupplierDelete)?.supplierName} thành công.')
        await fetchSuppliers();
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
                                            onChange={handleSearchInputChange} // Sử dụng hàm này để cập nhật giá trị tìm kiếm mới
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
                                            <td>{supplier.supplierId}</td>
                                            <td className="row-name">{supplier.supplierName}</td>
                                            <td className="row-address">{supplier.address}</td>
                                            <td>{supplier.phoneNumber}</td>
                                            <td>{supplier.toPayDebt}</td>
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
                                    <li className="page-item"><span className="page-link" href="#">Trước</span></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><span className="page-link" href="#">Sau</span></li>
                                </ul>
                            </nav>
                        </fieldset>
                    </div>
                    <div className="chucNang">
                        <button type="button" className="btn btn-secondary" style={{ width: "auto" }}>
                            <i className="bi bi-info-square"></i> Thông tin chi tiết
                        </button>
                        <button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                            <i className="bi bi-plus-circle"></i> Thêm
                        </button>
                        <button type="button" className="btn btn-custom">
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
            {/* Delete Modal */}
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
            {/* Modal thêm nhà cung cấp */}
            {showAddModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title w-100" id="addSupplierModalLabel">Thêm Nhà Cung Cấp Mới</h5>
                                <button type="button" className="btn-close" onClick={handleCloseAddModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Form thêm nhà cung cấp */}
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="supplierId" className="form-label modal-label">Mã nhà cung cấp</label>
                                        <input type="text" className="form-control" id="supplierId" name="supplierId" placeholder="ex: DOMESCO" onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supplierName" className="form-label modal-label">Tên nhà cung cấp</label>
                                        <input type="text" className="form-control" id="supplierName" name="supplierName" placeholder="ex: Công ty DOMESCO" onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supplierAddress" className="form-label modal-label">Địa chỉ</label>
                                        <input type="text" className="form-control" id="supplierAddress" name="address" placeholder="ex: 123 Phan Đăng Lưu, Đà Nẵng" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supplierPhone" className="form-label modal-label">Điện thoại</label>
                                        <input type="tel" className="form-control" id="supplierPhone" name="phoneNumber" placeholder="ex: 0972346898" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supplierEmail" className="form-label modal-label">Email</label>
                                        <input type="email" className="form-control" id="supplierEmail" name="email" placeholder="ex: abc123@gmail.com" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supplierNote" className="form-label modal-label">Ghi chú</label>
                                        <textarea className="form-control" id="supplierNote" name="note" rows="3" onChange={handleChange}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                {/* Nút "Thêm" */}
                                <button type="button" className="btn btn-success" onClick={handleAddSupplier}><i className="bi bi-plus-circle"></i> Thêm</button>
                                {/* Nút "Hủy" */}
                                <button type="button" className="btn btn-primary" onClick={handleCloseAddModal}><i className="bi bi-arrow-return-left"></i> Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};