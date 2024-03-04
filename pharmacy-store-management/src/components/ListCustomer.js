import {useEffect, useRef, useState} from "react";
import './ListCustomer.css';
import * as CustomerService from "../../src/utils/InformationService/CustomerManagementService/CustomerService";
import toast from "react-toastify";
import {NavLink} from "react-router-dom";

export const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);
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
    const [idCustomerDelete, setIdCustomerDelete] = useState([]);

    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);

    const fetchApi = async () => {
        try {
            const result = await CustomerService.findAllCustomer();
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
            alert('Chọn nhân viên cần chỉnh sửa');
        }
    };
    const saveChanges = async () => {
        const newCustomer = selectedCustomer
        newCustomer.customerId = document.getElementById('customerId').value
        newCustomer.customerName = document.getElementById('customerName').value
        newCustomer.address = document.getElementById('address').value
        newCustomer.age =document.getElementById('age').value
        newCustomer.phoneNumber =document.getElementById('phoneNumber').value
        newCustomer.customerTyp=document.getElementById('customerType').value
        newCustomer.note = document.getElementById('note').value
        console.log(selectedCustomer)
        await CustomerService.updateCustomer(newCustomer)
        closeModal()
        removeHighlight()
    };

    const closeModal = () => {
        const modal = document.getElementById('editModal');
        modal.style.display= 'none'
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
                                        <select className="form-select">
                                            <option selected>Vui lòng chọn</option>
                                            <option value="Nhóm khách hàng">Nhóm khách hàng</option>
                                            <option value="Tên khách hàng">Tên khách hàng</option>
                                            <option value="Địa chỉ">Địa chỉ</option>
                                            <option value="SĐT">Số điện thoại</option>
                                        </select>
                                        <input type="text" className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                        <button className="myButton"><i className="bi bi-search"></i> Tìm kiếm
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
                        <NavLink to='/createCustomer' className='btn btn-success'><i
                            className="bi bi-plus-circle"></i> Thêm</NavLink>
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
            <div className="modal fade" tabIndex="-1" id="editModal" aria-labelledby="editModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="editModalLabel">Sửa Thông Tin Khách Hàng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="customerId" className="form-label">Mã khách hàng:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="customerName" className="form-label">Tên khách hàng:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Địa chỉ:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="age" className="form-label">Tuổi:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="phoneNumber" className="form-label">SĐT:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="customerType" className="form-label">Nhóm khách hàng:</label>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="note" className="form-label">Ghi chú: </label>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-8">
                                    <form>
                                        <div className="mb-3">
                                            <input type="text" readOnly id="customerId" name="customerId"
                                                   className="form-control " style={{color:"blue",background:"gray"}}/>
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" id="customerName" name="customerName"
                                                   pattern="[a-zA-Z ]+"
                                                   title="Tên chỉ được chứa ký tự và khoảng trắng" required
                                                   className="form-control"/>
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" id="address" name="address" required
                                                   className="form-control"/>
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" id="age" name="age" pattern="\d{1,3}"
                                                   title="Tuổi chỉ được nhập là số và tối đa 3 chữ số" required
                                                   className="form-control"/>
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" id="phoneNumber" name="phoneNumber" required
                                                   className="form-control"/>
                                        </div>

                                        <div className="mb-3">
                                            <select required id="customerType" name="customerType"
                                                    className="form-control">
                                                <option value="">--Chọn--</option>
                                                <option value="Khách lẻ">Khách lẻ</option>
                                                <option value="Khách sỉ">Khách sỉ</option>
                                                <option value="Khách theo đơn">Khách theo đơn</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" id="note" name="note" required
                                                   className="form-control"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onClick={saveChanges} className="btn btn-success" id="btnSaveEdit">
                                    <i className="bi bi-plus-circle"></i> Chấp nhận
                                </button>
                                <button type="reset" className="btn btn-secondary"><i
                                    className="bi bi-arrow-clockwise"></i> Đặt lại
                                </button>
                                <button type="button" data-dismiss="modal" onClick={closeModal} className="btn btn-primary"><i
                                    className="bi bi-arrow-return-left"></i> Trở về
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}