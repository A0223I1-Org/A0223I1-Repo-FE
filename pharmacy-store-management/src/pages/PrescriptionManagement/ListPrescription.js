import React, {useEffect, useRef, useState} from 'react';
import AddPrescriptionModalComponent from "./AddPrescriptionModalComponent";
import * as symptomService from "../../utils/InformationService/SymptomManagementService/SymptomService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionDetailService";
import * as prescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

import PropTypes from "prop-types";
import DeletePrescriptionModalComponent from "./DeletePrescriptionModalComponent";
import {toast} from "react-toastify";
import {UpdatePrescriptionComponent} from "./UpdatePrescriptionComponent";
import NotficationModal from "./NotficationModal";
import styled from 'styled-components';
// import './aloo.css';

const StyleP = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap');

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    transition: all .2s linear;
}

body {
    font-family: Poppins, serif;
    padding: 0;
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
.myTable {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2px;
}
.form-select{
    width: 100%;
}
.form-control{
    width: 100%;
}
.search-selected{
    margin-right: 16%;
    display: flex;
}
fieldset{
    width: 100%;
    box-sizing: border-box;
}
.bg{
    background-color: #449af8;
}
.filter{
    font-size: 20px;
}

legend {
    all: revert;
}
.pagination{
    position: fixed;
    top: 80%;
    left: 0;
}
.search-button {
    display: flex;
    margin-top: -2px;
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

}
.sort{
    margin-left: 150px;
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
    margin-top: 10px;
    margin-left: 30%;
}
.btn-success {
    margin-left: 44.8%;
}
.chucNang button{
    margin-right: 1.4%;
    width: 85px;
    height: 40px;

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

.form-group {
    display: flex;
}


.report{
    display: flex;
}

.report .debt{
    margin: auto 150px;
}
.report .list{
    margin: auto 150px;
}
.action{
    display: flex;
    justify-content: space-between;
}
.action .chart{
    margin-right: 660px;
    margin-left: 20px;
}
.right{
    text-align: right;
}

.custom-modal2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 600px; /* Adjust as needed */
    width: 90%;
}

.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content2 {
    text-align: center;
}
.modal-buttons2{
    display: flex;
    justify-content: center;

}

.cancel-button {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;

}

.cancel-button:hover {
    background-color: #d32f2f;
}

.cancel-button:focus {
    outline: none;
}
a {
    text-decoration: none;
}
.error-message {
    color: red;
}

.pagination{
    position: fixed;
    top: 80%;
    left: 0;
}
.btn-group{
    position: fixed;
    top: 10%;
    right: -10%;
}

.group2 {
    display: flex;
    padding: 10px;
}
.group-button{
    display: flex;
}
.btn1{
    margin-left: 10px;
}

fieldset {
    border: 2px solid #000;
}

.group21 {
    display: flex;
    flex-direction: column;
}

a {
    margin-left: 30px;
}

p {
    margin-left: 20px;
}

.main {
    display: flex;
}


label {
    font-size: 15px;
    margin-top: 20px;
}

.alo4 {
    display: flex;
}

select {
    font-size: 15px;
    margin-top: 13px;
}

.main-right {
    flex: 6;
    display: flex;
    flex-direction: row;
}

.select-filter {
    display: flex;
}
.search-group {
    display: flex;
    margin-top: 13px;

}
.sort {
    display: flex;
}

.header-2 {
    display: flex;
}

.heading {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
}

.action {
    margin-left: 65%;
}

.btn {
    display: inline-block;
    margin-top: 1rem;
    border-radius: .5rem;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
}

input, select {
    border: 1px solid;
}

.slay {
    display: flex;
    margin-bottom: 10px;
}

.slay1 {
    flex: 2;
    padding-right: 10px;
}
.form-group div {
    margin-right: 20px;
}

.slay2 {
    flex: 4;

}


.slay4 {
    flex: 4;
}

.slay5 {
    flex: 1;
    display: flex;
    margin-top: 12px;
}

legend {
    all: revert;
    font-weight: bold;
}

.selected-row {
    background-color: #61dafb;
    color: white;
}

.slay6 {
    flex: 1;
}

.slay7 {
    margin-top: -20px;
}

.end {
    display: flex;
}

.form-group {
    margin-bottom: 15px;
}


/*modal*/
.custom-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.custom-modal-overlay {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    margin-bottom: 20px;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
}

.modal-buttons button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.modal-buttons button:hover {
    background-color: #ddd;
}

.confirm-button {
    background-color: #d9534f;
    color: #fff;
}

.cancel-button {
    background-color: #5bc0de;
    color: #fff;
}
.error-message{
    color: red;
}
/*modal*/

@media (max-width: 991px) {
    .header .header-2 {
        background: var(--blue);
    }

    html {
        font-size: 55%;
    }

    section {
        padding: 3rem 2rem;
    }

}

@media (max-width: 767px) {
    .header .header-2 {
        background: var(--blue);
        padding-left: 10px;
    }

    html {
        font-size: 50%;
    }

    section {
        padding: 2rem 1rem;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .group2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    select,
    input {
        appearance: none;
        border: 1px solid #ccc;
        padding: 8px;
        font-size: 5px;
    }
    .main {
        display: grid;
        grid-template-columns: 0fr 2fr;
    }

}



`;


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
            setSelectedPrescriptionDeleteId("");

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
            setPrescriptionName(prescription?.prescriptions?.[0].prescriptionName);
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


    return (
        <StyleP>
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">

                            <fieldset className="border p-2">
                                <legend ><b>Bộ lọc</b></legend>
                                <div className="alo4">
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
                                            prescription.prescriptionDetails?.map((detailPrescription, detailPrescriptionIndex) => (
                                                <tr className="table-row"
                                                    key={`${prescription.prescriptionId}-${detailPrescription.prescriptionDetailId}`}
                                                    onClick={(e) => {
                                                        handleClick(detailPrescription.prescriptionDetailId, prescription.prescriptionId);
                                                        highlightRow(e, prescription.prescriptionId);

                                                    }}

                                                >
                                                    <td>{prescription.prescriptionId}</td>
                                                    <td>{prescription.prescriptionName}</td>
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
        </StyleP>
    );
}