import {useEffect, useRef, useState} from "react";
import './ListCustomer.css';
import * as CustomerService from "../../utils/InformationService/CustomerManagementService/CustomerService";
import toast from "bootstrap/js/src/toast";
export const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [idCustomerDelete, setIdCustomerDelete] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);


    const fetchApi = async () => {
        try {
            const result = await CustomerService.findAllCustomer();
            console.log(result)
            setCustomers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

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

    const sortedCustomers = [...customers].sort((a, b) => {
        switch (sortOption) {
            case 'Nhóm khách hàng':
                return a.customerType.localeCompare(b.customerType);
            case 'Tên khách hàng':
                return a.customerName.localeCompare(b.customerName);
            case 'Địa chỉ':
                return a.address.localeCompare(b.address);
            case 'SĐT':
                return a.phoneNumber.localeCompare(b.phoneNumber);
            default:
                return 0;
        }
    });

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
                                        <select className="form-select">
                                            <option selected>Vui lòng chọn</option>
                                            <option value="Nhóm khách hàng">Nhóm khách hàng</option>
                                            <option value="Tên khách hàng">Tên khách hàng</option>
                                            <option value="Địa chỉ">Địa chỉ</option>
                                            <option value="SĐT">Số điện thoại</option>
                                        </select>
                                        <input type="text" className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                        <button className="btn btn-primary"><i className="bi bi-search"></i> Tìm kiếm
                                        </button>
                                    </a>
                                </div>
                                <div className="sort">
                                    <span>Sắp xếp theo</span>
                                    <a>
                                        <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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

                            <div className="table-responsive">
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
                                    {sortedCustomers.map((customer, index) => (
                                        <tr className="table-row" key={index} onClick={(event) => {
                                            highlightRow(event);
                                            setIdCustomerDelete(customer.customerId);
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
                            </div>
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
                        <button type="button" className="btn btn-success"><i className="bi bi-plus-circle"></i> Thêm
                        </button>
                        <button type="button" className="btn btn-secondary"><i className="bi bi-pencil-square"></i> Sửa
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
            {/* Modal */}
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
        </div>
    );
}
