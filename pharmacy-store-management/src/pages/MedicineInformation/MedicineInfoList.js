import {useEffect, useState} from "react";
import * as medicineService from "../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService";
import {toast} from "react-toastify";

export function MedicineInfoList() {
    const [medicines, setMedicines] = useState([]);
    const [medicine, setMedicine] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getAllMedicine = async () => {
        try {
            const data = await medicineService.getAllMedicine();
            setMedicines(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllMedicine();
    }, []);
    const confirmDelete = () => {
        if (medicine == null || medicine === "") {
            toast("Chưa chọn thuốc trong danh sách")
            return
        }
        setShowDeleteModal(true);
    };
    const selectRow = (item) => {
        setMedicine(item);
        console.log(item);
    };
    const deleteMedicineById = async () => {
        try {
            await medicineService.deleteMedicine(medicine.id);
        } catch (e) {
            console.log(e)
        }
        setShowDeleteModal(false);
        setMedicine("");
        getAllMedicine();
        toast("Delete successfully!")
    };
    return (
        <>
            <div className="container">
                <h1 className="text-center bg-primary">Danh sách thuốc</h1>

                <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                    <legend><h2>Bộ lọc</h2></legend>
                    <div className="row">
                        <h3 className="col-lg-2">Lọc theo</h3>

                        <select name="" id="medicineId" className="col-lg-2">
                            <option value=""> - Mã Thuốc - </option>
                            <option value="">----</option>
                        </select>

                        <select name="" id="condition" className="col-lg-2 mx-3">
                            <option value=""> - Điều kiện - </option>
                            <option value="">----</option>
                        </select>

                        <input type="text" className="col-lg-3 mx-3"/>
                        <button className="col-lg-2 btn btn-primary"><i className="bi bi-search"></i> Lọc kết quả</button>
                    </div>
                </fieldset>

                <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                    <legend><h2>Danh sách nhóm thuốc</h2></legend>
                    <table className="table table-bordered"  style={{ border: '4px solid black' }}>
                        <thead>
                        <tr>
                            <th className="bg-primary text-light">Mã thuốc</th>
                            <th className="bg-primary text-light">Nhóm thuốc</th>
                            <th className="bg-primary text-light">Tên thuốc</th>
                            <th className="bg-primary text-light">Hoạt chất</th>
                            <th className="bg-primary text-light">ĐVT</th>
                            <th className="bg-primary text-light">ĐV QĐ</th>
                            <th className="bg-primary text-light">Số lượng</th>
                            <th className="bg-primary text-light">Giá nhập</th>
                            <th className="bg-primary text-light">Giá sĩ</th>
                            <th className="bg-primary text-light">Giá lẻ</th>
                            <th className="bg-primary text-light">% CK</th>
                            <th className="bg-primary text-light">% LN XC</th>
                            <th className="bg-primary text-light">% LN XL</th>
                            <th className="bg-primary text-light">VAT</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            medicines?.map((item) => (
                                <tr key={item.medicineId} onClick={() => selectRow(item)} className={medicine.medicineId === item.medicineId ? 'table-primary' : ''}>
                                    <td>{item.medicineId}</td>
                                    <td>{item.medicineGroup?.medicineGroupName}</td>
                                    <td>{item.material}</td>
                                    <td>{item.activeIngredient}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.conversionUnit}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.importPrice}</td>
                                    <td>{item.wholesalePrice}</td>
                                    <td>{item.retailPrice}</td>
                                    <td>{item.supplierDiscount}</td>
                                    <td>{item.profitMarginWholesale}</td>
                                    <td>{item.profitMarginRetail}</td>
                                    <td>{item.origin}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </fieldset>

                <div className="my-3" style={{textAlign: 'right'}}>
                    <button className="btn btn-success" id="addBtn" ><i className="bi bi-plus-circle"></i>Thêm</button>
                    <button className="btn btn-custom" id="editBtn" ><i className="bi bi-pencil-square"></i> Sửa</button>
                    <button className="btn btn-danger" id="deleteBtn" onClick={() => confirmDelete()}><i className="bi bi-x-circle"></i> Xóa</button>
                    <button className="btn btn-primary" id="backBtn"><i className="bi bi-arrow-return-left"></i> Trở về</button>
                </div>


                <div className={`modal ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}
                     id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden={!showDeleteModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xóa thuốc</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa thuốc không</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteMedicineById()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}