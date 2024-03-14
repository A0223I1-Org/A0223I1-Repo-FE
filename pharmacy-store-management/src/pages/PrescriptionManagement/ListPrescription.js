import React, {useEffect, useRef, useState} from 'react';
import AddPrescriptionModalComponent from "./AddPrescriptionModalComponent";
import * as symptomService from "../../utils/InformationService/SymptomManagementService/SymptomService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";
import * as prescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';

import PropTypes from "prop-types";
import DeletePrescriptionModalComponent from "./DeletePrescriptionModalComponent";
import {toast} from "react-toastify";
import {UpdatePrescriptionComponent} from "./UpdatePrescriptionComponent";
import NotficationModal from "./NotficationModal";

AddPrescriptionModalComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export const ListPrescription = () => {

    const [prescriptions, setPrescriptions] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [prescriptionName, setPrescriptionName] = useState('');
    const [prescription, setPrescription] = useState({});


    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);


    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
    const [selectedPrescriptionDeleteId, setSelectedPrescriptionDeleteId] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = prescriptions?.slice(firstIndex, lastIndex);
    const npage = Math.ceil((prescriptions?.length || 0) / recordsPerPage); // Ensuring prescriptions?.length is not undefined
    const numbers = npage > 0 ? [...Array(npage).keys()].map(i => i + 1) : [];



    const [selectedRow, setSelectedRow] = useState(null);
    const highlightedRowRef = useRef(null);


    const highlightRow = (event, prescriptionId) => {
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
            setSelectedPrescriptionDeleteId(prescriptionId);
            setSelectedRow(row);
            highlightedRowRef.current = row;
        }
    };
    const removeHighlight = () => {
        const highlightedRow = document.querySelector('.selected-row');
        if (highlightedRow) {
            highlightedRow.classList.remove('selected-row');
            setSelectedPrescriptionDeleteId("");
            // setSelectedPrescriptionId(null);
        }
    };



    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        } else {

        }
    };

    const changeCPage = id => {
        setCurrentPage(id);
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const openCreateModal = () => {
        setCreateModal(true);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleClick = (prescriptionId, detailId) => {
        console.log("id selected:", prescriptionId);
        console.log("id selected:", detailId);
        setSelectedPrescriptionId(prescriptionId);
        setSelectedPrescriptionDeleteId(detailId)
    }

    const closeNotificationModal = () => {
        setNotificationModal(false);
    }

    const openConfirmModal = async (selectedPrescriptionDeleteId, selectedPrescriptionId) => {
        if (selectedPrescriptionDeleteId === "") {
            setNotificationModal(true);
        } else {
            setDeleteModal(true);
            const prescription = await detailPrescriptionService.findDetailPrescriptionById(selectedPrescriptionId);
            setPrescription(prescription);
            setPrescriptionName(prescription?.prescriptions?.[0].name);
            setSelectedPrescriptionDeleteId(selectedPrescriptionDeleteId)

        }
    };

    const closeConfirmModal = () => {
        setDeleteModal(false);
        // setSelectedPrescriptionDeleteId(" ");
    };

    useEffect(() => {
        fetchSymptoms();
    }, []);
    const fetchSymptoms = async () => {
        try {
            const response = await symptomService.findAllSymptom();
            setSymptoms(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const fetchApi = async () => {
        try {
            const fetchedProducts = await prescriptionService.findAll();
            setPrescriptions(fetchedProducts);

            const fetchedSymptoms = await symptomService.findAllSymptom();
            setSymptoms(fetchedSymptoms);

        } catch (error) {
            if (!error.response) {
                this.errorStatus = 'Error: Network Error';
            } else {
                this.errorStatus = error.response.data.message;
            }
        }
    };

    const display = (target) => {
        switch (target) {
            case '1':
                return 'Người lớn';
            case '2':
                return 'Trẻ em';
            case '3':
                return 'Phụ nữ mang thai';
            default:
                return 'Unknown Target';
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    const loadData2 = async () => {
        try {
            await fetchApi();
        } catch (error) {
            console.error(error);
        }
    };


    const loadData = async () => {
        try {
            await fetchApi();
            await loadData2();
            setCreateModal(false);
            setUpdateModal(false);

        } catch (error) {
            console.error(error);
        }
    };

    const deletePrescription = async (id) => {
        try {

            await prescriptionService.deletePrescription(id);
            await fetchApi();
            toast.success('Prescription deleted successfully!');
        } catch (error) {
            console.error('Error deleting prescription:', error);
            toast.error('Error deleting prescription');
        }
        closeConfirmModal();
    };

    const openUpdateModal = async (prescriptionId, check) => {
        if(prescriptionId === null){
            setNotificationModal(true);
        }
        else {
            console.log("open modal for prescription: ", prescriptionId);
            const prescription = await detailPrescriptionService.findDetailPrescriptionById(prescriptionId);
            setPrescription(prescription);
            setPrescriptionName(prescription?.prescriptions?.[0].name);
            check = true;
            setSelectedPrescriptionId(prescriptionId);
            setUpdateModal(check);
        }
    };

    const hideUpdateModal = () =>{
        setUpdateModal(false);
        setSelectedPrescriptionId(null);
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">

                            <fieldset className="border p-2">
                                <legend ><b>Bộ lọc</b></legend>
                                <div className="alo">
                                    <div className="select-filter form-group">
                                        <label>Lọc theo</label>
                                        <select style={{border: '1px solid', height: '40px'}} name="cars" id="medicals">
                                            <option value="code">Mã toa thuốc</option>
                                            <option value="saab">Tên toa thuốc</option>
                                            <option value="opel">Đối tượng</option>
                                            <option value="audi">Triệu chứng</option>
                                        </select>
                                    </div>

                                    <div className="search-group">

                                            <input
                                                style={{
                                                    border: '1px solid',
                                                    height: '40px',
                                                    width: '250px',
                                                    marginLeft: '5px'
                                                }}
                                                type="search"
                                                name=""
                                                placeholder="search here..." id="search-box"/>
                                            <button style={{height: '40px', fontSize: '15px', marginBottom: '16px'}}
                                                    type="submit"
                                                    className="myButton">Lọc kết quả
                                            </button>

                                    </div>

                                    <div className="sort">
                                        <label style={{marginLeft: '50px'}} htmlFor="sort">Sắp xếp</label>
                                        <select style={{border: '1px solid', height: '40px'}} name="sort" id="sort">
                                            <option value="code">Mã toa thuốc</option>
                                            <option value="saab">Tên toa thuốc</option>
                                            <option value="opel">Đối tượng</option>
                                            <option value="audi">Triệu chứng</option>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>

                        <div>
                            <fieldset className="border rounded-3 p-3">
                                <legend><b>Danh sách toa thuốc</b></legend>
                                <table className="myTable">
                                    <thead>
                                    <tr className="row-scope">
                                        <th>Mã toa thuốc</th>
                                        <th>Tên toa thuốc</th>
                                        <th>Đối tượng</th>
                                        <th>Triệu chứng</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {prescriptions?.length === 0 ? (
                                            <tr style={{backgroundColor: '#f2f2f2', textAlign: 'center'}}>
                                                <td colSpan="9"
                                                    style={{
                                                        padding: '10px',
                                                        fontSize: '30px',
                                                        fontStyle: 'italic',
                                                        color: 'red'
                                                    }}>
                                                    No prescription found.
                                                </td>
                                            </tr>

                                        ) :

                                        (records?.map((prescription, prescriptionIndex) => (
                                            prescription.detailPrescriptions?.map((detailPrescription, detailPrescriptionIndex) => (
                                                <tr className="table-row"
                                                    key={`${prescription.id}-${detailPrescription.id}`}
                                                    onClick={(e) => {
                                                        handleClick(detailPrescription.id, prescription.id);
                                                        highlightRow(e, prescription.id);

                                                    }}

                                                >
                                                    <td>{prescription.id}</td>
                                                    <td>{prescription.name}</td>
                                                    <td>{display(prescription.target)}</td>
                                                    <td>{prescription.symptomName}</td>
                                                    <td>{prescription.note}</td>
                                                </tr>
                                            ))
                                        )))
                                    }
                                    </tbody>
                                </table>

                            </fieldset>
                        </div>
                        <div className="chucNang">

                            <button type="button" className="btn btn-success" onClick={(evt) => openCreateModal()}>
                                <i className="bi bi-plus-circle"></i> Thêm
                            </button>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#editModal"
                                    className="btn btn-custom" onClick={() => openUpdateModal(selectedPrescriptionId, updateModal)}><i
                                className="bi bi-pencil-square"></i> Sửa
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => openConfirmModal(selectedPrescriptionDeleteId, selectedPrescriptionId)}>
                                <i className="bi bi-x-circle"></i> Xóa
                            </button>
                            <button type="button" className="btn btn-primary"><i
                                className="bi bi-arrow-return-left"></i> Trở về
                            </button>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>

                <nav className="pagination">
                    {records?.length > 0 && (
                        <>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={prePage}>Prev</a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className="page-link"
                                           onClick={() => changeCPage(n)}>
                                            {n}
                                        </a>
                                    </li>

                                ))
                            }
                            <li className={`page-item ${currentPage === numbers?.length ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={nextPage}>Next</a>
                            </li>
                        </>
                    )}
                </nav>

                <AddPrescriptionModalComponent
                    show={createModal}
                    onHide={(() => setCreateModal(false))}
                    onLoad={loadData}
                />
                <UpdatePrescriptionComponent
                    show={updateModal === true && selectedPrescriptionId !== null}
                    exName={prescriptionName}
                    uid={selectedPrescriptionId}
                    onLoad={loadData}
                    onHide={() => {
                        setUpdateModal(false);
                    }}
                />

                <DeletePrescriptionModalComponent open={deleteModal} onRequestClose={closeConfirmModal}
                                                  name={prescriptionName}
                                                  onClick={() => deletePrescription(selectedPrescriptionDeleteId)}/>

                <NotficationModal open={notificationModal} onRequestClose={closeNotificationModal}

                />


            </div>
        </>
    );
}