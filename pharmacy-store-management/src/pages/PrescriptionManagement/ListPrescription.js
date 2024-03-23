import React, {useEffect, useRef, useState} from 'react';
import AddPrescriptionModalComponent from "./AddPrescriptionModalComponent";
import * as symptomService from "../../utils/InformationService/SymptomManagementService/SymptomService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionDetailService";
import * as prescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";
// import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import PropTypes from "prop-types";
import DeletePrescriptionModalComponent from "./DeletePrescriptionModalComponent";
import {toast} from "react-toastify";
import {UpdatePrescriptionComponent} from "./UpdatePrescriptionComponent";
import NotficationModal from "./NotficationModal";
import styled from 'styled-components';
import Header from "../../components/header/Header";

AddPrescriptionModalComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

const StyleNav = styled.nav`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .page-item {
    margin: 0 5px;
    list-style: none;
  }

  .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 1px solid #ced4da;
    color: #333;
    width: 40px;
    height: 40px;
    transition: background-color 0.3s ease;
    font-weight: bold;
  }

  .page-link:hover {
    background-color: #f0f0f0;
  }

  .page-item.active .page-link {
    color: #fff;
    background-color: #449af8;
  }


  .page-link.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`
const StyledP = styled.div`
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap');
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');


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
        font-family: Poppins, serif;;
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

   
    fieldset{
        width: 100%;
        box-sizing: border-box;
    }
 
    .filter{
        font-size: 20px;
    }

    legend {
        all: revert;
    }

   
    b{
        font-size: 16px;
    }
    .myButton {
        background-color:  #449af8;
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


    .form-group {
        display: flex;
    }
    
    a {
        text-decoration: none;
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

    //.group21 {
    //    display: flex;
    //    flex-direction: column;
    //}

    a {
        margin-left: 30px;
    }

    p {
        margin-left: 20px;
    }

    .main {
        display: flex;
    }

    .main-left {
        flex: 2;
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
    
    .select-filter {
        display: flex;
    }
    .search-group {
        display: flex;
        margin-top: 13px;

    }
    //.sort {
    //    display: flex;
    //}
    //
    //.action {
    //    margin-left: 65%;
    //}

    .btn {
        margin-top: 1rem;
        display: inline-block;
        border-radius: .3rem;
        color: #fff;
        cursor: pointer;
        width: 90px;
        height: 40px;
        font-weight: 500;
    }

    input, select {
        border: 1px solid;
    }

    .pagination {
        display: flex;
        position: fixed;
        top: 80%;
        left: 20px;
        height: 100px;
    }


   


    legend {
        all: revert;
        font-weight: bold;
    }



    

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
        .btn-success {
            margin-left: 30.8%;
        }

    }

    @media (max-width: 767px) {
        .btn-success {
            margin-left: 30.8%;
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

`

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
            setSelectedPrescriptionId(null);

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
            toast.success('Xoá toa thuốc thành công!',{
                autoClose: 1000
            });
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
        <>
            <Header/>
        <StyledP>
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
                            {/*remove data-bs-toggle="modal" for error backdrop*/}
                            <button type="button" data-bs-target="#editModal"
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
                <StyleNav>
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
                </StyleNav>


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
                        setUpdateModal(false)
                    }}
                />

                <DeletePrescriptionModalComponent open={deleteModal} onRequestClose={closeConfirmModal}
                                                  name={prescriptionName}
                                                  onClick={() => deletePrescription(selectedPrescriptionDeleteId)}/>

                <NotficationModal open={notificationModal} onRequestClose={closeNotificationModal}

                />


            </div>
        </StyledP>
            </>
    );
}
