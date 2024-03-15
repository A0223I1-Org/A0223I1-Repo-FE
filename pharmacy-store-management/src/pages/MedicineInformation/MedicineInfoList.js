import {useEffect, useState} from "react";
import * as medicineService from "../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService";
import {toast} from "react-toastify";
import axios from "axios";
import Header from "../../components/header/Header";
import Nav from "../../components/nav/Nav";

const attributes = [
    {
        id: "medicineId",
        name: "Mã Thuốc"
    },
    {
        id: "medicineGroup.medicineGroupName",
        name: "Nhóm Thuốc"
    },
    {
        id: "medicineName",
        name: "Tên Thuốc"
    },
    {
        id: "activeIngredient",
        name: "Hoạt chất"
    },
    {
        id: "importPrice",
        name: "Giá nhập"
    },
    {
        id: "retailPrice",
        name: "Giá bán lẻ"
    },
    {
        id: "wholesalePrice",
        name: "Giá bán sỉ"
    }
]

const conditions = [
    "Bằng", "Gần bằng", "Lớn hơn", "Nhỏ hơn", "Lớn hơn bằng", "Nhỏ hơn bằng", "Khác", "Tất cả"
]

const conditionString = [
    "Bằng", "Gần bằng"
]

const conditionInt = [
    "Lớn hơn", "Nhỏ hơn", "Lớn hơn bằng", "Nhỏ hơn bằng", "Khác"
]

export function MedicineInfoList() {
    const [medicines, setMedicines] = useState([]);
    const [medicine, setMedicine] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [attributeSearchField, setAttributeSearchField] = useState("");
    const [conditionSearchField, setConditionSearchField] = useState("");
    const [textSearchField, setTextSearchField] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [disabledCondition, setDisabledCondition] = useState(true);


    const [attributeState, setAttributeState] = useState(attributes);
    const [conditionState, setConditionState] = useState(conditions);



    const getAllMedicine = async () => {
        try {
            const data = await medicineService.getAllMedicine();
            setMedicines(data);
        } catch (e) {
            console.log(e)
        }
    }

    const checkConditionField = () => {
        if (attributeSearchField === "medicineGroup.medicineGroupName" ||
            attributeSearchField === "medicineName" || attributeSearchField === "activeIngredient" || attributeSearchField === "medicineId") {
            setConditionState(conditionString);
            return;
        }
        setConditionState(conditionInt);
    }

    useEffect(() => {
        getAllMedicine();
    }, []);

    // useEffect to enable/disable condition select based on attribute selection
    useEffect(() => {
        checkConditionField();
        setDisabledCondition(!attributeSearchField); // Disable if no attribute selected
    }, [attributeSearchField]);

    useEffect(() => {

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
        console.log(medicine.medicineId)
        try {
            await medicineService.deleteMedicine(medicine.medicineId);
        } catch (e) {
            console.log(e)
        }
        setShowDeleteModal(false);
        setMedicine("");
        getAllMedicine();
        toast("Xóa thành công!")
    };

    const getMedicineByCondition = async () => {
        try {
            if (attributeSearchField == null || attributeSearchField === "" || conditionSearchField == null || conditionSearchField === "" || textSearchField == null || textSearchField === "") {
                setErrorMessage("Phải điền tất cả các trường!!!")
                return;
            }

            console.log(textSearchField);
            console.log(attributeSearchField);
            const data = await axios.get(`http://localhost:8080/api/v1/medicine/search`, {
                params: {
                    attribute: attributeSearchField,
                    condition: conditionSearchField,
                    searchText: textSearchField
                }
            });
            setMedicines(data.data)
            if (data.data.length < 1) {
                setErrorMessage("Không thể tìm kiếm");
                return;
            }
            setErrorMessage("");
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Header/>
            <section className="main">
                <Nav />
                <div className="main-right">
                    <div className="container">
                        <h1 className="text-center bg-primary">Danh sách thuốc</h1>

                        <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                            <legend><h2>Bộ lọc</h2></legend>
                            <div className="row">
                                {errorMessage && <div className="text-danger"><h4>{errorMessage}</h4></div>}
                                <h3 className="col-lg-2">Lọc theo</h3>

                                <select name="" id="attributes" className="col-lg-2"
                                        value={attributeSearchField} onChange={e => setAttributeSearchField(e.target.value)}>
                                    <option value=""> - Thuộc tính - </option>
                                    {attributeState.map((attribute) => (
                                        <option value={attribute.id}>{attribute.name}</option>
                                    ))}


                                </select>

                                <select name="" id="condition" className="col-lg-2 mx-3" disabled={disabledCondition}
                                        value={conditionSearchField} onChange={e => setConditionSearchField(e.target.value)}>
                                    <option value=""> - Điều kiện - </option>
                                    {conditionState.map((condition) => (
                                        <option value={condition}>{condition}</option>
                                    ))}
                                </select>

                                <input type="text" className="col-lg-3 mx-3" onChange={e => setTextSearchField(e.target.value)}/>
                                <button onClick={() => getMedicineByCondition()} className="col-lg-2 btn btn-primary"><i className="bi bi-search"></i> Lọc kết quả</button>
                            </div>
                        </fieldset>

                        <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                            <legend><h2>Danh sách nhóm thuốc</h2></legend>
                            <div className="table-responsive">
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
                                                <td>{item.medicineName}</td>
                                                <td>{item.activeIngredient}</td>
                                                <td>{item.unit}</td>
                                                <td>{item.conversionUnit}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.importPrice}$</td>
                                                <td>{item.wholesalePrice}$</td>
                                                <td>{item.retailPrice}$</td>
                                                <td>{item.supplierDiscount}%</td>
                                                <td>{item.profitMarginWholesale}%</td>
                                                <td>{item.profitMarginRetail}%</td>
                                                <td>{item.origin}%</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                            </div>
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

                </div>
            </section>
        </>
    )
}