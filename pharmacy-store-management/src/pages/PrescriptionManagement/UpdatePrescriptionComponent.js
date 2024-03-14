import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import * as prescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";

import * as medicineService from "../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";



export function UpdatePrescriptionComponent(props) {
    const {uid} = props;
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [errors, setErrors] = useState('');


    const clearMedicineData = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[0] = '';
        timesArray[0] = '';
        quantityPerTimesArray[0] = '';
        medicineArray[0] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };

    const clearMedicineData2 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[1] = '';
        timesArray[1] = '';
        quantityPerTimesArray[1] = '';
        medicineArray[1] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };

    const clearMedicineData3 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[2] = '';
        timesArray[2] = '';
        quantityPerTimesArray[2] = '';
        medicineArray[2] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };

    const clearMedicineData4 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[3] = '';
        timesArray[3] = '';
        quantityPerTimesArray[3] = '';
        medicineArray[3] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };

    const clearMedicineData5 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[4] = '';
        timesArray[4] = '';
        quantityPerTimesArray[4] = '';
        medicineArray[4] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };
    const clearMedicineData6 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[5] = '';
        timesArray[5] = '';
        quantityPerTimesArray[5] = '';
        medicineArray[5] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };

    const clearMedicineData7 = () => {
        const newData = { ...data };
        const firstDetailPrescription = newData.prescriptions?.[0]?.detailPrescriptions?.[0];

        // Split the values to an array
        const quantityArray = firstDetailPrescription.quantity?.split(",");
        const timesArray = firstDetailPrescription.times?.split(",");
        const quantityPerTimesArray = firstDetailPrescription.quantityPerTimes?.split(",");
        const medicineArray = firstDetailPrescription.medicineList?.split(",");

        // Clear the first element
        quantityArray[6] = '';
        timesArray[6] = '';
        quantityPerTimesArray[6] = '';
        medicineArray[6] = '';

        firstDetailPrescription.quantity = quantityArray.join(",");
        firstDetailPrescription.times = timesArray.join(",");
        firstDetailPrescription.quantityPerTimes = quantityPerTimesArray.join(",");
        firstDetailPrescription.medicineList = medicineArray.join(",");

        setData(newData);
    };



    const [data, setData] = useState({
        prescription: {
            id: '' ,
            name: '',
            target: 1,
            treatmentPeriod:'',
            exName:'',
            note:'',
            symptom: {
                name:''
            }
        },
        detailPrescription: [
            { medicineId: '', quantity: '', times: '', quantityPerTimes: '' },
            { medicineId2: '', quantity2: '', times2: '', quantityPerTimes2: '' },
            { medicineId3: '', quantity3: '', times3: '', quantityPerTimes3: '' },
            { medicineId4: '', quantity4: '', times4: '', quantityPerTimes4: '' },
            { medicineId5: '', quantity5: '', times5: '', quantityPerTimes5: '' },
            { medicineId6: '', quantity6: '', times6: '', quantityPerTimes6: '' },
            { medicineId7: '', quantity7: '', times7: '', quantityPerTimes7: '' }
        ]
    });


    useEffect(() => {
        fetchData();
    }, [uid]);

    const fetchData = async () => {
        try {
            const [detailPrescriptionResult, medicineResult, prescriptionResult] = await Promise.all([
                detailPrescriptionService.findDetailPrescriptionById(uid),
                medicineService.getAllMedicine(),
                prescriptionService.findAll()
            ]);
            setData(detailPrescriptionResult);
            setMedicines(medicineResult);
            setPrescription(prescriptionResult)

        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data, [name] : value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const detailPrescription = {

                detailPrescription: [
                    {

                        times: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[0] ,
                        quantity: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[0] ,
                        quantityPerTimes: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[0] ,
                        medicineId: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[0]
                    },
                    {
                        times2: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[1] ,
                        quantity2: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[1]  ,
                        quantityPerTimes2: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split( ",")[1] ,
                        medicineId2: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[1]
                    },
                    {

                        times3: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[2] ,
                        quantity3: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[2] ,
                        quantityPerTimes3: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[2],
                        medicineId3: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[2]
                    },
                    {

                        times4: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[3] ,
                        quantity4: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[3] ,
                        quantityPerTimes4: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[3],
                        medicineId4: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[3]
                    },
                    {

                        times5: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[4] ,
                        quantity5: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[4]  ,
                        quantityPerTimes5: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[4] ,
                        medicineId5: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[4]
                    },
                    {
                        times6: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[5] ,
                        quantity6: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[5],
                        quantityPerTimes6: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[5],
                        medicineId6: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[5]
                    },
                    {
                        times7: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[6],
                        quantity7: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[6] ,
                        quantityPerTimes7: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[6] ,
                        medicineId7: data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[6]
                    },

                ],
                prescription: {
                    id: data.prescriptions?.[0]?.id ,
                    name: data.prescriptions?.[0]?.name,
                    target: data.prescriptions?.[0]?.target,
                    treatmentPeriod: data.prescriptions?.[0]?.treatmentPeriod,
                    note: data.prescriptions?.[0]?.note,
                    symptom: {
                        name: data.name
                    }
                }
            }

            const validationErrors = {}

            if(!data.prescriptions?.[0]?.name?.trim()) {
                validationErrors.name = "Name is required"
            }


            if(!data.name?.trim()) {
                validationErrors.symptom = "Symptom is required"
            }

            if (!data.prescriptions?.[0]?.treatmentPeriod?.trim()) {
                validationErrors.treatmentPeriod = "TreatmentPeriod is required";
            } else if (!Number.isInteger(Number(data.prescriptions?.[0]?.treatmentPeriod?.trim()))) {
                validationErrors.treatmentPeriod = "TreatmentPeriod must be an integer";
            }

            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[0].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[0].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[0].trim())))){
                validationErrors.quantity = "Quantity, times and quantity per times must be an integer";
            }

            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[1].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[1].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[1].trim())))){
                validationErrors.quantity1 = "Quantity, times and quantity per times must be an integer";
            }

            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[2].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[2].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[2].trim())))){
                validationErrors.quantity2 = "Quantity, times and quantity per times must be an integer";
            }

            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[3].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[3].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[3].trim())))){
                validationErrors.quantity3 = "Quantity, times and quantity per times must be an integer";
            }
            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[4].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[4].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[4].trim())))){
                validationErrors.quantity4 = "Quantity, times and quantity per times must be an integer";
            }
            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[5].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[5].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[5].trim())))){
                validationErrors.quantity5 = "Quantity, times and quantity per times must be an integer";
            }
            if(!Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[6].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[6].trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[6].trim())))){
                validationErrors.quantity6 = "Quantity, times and quantity per times must be an integer";
            }


            console.log(props.exName);
            console.log(data.prescriptions?.[0]?.name);


            if (props.exName === data.prescriptions?.[0]?.name || props.exName !== data.prescriptions?.[0]?.name ) {
                const detail = await detailPrescriptionService.updateDetailPrescription(uid, detailPrescription);
                console.log(detail);
                await fetchData();
                props.onLoad();
                toast.success(`🦁 Prescription updated successfully!`, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }



            setErrors(validationErrors);


            if(Object.keys(validationErrors).length === 0) {
             if (typeof detail === 'object') {
                    await fetchData();
                    props.onLoad();
                    setErrors(" ");
                    toast.success(`🦁 Prescription updated successfully!`, {
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    console.log('The result is of an unexpected type.');
                }

            }

        } catch (error) {
            console.error(error);
        }
    };


    if (data != null) {
        return (
            <>
                <Modal  {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                >
                    <Modal.Header closeButton className="bg text-white">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sửa Toa Thuốc
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik>

                            <form onSubmit={handleUpdate}>

                                <Field type="hidden" name="id" id="id" className="form-control"/>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Tên Toa Thuốc
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.prescriptions?.[0]?.name || ''}
                                        onChange={(e) => setData({
                                            ...data,
                                            prescriptions: [{
                                                ...data.prescriptions?.[0],
                                                name: e.target.value
                                            }, ...data.prescriptions.slice(1)]
                                        })}
                                        id="name"
                                        className="form-control"
                                        autoFocus
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                    {errors.same && <span className="error-message">{errors.same}</span>}

                                </div>


                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Đối tượng
                                    </label>
                                    <select
                                        name="prescription.target"
                                        className="form-select"
                                        value={data.prescriptions?.[0]?.target || ''}
                                        onChange={(e) => setData({
                                            ...data,
                                            prescriptions: [{
                                                ...data.prescriptions?.[0],
                                                target: e.target.value
                                            }, ...data.prescriptions.slice(1)]
                                        })}
                                    >
                                        <option value="1">Người lớn</option>
                                        <option value="2">Trẻ em</option>
                                        <option value="3">Phụ nữ mang thai</option>
                                    </select>
                                </div>



                                <div className="mb-3">
                                    <label htmlFor="symptom" className="form-label">
                                        Triệu chứng
                                    </label>
                                    <input type="text" className="form-control"
                                           value={data.name || ''}
                                           onChange={(e) => setData({
                                               ...data,
                                               name: e.target.value,
                                           })}
                                    />
                                    {errors.symptom && <span className="error-message">{errors.symptom}</span>}

                                </div>


                                <div className="mb-3">
                                    <label htmlFor="treatment_period" className="form-label">
                                        Số ngày uống
                                    </label>
                                    <input type="text"  className="form-control"
                                           value={data.prescriptions?.[0]?.treatmentPeriod || ''}
                                           onChange={(e) => setData({
                                               ...data,
                                               prescriptions: [{
                                                   ...data.prescriptions?.[0],
                                                   treatmentPeriod: e.target.value
                                               }, ...data.prescriptions.slice(1)]
                                           })}
                                    />
                                    {errors.treatmentPeriod && <span className="error-message">{errors.treatmentPeriod}</span>}

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="note" className="form-label">
                                        Ghi chú
                                    </label>
                                    <input type="text" className="form-control"
                                           value={data.prescriptions?.[0]?.note || ''}
                                           onChange={(e) => setData({
                                               ...data,
                                               prescriptions: [{
                                                   ...data.prescriptions?.[0],
                                                   note: e.target.value
                                               }, ...data.prescriptions.slice(1)]
                                           })}
                                    /></div>
                                <fieldset>
                                    <legend className="w-auto">
                                        Chỉ định
                                    </legend>

                                    {data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[0] ? (
                                        <>
                                            <div className="form-group slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">1.</label>
                                                </div>
                                                <select name="detailPrescription.[0].medicineId"
                                                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[0] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            newData.prescriptions[0].detailPrescriptions[0].medicineList = e.target.value;
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4">
                                                    <option value=" ">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option value={(medicine.id)}>{medicine.name}</option>
                                                    ))}
                                                </select>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity3"
                                                           type="text"
                                                           name="quantity"
                                                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[0] || ''}
                                                           onChange={(e) => {
                                                               const newData = {...data};
                                                               newData.prescriptions[0].detailPrescriptions[0].quantity = e.target.value;
                                                               setData(newData);
                                                           }}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData}
                                                            className="btn btn-secondary"
                                                    ><i
                                                        className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>


                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               newData.prescriptions[0].detailPrescriptions[0].times = e.target.value;
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>


                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = e.target.value;
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                                {errors.quantity &&
                                                    <span className="error-message">{errors.quantity}</span>}

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">1.</label>
                                                </div>
                                                <select name="detailPrescription.[0].medicineId"
                                                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[0] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            newData.prescriptions[0].detailPrescriptions[0].medicineList = e.target.value;
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4">
                                                    <option value=" ">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option value={(medicine.id)}>{medicine.name}</option>
                                                    ))}
                                                </select>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity3"
                                                           type="text"
                                                           disabled
                                                           name="quantity"
                                                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[0] || ''}
                                                           onChange={(e) => {
                                                               const newData = {...data};
                                                               newData.prescriptions[0].detailPrescriptions[0].quantity = e.target.value;
                                                               setData(newData);
                                                           }}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData}
                                                            className="btn btn-secondary"
                                                    ><i
                                                        className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>


                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times"
                           disabled
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               newData.prescriptions[0].detailPrescriptions[0].times = e.target.value;
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>


                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes"
                           disabled
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = e.target.value;
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                                {errors.quantity &&
                                                    <span className="error-message">{errors.quantity}</span>}

                                            </div>
                                        </>
                                    )}



                                    {/*2*/}

                                    {data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[1] ? (
                                        <>
                                            <div className="form-group slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">2.</label>
                                                </div>
                                                <select
                                                    name="detailPrescription.[1].medicineId2"
                                                    value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[1] || ''}
                                                    onChange={(e) => {
                                                        const newData = {...data};
                                                        const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                        medicineList[1] = e.target.value;
                                                        newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                        setData(newData);
                                                    }}
                                                    className="form-select slay4"
                                                >
                                                    <option value="">Chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id}
                                                                value={medicine.id}>{medicine.name}</option>
                                                    ))}
                                                </select>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity2"
                                                           type="text"
                                                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[1] || ''}
                                                           onChange={(e) => {
                                                               const newData = {...data};
                                                               const quantity = newData.prescriptions[0].detailPrescriptions[0].quantity.split(",");
                                                               quantity[1] = e.target.value;
                                                               newData.prescriptions[0].detailPrescriptions[0].quantity = quantity.join(",");
                                                               setData(newData);
                                                           }}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" className="btn btn-secondary"
                                                            onClick={clearMedicineData2}><i
                                                        className="bi bi-trash3-fill"></i>
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[1] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times.split(",");
                               quantityPerTimesArray[1] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[1] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[1] = e.target.value;
                            newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />

                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                                {errors.quantity1 &&
                                                    <span className="error-message">{errors.quantity1}</span>}

                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">2.</label>
                                                </div>
                                                <select
                                                    name="detailPrescription.[1].medicineId2"
                                                    value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[1] || ''}
                                                    onChange={(e) => {
                                                        const newData = {...data};
                                                        const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                        medicineList[1] = e.target.value;
                                                        newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                        setData(newData);
                                                    }}
                                                    className="form-select slay4"
                                                >
                                                    <option value="">Chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id}
                                                                value={medicine.id}>{medicine.name}</option>
                                                    ))}
                                                </select>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity2"
                                                           disabled
                                                           type="text"
                                                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[1] || ''}
                                                           onChange={(e) => {
                                                               const newData = {...data};
                                                               const quantity = newData.prescriptions[0].detailPrescriptions[0].quantity.split(",");
                                                               quantity[1] = e.target.value;
                                                               newData.prescriptions[0].detailPrescriptions[0].quantity = quantity.join(",");
                                                               setData(newData);
                                                           }}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" className="btn btn-secondary"
                                                            onClick={clearMedicineData2}><i
                                                        className="bi bi-trash3-fill"></i>
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           disabled
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[1] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times.split(",");
                               quantityPerTimesArray[1] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        disabled
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[1] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[1] = e.target.value;
                            newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />

                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                                {errors.quantity1 &&
                                                    <span className="error-message">{errors.quantity1}</span>}

                                            </div>

                                        </>
                                    )}


                                    {/*3*/}


                                    <div className="form-group slay">
                                        <div className="slay3">
                                            <label htmlFor="applicable-object" className="form-label">2.</label>
                                        </div>
                                        <select
                                            name="detailPrescription.[1].medicineId3"
                                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[2] || ''}
                                            onChange={(e) => {
                                                const newData = {...data};
                                                const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                medicineList[2] = e.target.value;
                                                newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                setData(newData);
                                            }}
                                            className="form-select slay4"
                                        >
                                            <option value="">Chọn thuốc</option>
                                            {medicines?.map((medicine) => (
                                                <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                                            ))}
                                        </select>

                                        <div className="slay5">
                                            <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                   id="quantity3"
                                                   type="text"
                                                   value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[2] || ''}
                                                   onChange={(e) => {
                                                       const newData = {...data};
                                                       const quantity = newData.prescriptions[0].detailPrescriptions[0].quantity.split(",");
                                                       quantity[2] = e.target.value;
                                                       newData.prescriptions[0].detailPrescriptions[0].quantity = quantity.join(",");
                                                       setData(newData);
                                                   }}
                                            />
                                            <label className="form-label" htmlFor="quantity3"
                                                   style={{marginLeft: '2px'}}>viên</label>
                                        </div>

                                        <div className="slay6">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={clearMedicineData3}><i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="slay7">
                                        <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[2] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times.split(",");
                               quantityPerTimesArray[2] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes3"
                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[2] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[2] = e.target.value;
                            newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />

                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        {errors.quantity2 && <span className="error-message">{errors.quantity2}</span>}

                                    </div>

                                    {/*4*/}

                                    <div className="form-group slay">
                                        <div className="slay3">
                                            <label htmlFor="applicable-object" className="form-label">4.</label>
                                        </div>
                                        <select
                                            name="detailPrescription.[1].medicineId2"
                                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[3] || ''}
                                            onChange={(e) => {
                                                const newData = {...data};
                                                const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                medicineList[3] = e.target.value;
                                                newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                setData(newData);
                                            }}
                                            className="form-select slay4"
                                        >
                                            <option value="">Chọn thuốc</option>
                                            {medicines?.map((medicine) => (
                                                <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                                            ))}
                                        </select>

                                        <div className="slay5">
                                            <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                   id="quantity4"
                                                   type="text"
                                                   value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[3] || ''}
                                                   onChange={(e) => {
                                                       const newData = {...data};
                                                       const quantity = newData.prescriptions[0].detailPrescriptions[0].quantity.split(",");
                                                       quantity[3] = e.target.value;
                                                       newData.prescriptions[0].detailPrescriptions[0].quantity = quantity.join(",");
                                                       setData(newData);
                                                   }}
                                            />
                                            <label className="form-label" htmlFor="quantity3"
                                                   style={{marginLeft: '2px'}}>viên</label>
                                        </div>

                                        <div className="slay6">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={clearMedicineData4}><i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="slay7">
                                        <p>Ngày uống <span>
                     <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[3] || ''}
                            onChange={(e) => {
                                const newData = {...data};
                                const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times.split(",");
                                quantityPerTimesArray[3] = e.target.value;
                                newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                                setData(newData);
                            }}

                     />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[3] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[3] = e.target.value;
                            newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>

                                        {errors.quantity3 && <span className="error-message">{errors.quantity3}</span>}

                                    </div>

                                    {/*5*/}

                                    <div className="form-group slay">
                                        <div className="slay3">
                                            <label htmlFor="applicable-object" className="form-label">5.</label>
                                        </div>
                                        <select
                                            className="form-select slay4"
                                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[4] || ''}
                                            onChange={(e) => {
                                                const newData = {...data};
                                                const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                medicineList[4] = e.target.value;
                                                newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                setData(newData);
                                            }}
                                        >
                                            <option value=" ">chọn thuốc</option>
                                            {medicines?.map((medicine) => (
                                                <option value={(medicine.id)}>{medicine.name}</option>
                                            ))}
                                        </select>

                                        <div className="slay5">
                                            <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                   id="quantity2"
                                                   type="text"
                                                   value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[4] || ''}
                                                   onChange={(e) => {
                                                       const newData = {...data};
                                                       const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantity?.split(",");
                                                       quantityPerTimesArray[4] = e.target.value;
                                                       newData.prescriptions[0].detailPrescriptions[0].quantity = quantityPerTimesArray.join(",");
                                                       setData(newData);
                                                   }}/>
                                            <label className="form-label" htmlFor="quantity3"
                                                   style={{marginLeft: '2px'}}>viên</label>
                                        </div>

                                        <div className="slay6">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={clearMedicineData5}><i className="bi bi-trash3-fill"></i>
                                            </button>

                                        </div>

                                    </div>
                                    <div className="slay7">
                                        <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[4] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times?.split(",");
                               quantityPerTimesArray[4] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>



                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes4"
                        value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[4] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes?.split(",");
                            quantityPerTimesArray[4] = e.target.value;
                            newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        {errors.quantity4 && <span className="error-message">{errors.quantity4}</span>}

                                    </div>

                                    {/*6*/}

                                    <div className="form-group slay">
                                        <div className="slay3">
                                            <label htmlFor="applicable-object" className="form-label">6.</label>
                                        </div>
                                        <select
                                            className="form-select slay4"
                                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[5] || ''}
                                            onChange={(e) => {
                                                const newData = {...data};
                                                const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                medicineList[5] = e.target.value;
                                                newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                setData(newData);
                                            }}
                                        >
                                            <option value=" ">chọn thuốc</option>
                                            {medicines?.map((medicine) => (
                                                <option value={(medicine.id)}>{medicine.name}</option>
                                            ))}
                                        </select>

                                        <div className="slay5">
                                            <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                   id="quantity2"
                                                   type="text"
                                                   value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[5] || ''}
                                                   onChange={(e) => {
                                                       const newData = {...data};
                                                       const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantity?.split(",");
                                                       quantityPerTimesArray[5] = e.target.value;
                                                       newData.prescriptions[0].detailPrescriptions[0].quantity = quantityPerTimesArray.join(",");
                                                       setData(newData);
                                                   }}/>
                                            <label className="form-label" htmlFor="quantity3"
                                                   style={{marginLeft: '2px'}}>viên</label>
                                        </div>

                                        <div className="slay6">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={clearMedicineData6}><i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="slay7">
                                        <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[5] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times?.split(",");
                               quantityPerTimesArray[5] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}
                    />

                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>

                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[5] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes?.split(",");
                               quantityPerTimesArray[5] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}
                    />


                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        {errors.quantity5 && <span className="error-message">{errors.quantity5}</span>}

                                    </div>


                                    {/*7*/}

                                    <div className="form-group slay">
                                        <div className="slay3">
                                            <label htmlFor="applicable-object" className="form-label">7.</label>
                                        </div>
                                        <select
                                            className="form-select slay4"
                                            value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.medicineList?.split(",")[6] || ''}
                                            onChange={(e) => {
                                                const newData = {...data};
                                                const medicineList = newData.prescriptions[0].detailPrescriptions[0].medicineList.split(",");
                                                medicineList[6] = e.target.value;
                                                newData.prescriptions[0].detailPrescriptions[0].medicineList = medicineList.join(",");
                                                setData(newData);
                                            }}
                                        >
                                            <option value=" ">chọn thuốc</option>
                                            {medicines?.map((medicine) => (
                                                <option value={(medicine.id)}>{medicine.name}</option>
                                            ))}
                                        </select>

                                        <div className="slay5">
                                            <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                   id="quantity2"
                                                   type="text"
                                                   value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantity?.split(",")[6] || ''}
                                                   onChange={(e) => {
                                                       const newData = {...data};
                                                       const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantity?.split(",");
                                                       quantityPerTimesArray[6] = e.target.value;
                                                       newData.prescriptions[0].detailPrescriptions[0].quantity = quantityPerTimesArray.join(",");
                                                       setData(newData);
                                                   }}/>
                                            <label className="form-label" htmlFor="quantity3"
                                                   style={{marginLeft: '2px'}}>viên</label>
                                        </div>

                                        <div className="slay6">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={clearMedicineData7}><i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="slay7">
                                        <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.times?.split(",")[6] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].times?.split(",");
                               quantityPerTimesArray[6] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>

                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.detailPrescriptions?.[0]?.quantityPerTimes?.split(",")[6] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes?.split(",");
                               quantityPerTimesArray[6] = e.target.value;
                               newData.prescriptions[0].detailPrescriptions[0].quantityPerTimes = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        {errors.quantity6 && <span className="error-message">{errors.quantity6}</span>}

                                    </div>


                                </fieldset>

                                <Modal.Footer className="bg-light">
                                    <div className="group-button d-flex justify-content-between">
                                        <div className="mb-3 d-flex justify-content-center gr1 btn1">
                                            <Button onClick={props.onHide} className="btn btn-info custom-button">
                                                Hủy
                                            </Button>
                                        </div>


                                        <div className="mb-3 d-flex justify-content-center gr2 btn2">
                                            <button type="submit" className="btn btn-primary">
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </Modal.Footer>
                            </form>
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
        )
            ;
    }
}
