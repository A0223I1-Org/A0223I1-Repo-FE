
import "../MedicineGroup/MedicineGroupList.css"
import {useEffect, useState} from "react";
import * as medicineGroupService from "../../utils/InformationService/MedicineGroupManagementService/MedicineGroupService"
import {toast} from "react-toastify";
import Header from "../../components/header/Header";
import Nav from "../../components/nav/Nav";

export function MedicineGroupList() {
    const [medicineGroup, setMedicineGroup] = useState([]);

    const [medicineGroupId, setMedicineGroupId] = useState("");
    const [medicineGroupName, setMedicineGroupName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [checkId, setCheckId] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        getAllMedicineGroup();
    }, []);

    const getAllMedicineGroup = async () => {
        const data = await medicineGroupService.getAllMedicineGroup();
        setMedicineGroup(data);
    }

    function checkMedicineGroup(value){
        return value == null || value === "";
    }

    // Kiểm tra độ dài tên nhóm thuốc
    function checkMedicineGroupNameLength(value) {
        return value.length <= 25;
    }

    const createNewMedicineGroup = async () => {
        if (!isAdding) {
            toast("Phải điền vào {Tên Nhóm Thuốc} để thêm mới một nhóm thuốc");
            setMedicineGroupName("");
            setMedicineGroupId("");
            setIsAdding(true);
        }

        if (isAdding) {
            if (checkMedicineGroup(medicineGroupName)) {
                setErrorMessage("Tên nhóm thuốc không được để trống");
                return;
            }
            if (!checkMedicineGroupNameLength(medicineGroupName)) {
                setErrorMessage("Tên nhóm thuốc không được quá 25 ký tự");
                return;
            }
            setDisableButton(true);
            const newMedicineGroup = {
                medicineGroupName: medicineGroupName
            };
            const checkCreate = await medicineGroupService.createNewMedicineGroup(newMedicineGroup);
            if (checkCreate) {
                setDisableButton(false);
                console.log("ok");
                // Refresh the medicine group list
                getAllMedicineGroup();

                toast("Create successfully");
                setIsAdding(false);
                setErrorMessage("");
                setMedicineGroupName("");
                setMedicineGroupId("");
            }
        }
    }

    const updateMedicineGroupById = async () => {
        if (checkMedicineGroup(checkId)) {
            toast("đã xảy ra lỗi khi cập nhật!! vui lòng thực hiện lại");
            return;
        }
        if (checkMedicineGroup(checkId)) {
            toast("Chưa chọn nhóm thuốc");
            return;
        }

        if (checkMedicineGroup(medicineGroupName)) {
            setErrorMessage("Tên nhóm thuốc không được để trống");
            return;
        }

        if (!checkMedicineGroupNameLength(medicineGroupName)) {
            setErrorMessage("Tên nhóm thuốc không được quá 25 ký tự");
            return;
        }
        setDisableButton(true);
        const updateMedicineGroup = {
            id : checkId,
            medicineGroupName: medicineGroupName
        }
        console.log("update object:" + updateMedicineGroup.id + ", " + updateMedicineGroup.medicineGroupName)

        const checkUpdate = await medicineGroupService.updateMedicineGroupById(updateMedicineGroup, updateMedicineGroup.id);

        if (checkUpdate) {
            setDisableButton(false);
            // Refresh the medicine group list
            getAllMedicineGroup();
            toast("Cập nhật thành công");
            setMedicineGroupId("");
            setMedicineGroupName("");
            setErrorMessage("");
            console.log("ok");
        }
    }
    const selectRow = (row) => {
        setMedicineGroupId(row.medicineGroupId);
        setMedicineGroupName(row.medicineGroupName);
        setCheckId(row.medicineGroupId);
        console.log(row)
    };
    const confirmDelete = () => {
        if (checkMedicineGroup(medicineGroupId)) {
            toast("Chưa chọn nhóm thuốc");
            return;
        }
        setShowDeleteModal(true);
    };
    const deleteMedicineGroupById = async () => {
        if (checkMedicineGroup(checkId)) {
            toast("đã xảy ra lỗi khi xóa!! vui lòng thực hiện lại");
            return;
        }
        try {
            await medicineGroupService.deleteMedicineGroup(checkId);
        } catch (e) {
            console.log(e)
        }
        setShowDeleteModal(false);
        getAllMedicineGroup();
        setMedicineGroupId("");
        setMedicineGroupName("");
        toast("Xóa thành công!")
    };
    const backButton = () => {
        setMedicineGroupId("");
        setMedicineGroupName("");
        setErrorMessage("");
        if (isAdding) {
            setIsAdding(false);
        }
        // ...
    };
    return (
        <>
            <Header/>
            <section className="main">
                <Nav />
                <div className="main-right">
                    <div className="container">
                        <h1 className="text-center bg-primary">Nhóm thuốc</h1>

                        <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                            <legend><h2>Danh sách nhóm thuốc</h2></legend>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th className="bg-primary text-light">Mã nhóm thuốc</th>
                                    <th className="bg-primary text-light">Tên nhóm thuốc</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    medicineGroup?.map((item) => (
                                        <tr key={item.medicineGroupId} onClick={() => selectRow(item)} className={medicineGroupId === item.medicineGroupId ? 'table-primary' : ''}>
                                            <td>{item.medicineGroupId}</td>
                                            <td>{item.medicineGroupName}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </fieldset>


                        <fieldset className="border border-dark border-3 rounded-3 p-3 mt-4">
                            <legend><h2>Thông tin nhóm thuốc</h2></legend>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="groupId" className="form-label">Mã nhóm thuốc</label>
                                    <input type="text" className="form-control" id="groupId" value={medicineGroupId} onChange={(e) => setMedicineGroupId(e.target.value)} disabled/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="groupName" className="form-label">Tên nhóm thuốc</label>
                                    <input type="text" className="form-control" id="groupName"  value={medicineGroupName} onChange={(e) => setMedicineGroupName(e.target.value)}/>
                                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                </div>
                            </form>
                        </fieldset>


                        <div className="my-3" style={{textAlign: 'right'}}>
                            <button className="btn btn-success" id="addBtn" disabled={disableButton} onClick={() => createNewMedicineGroup()}>
                                <i className="bi bi-plus-circle"></i> {isAdding ? "Hoàn Thành" : "Thêm"}</button>
                            <button className="btn btn-custom" id="editBtn" disabled={disableButton} onClick={() => updateMedicineGroupById()}><i className="bi bi-pencil-square"></i> Sửa</button>
                            <button className="btn btn-danger" id="deleteBtn" onClick={() => confirmDelete()}><i className="bi bi-x-circle"></i> Xóa</button>
                            <button className="btn btn-primary" id="backBtn" onClick={() => backButton()}><i className="bi bi-arrow-return-left"></i> Trở về</button>
                        </div>


                        <div className={`modal ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}
                             id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden={!showDeleteModal}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Xóa nhóm thuốc</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Bạn có chắc chắn muốn xóa nhóm thuốc không</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Close</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteMedicineGroupById()}>Delete</button>
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