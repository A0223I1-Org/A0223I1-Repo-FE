import React, {useEffect, useState} from 'react';
import AddPrescriptionModal from "./AddPrescriptionModal";
import * as prescriptionService from "../services/PrescriptionService";
import * as symptomService from "../services/SymptomService"
import ReactPaginate from 'react-paginate';

import PropTypes from "prop-types";
import {UpdatePrescription} from "./UpdatePrescription";
import DeletePrescriptionModal from "./DeletePrescriptionModal";
import {toast} from "react-toastify";
import "./prescription.css";


AddPrescriptionModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

function ListPrescription() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
    const [selectedPrescriptionDeleteId, setSelectedPrescriptionDeleteId] = useState("");

    const [totalPres, setTotalPres] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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

    const openConfirmModal = (itemId) => {
        setSelectedPrescriptionDeleteId(itemId)
        setDeleteModal(true);
    };
    const closeConfirmModal = () => {
        setDeleteModal(false);
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
            // console.log(fetchedProducts)
            // setTotalPres(fetchedProducts.length);
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
            // await loadData2();
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

    const openUpdateModal = (prescriptionId, check) => {
        console.log("open modal for prescription: ", prescriptionId);
        check = true;
        setSelectedPrescriptionId(prescriptionId);
        setUpdateModal(check);
    };

    const handlePageClick = () =>{

    }


    return (
        <>

            <div className="main-right">
                <div className="container">
                    <fieldset className="border p-2">
                        <legend className="w-auto">Bộ lọc</legend>

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

                            <div className="search-button">
                                <form action="">
                                    <input
                                        style={{border: '1px solid', height: '40px', width: '250px', marginLeft: '5px'}}
                                        type="search"
                                        name=""
                                        placeholder="search here..." id="search-box"/>
                                    <button style={{height: '40px', fontSize: '15px', marginBottom: '16px'}}
                                            type="submit"
                                            className="btn btn-primary">Lọc kết quả
                                    </button>
                                </form>
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
                    <br/>
                    <fieldset className="border p-2">
                        <legend className="w-auto">Danh sách toa thuốc</legend>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Mã toa thuốc</th>
                                <th>Tên toa thuốc</th>
                                <th>Đối tượng</th>
                                <th>Triệu chứng</th>
                                <th>Ghi chú</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*@JsonBackReference dat o doi tuong*/}
                            {/*{symptoms?.map((symptom, symptomIndex) => (*/}
                            {/*    symptom.prescriptions?.map((prescription, prescriptionIndex) => (*/}
                            {/*        prescription.detailPrescriptions?.map((detailPrescription, detailPrescriptionIndex) => (*/}
                            {/*            <tr*/}
                            {/*                key={`${symptom.id}-${prescription.id}-${detailPrescription.id}`}*/}
                            {/*                onClick={() => {*/}
                            {/*                    handleClick(detailPrescription.id, symptom.id)*/}
                            {/*                }}*/}
                            {/*            >*/}
                            {/*                <td>{prescription.id}</td>*/}
                            {/*                <td>{prescription.name}</td>*/}
                            {/*                <td>{display(prescription.target)}</td>*/}
                            {/*                <td>{symptom.name}</td>*/}
                            {/*                <td>{prescription.note}</td>*/}
                            {/*            </tr>*/}
                            {/*        ))*/}
                            {/*    ))*/}
                            {/*))}*/}

                            {prescriptions?.length === 0 ? (
                                    <tr style={{backgroundColor: '#f2f2f2', textAlign: 'center'}}>
                                        <td colSpan="9" style={{padding: '10px', fontSize: '30px', fontStyle: 'italic', color: 'red'}}>
                                            No matching prescriptions found.
                                        </td>
                                    </tr>

                                ) :


                                (prescriptions?.map((prescription, prescriptionIndex) => (
                                    prescription.detailPrescriptions?.map((detailPrescription, detailPrescriptionIndex) => (
                                        <tr
                                            key={`${prescription.id}-${detailPrescription.id}`}
                                            onClick={() => {
                                                handleClick(detailPrescription.id, prescription.id)
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


                    <div className="action">
                        <button type="button" onClick={(evt) => openCreateModal()}
                                className="btn btn-primary"><span
                            className="em-1"><i className="bi bi-plus-circle"></i></span>Thêm
                        </button>
                        <button type="button" onClick={() => openUpdateModal(selectedPrescriptionId, updateModal)}
                                className="btn btn-info"><span
                            className="em-1"><i className="bi bi-pencil-square"></i></span> Sửa
                        </button>
                        <button type="button" onClick={() => openConfirmModal(selectedPrescriptionDeleteId)} data-bs-toggle="modal" data-bs-target="#delete"
                                className="btn btn-danger"><span
                            className="em-1"><i className="bi bi-x-circle"></i></span> Xoá
                        </button>
                    </div>
                </div>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={69}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <AddPrescriptionModal
                show={createModal}
                onHide={(() => setCreateModal(false))}
                onLoad={loadData}
            />
            <UpdatePrescription
                show={updateModal === true && selectedPrescriptionId !== null}
                uid={selectedPrescriptionId}
                onLoad={loadData}
                onHide={() => {
                    setUpdateModal(false);
                }}
            />

            <DeletePrescriptionModal open={deleteModal} onRequestClose={closeConfirmModal}
                                     onClick={() => deletePrescription(selectedPrescriptionDeleteId)}/>

        </>

    );
}

export default ListPrescription;
