import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useRef, useState} from "react";

import * as medicineService from "../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";

import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";


export default function AddPrescriptionModalComponent(props) {
    const [medicines, setMedicines] = useState([])
    const [errors, setErrors] = useState('');
    const [errors2, setErrors2] = useState('');


    const findAll = async () => {
        const result = await medicineService.getAllMedicine();
        setMedicines(result);
    }

    useEffect(() => {
        findAll();
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Tên không được để trống'),
        symptom: Yup.string()
            .required('Triệu chứng không được để trống'),
        treatmentPeriod: Yup.number()
            .required('Số ngày uống không được để trống')
            .positive('Số ngày uống phải là một số dương')
            .integer('Số ngày uống phải là một số nguyên')
    });






    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const [formData, setFormData] = useState({
        medicineId: '',
        quantity: '',
        times: '',
        quantityPerTimes: '',
        medicineId2: '',
        quantity2: '',
        times2: '',
        quantityPerTimes2: '',
        medicineId3: '',
        quantity3: '',
        times3: '',
        quantityPerTimes3: '',
        medicineId4: '',
        quantity4: '',
        times4: '',
        quantityPerTimes4: '',
        medicineId5: '',
        quantity5: '',
        times5: '',
        quantityPerTimes5: '',
        medicineId6: '',
        quantity6: '',
        times6: '',
        quantityPerTimes6: '',
        medicineId7: '',
        quantity7: '',
        times7: '',
        quantityPerTimes7: ''
    });

    const clearMedicineData = () => {
        setFormData({
            ...formData,
            quantity: '',
            times: '',
            quantityPerTimes: '',
            medicineId: ''
        });
        console.log(formData);
    };


    const clearMedicineData2 = () =>{
        setFormData({
            ...formData,
            quantity2:'',
            times2:'',
            quantityPerTimes2:'',
            medicineId2:''
        })
    };

    const clearMedicineData3 = () =>{
        setFormData({
            ...formData,
            medicineId3:'',
            quantity3:'',
            times3:'',
            quantityPerTimes3:''
        })
    };

    const clearMedicineData4 = () =>{
        setFormData({
            ...formData,
            medicineId4:'',
            quantity4:'',
            times4:'',
            quantityPerTimes4:''
        })
    };

    const clearMedicineData5 = () =>{
        setFormData({
            ...formData,
            medicineId5:'',
            quantity5:'',
            times5:'',
            quantityPerTimes5:''
        })
    };

    const clearMedicineData6 = () =>{
        setFormData({
            ...formData,
            medicineId6:'',
            quantity6:'',
            times6:'',
            quantityPerTimes6:''
        })
    };
    const clearMedicineData7 = () =>{
        setFormData({
            medicineId7:'',
            quantity7:'',
            times7:'',
            quantityPerTimes7:''
        })
    };


    const handleClearForm = () => {
        if (props.show === true) {
            props.onHide();
            setErrors("");
            setFormData({

                medicineId: '',
                quantity: '',
                times: '',
                quantityPerTimes: '',
                medicineId2: '',
                quantity2: '',
                times2: '',
                quantityPerTimes2: '',
                medicineId3: '',
                quantity3: '',
                times3: '',
                quantityPerTimes3: '',
                medicineId4: '',
                quantity4: '',
                times4: '',
                quantityPerTimes4: '',
                medicineId5: '',
                quantity5: '',
                times5: '',
                quantityPerTimes5: '',
                medicineId6: '',
                quantity6: '',
                times6: '',
                quantityPerTimes6: '',
                medicineId7: '',
                quantity7: '',
                times7: '',
                quantityPerTimes7: ''
            });
        }
        setErrors("");
        setFormData({

            medicineId: '',
            quantity: '',
            times: '',
            quantityPerTimes: '',
            medicineId2: '',
            quantity2: '',
            times2: '',
            quantityPerTimes2: '',
            medicineId3: '',
            quantity3: '',
            times3: '',
            quantityPerTimes3: '',
            medicineId4: '',
            quantity4: '',
            times4: '',
            quantityPerTimes4: '',
            medicineId5: '',
            quantity5: '',
            times5: '',
            quantityPerTimes5: '',
            medicineId6: '',
            quantity6: '',
            times6: '',
            quantityPerTimes6: '',
            medicineId7: '',
            quantity7: '',
            times7: '',
            quantityPerTimes7: ''
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault()
        const createPrescription = async () => {
            try {

                const detailPrescription = {
                    prescription: {
                        name: formData.name,
                        target: formData.target,
                        treatmentPeriod: formData.treatmentPeriod,
                        note: formData.note,
                        symptom: {
                            name: formData.symptom
                        }
                    },

                    detailPrescription: [
                        {
                            medicineId: formData.medicineId,
                            times: formData.times,
                            quantity: formData.quantity,
                            quantityPerTimes: formData.quantityPerTimes
                        },
                        {
                            medicineId2: formData.medicineId2,
                            times2: formData.times2,
                            quantity2: formData.quantity2,
                            quantityPerTimes2: formData.quantityPerTimes2
                        },
                        {
                            medicineId3: formData.medicineId3,
                            times3: formData.times3,
                            quantity3: formData.quantity3,
                            quantityPerTimes3: formData.quantityPerTimes3
                        },
                        {
                            medicineId4: formData.medicineId4,
                            times4: formData.times4,
                            quantity4: formData.quantity4,
                            quantityPerTimes4: formData.quantityPerTimes4
                        },
                        {
                            medicineId5: formData.medicineId5,
                            times5: formData.times5,
                            quantity5: formData.quantity5,
                            quantityPerTimes5: formData.quantityPerTimes5
                        },
                        {
                            medicineId6: formData.medicineId6,
                            times6: formData.times6,
                            quantity6: formData.quantity6,
                            quantityPerTimes6: formData.quantityPerTimes6
                        },
                        {
                            medicineId7: formData.medicineId7,
                            times7: formData.times7,
                            quantity7: formData.quantity7,
                            quantityPerTimes7: formData.quantityPerTimes7
                        }
                    ]

                };

                console.log(detailPrescription)

                const validationErrors = {}
                const validationErrors2 = {}

                if(!formData.name?.trim()) {
                    validationErrors.name = "Tên đơn thuốc không được bỏ trống!"
                }

                if(!formData.symptom?.trim()) {
                    validationErrors.symptom = "Triệu chứng không được bỏ trống!"
                }

                if(!formData.target?.trim()) {
                    validationErrors.target = "Đối tượng không được bỏ trống!"
                }

                if (!formData.treatmentPeriod?.trim()) {
                    validationErrors.treatmentPeriod = "Số ngày uống không được bỏ trống!";
                } else if (!Number.isInteger(Number(formData.treatmentPeriod.trim()))) {
                    validationErrors.treatmentPeriod = "Số ngày uống phải là một số nguyên";
                }

                if(!Number.isInteger((Number(formData.quantity?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes?.trim()))) || !Number.isInteger((Number(formData.times?.trim())))){
                    validationErrors.quantity = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity2?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes2?.trim()))) || !Number.isInteger((Number(formData.times2?.trim())))){
                    validationErrors.quantity2 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity3?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes3?.trim()))) || !Number.isInteger((Number(formData.times3?.trim())))){
                    validationErrors.quantity3 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity4?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes4?.trim()))) || !Number.isInteger((Number(formData.times4?.trim())))){
                    validationErrors.quantity4 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity5?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes5?.trim()))) || !Number.isInteger((Number(formData.times5?.trim())))){
                    validationErrors.quantity5 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity6?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes6?.trim()))) || !Number.isInteger((Number(formData.times6?.trim())))){
                    validationErrors.quantity6 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }
                if(!Number.isInteger((Number(formData.quantity7?.trim()))) || !Number.isInteger((Number(formData.quantityPerTimes7?.trim()))) || !Number.isInteger((Number(formData.times7?.trim())))){
                    validationErrors.quantity7 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
                }

                if(!formData.medicineId.trim() && !formData.medicineId2.trim() && !formData.medicineId3.trim() && !formData.medicineId4.trim() && !formData.medicineId5.trim() && !formData.medicineId6.trim() && !formData.medicineId7.trim()){
                    validationErrors.medicineId = "Hãy chọn it nhất một loại thuốc"
                }

                setErrors(validationErrors);


                if(Object.keys(validationErrors).length === 0) {
                    const detail = await detailPrescriptionService.createDetailPrescription(detailPrescription);

                    if (typeof detail === 'string') {
                        validationErrors2.same = detail;
                        setErrors2(validationErrors2);
                    }
                    else if (typeof detail === 'object') {
                        props.onHide();
                        props.onLoad();
                        handleClearForm();
                        toast.success('Create prescription successful!', {
                            autoClose: 1000
                        });
                    } else {
                        console.log('The result is of an unexpected type.');
                    }

                }

            } catch (error) {
                toast.error('Error creating prescription');
            }
        };
        createPrescription();

    }

    return (
        <>
            <Formik initialValues={{
                name: "",
                target: 1,
                treatmentPeriod: "",
                note: "",
                symptom: "",

                detailPrescription: [
                    {medicineId:"",times: "", quantity: "", quantityPerTimes: ""},
                    {medicineId2:"",times2: "", quantity2: "", quantityPerTimes2: ""},
                    {medicineId3:"",times3: "", quantity3: "", quantityPerTimes3: ""},
                    {medicineId4:"",times4: "", quantity4: "", quantityPerTimes4: ""},
                    {medicineId5:"",times5: "", quantity5: "", quantityPerTimes5: ""},
                    {medicineId6:"",times6: "", quantity6: "", quantityPerTimes6: ""},
                    {medicineId7:"",times7: "", quantity7: "", quantityPerTimes7: ""}
                ]

            }}


            >


                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton className="bg text-white">
                            <Modal.Title id="contained-modal-title-vcenter">
                                Thêm Toa Thuốc
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Tên Toa Thuốc
                                </label>
                                <input type="text" name="name" id="name" className="form-control" autoFocus
                                    value={formData.name}
                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                                {errors.name && <span className="error-message">{errors.name}</span>}
                                {errors2.same && <span className="error-message">{errors2.same}</span>}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    Đối tượng
                                </label>
                                <select
                                    name="target"
                                    className="form-select"
                                    value={formData.target}
                                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                                >
                                    <option value="">Chọn đối tượng</option>
                                    <option value="1">Người lớn</option>
                                    <option value="2">Trẻ em</option>
                                    <option value="3">Phụ nữ mang thai</option>
                                </select>
                                {errors.target && <span className="error-message">{errors.target}</span>}

                            </div>

                            <div className="mb-3">
                                <label htmlFor="symptom" className="form-label">
                                    Triệu chứng
                                </label>
                                <input type="text" name="symptom" className="form-control"
                                       value={formData.symptom}
                                       onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                                />

                                <span>
                                    {errors.symptom && <span className="error-message">{errors.symptom}</span>}

                                </span>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="treatmentPeriod" className="form-label">
                                    Số ngày uống
                                </label>
                                <input type="text" name="treatmentPeriod" className="form-control"
                                       value={formData.treatmentPeriod}
                                       onChange={(e) => setFormData({ ...formData, treatmentPeriod: e.target.value })}
                                />
                                <span>

                                <span>
                                    {errors.treatmentPeriod && <span className="error-message">{errors.treatmentPeriod}</span>}
                                </span>
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="note" className="form-label">
                                    Ghi chú
                                </label>
                                <input type="text" name="note" id="note" className="form-control"
                                       value={formData.note}
                                       onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                />
                            </div>
                            <fieldset>
                                <legend className="w-auto">
                                    Chỉ định
                                </legend>

                                {formData.medicineId ? (
                                    <>
                                        <div className="form-group slay">
                                                <label>1.</label>
                                            <div className="slay4">
                                                <Field name="medicineId" as="select" className="form-select"
                                                       value={formData.medicineId}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>


                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity"
                                                       value={formData.quantity}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity: e.target.value
                                                       })}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>

                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData}
                                                        className="btn btn-secondary">
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                                           name="times"
                                           value={formData.times}
                                           onChange={(e) => setFormData({...formData, times: e.target.value})}
                                    />
                                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                                </span>, mỗi lần uống <span>
                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                                           name="quantityPerTimes"
                                           value={formData.quantityPerTimes}
                                           onChange={(e) => setFormData({...formData, quantityPerTimes: e.target.value})}

                                    />
                                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                                </span></p>
                                        </div>
                                        <span>
                                            {errors.quantity && <span className="error-message">{errors.quantity}</span>}

                                        </span>
                                    </>

                                ) : (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">1.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId" as="select" className="form-select"
                                                       value={formData.medicineId}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>


                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       value={formData.quantity}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity: e.target.value
                                                       })}
                                                       disabled

                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>


                                            </div>

                                            <div className="slay6">
                                                <button type="button"
                                                        className="btn btn-secondary">
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"

                                           value={formData.times}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               times: e.target.value
                                           })}
                                           disabled

                                    />
                                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                                </span>, mỗi lần uống <span>
                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                                           disabled
                                           value={formData.quantityPerTimes}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               quantityPerTimes: e.target.value
                                           })}

                                    />
                                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                                </span></p>
                                        </div>
                                    </>
                                )

                                }

                                {/*2*/}

                                {
                                    formData.medicineId2 ? (
                                        <>
                                            <div className=" slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">2.</label>
                                                </div>
                                                <div className="slay4">
                                                    <Field name="medicineId2" as="select" className="form-select"
                                                           value={formData.medicineId2}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               medicineId2: e.target.value
                                                           })}
                                                    >
                                                        <option value="">chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.id} value={medicine.id}>
                                                                {medicine.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>


                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity2"
                                                           type="text"
                                                           name="quantity2"
                                                           value={formData.quantity2}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               quantity2: e.target.value
                                                           })}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData2}
                                                            className="btn btn-secondary"
                                                    ><i
                                                        className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times2"
                           value={formData.times2}
                           onChange={(e) => setFormData({...formData, times2: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes2"
                           value={formData.quantityPerTimes2}
                           onChange={(e) => setFormData({...formData, quantityPerTimes2: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            </div>
                                            <span>
                                            {errors.quantity2 &&
                                                <span className="error-message">{errors.quantity2}</span>}

                                        </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group slay">
                                            <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">2.</label>
                                                </div>
                                                <div className="slay4">
                                                    <Field name="medicineId2" as="select" className="form-select"
                                                           value={formData.medicineId2}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               medicineId2: e.target.value
                                                           })}
                                                    >
                                                        <option value="">chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.id} value={medicine.id}>
                                                                {medicine.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>


                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity2"
                                                           type="text"
                                                           name="quantity2"
                                                           value={formData.quantity2}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               quantity2: e.target.value
                                                           })}
                                                          disabled
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData2}
                                                            className="btn btn-secondary"
                                                    ><i
                                                        className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times2"
                           value={formData.times2}
                           onChange={(e) => setFormData({
                               ...formData,
                               times2: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes2"
                           value={formData.quantityPerTimes2}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes2: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            </div>
                                        </>
                                    )
                                }


                                {/*3*/}

                                {formData.medicineId3 ? (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">3.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId3" as="select" className="form-select"
                                                       value={formData.medicineId3}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId3: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity3"
                                                       value={formData.quantity3}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity3: e.target.value
                                                       })}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData3}
                                                        className="btn btn-secondary"
                                                ><i
                                                    className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times3"
                           value={formData.times3}
                           onChange={(e) => setFormData({...formData, times3: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes3"
                           value={formData.quantityPerTimes3}
                           onChange={(e) => setFormData({...formData, quantityPerTimes3: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                        <span>
                                            {errors.quantity3 &&
                                                <span className="error-message">{errors.quantity3}</span>}

                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group slay">
                                        <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">3.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId3" as="select" className="form-select"
                                                       value={formData.medicineId3}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId3: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity3"
                                                       value={formData.quantity3}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity3: e.target.value
                                                       })}
                                                       disabled
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData3}
                                                        className="btn btn-secondary"
                                                ><i
                                                    className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times3"
                           value={formData.times3}
                           onChange={(e) => setFormData({
                               ...formData,
                               times3: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes3"
                           value={formData.quantityPerTimes3}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes3: e.target.value
                           })}
                          disabled
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                    </>
                                )
                                }



                                {/*4*/}

                                {formData.medicineId4 ? (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">4.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId4" as="select" className="form-select"
                                                       value={formData.medicineId4}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId4: e.target.value
                                                       })}>
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity4"
                                                       value={formData.quantity4}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity4: e.target.value
                                                       })}/>
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData4}
                                                        className="btn btn-secondary"
                                                ><i className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times4"
                           value={formData.times4}
                           onChange={(e) => setFormData({...formData, times4: e.target.value})}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes4"
                           value={formData.quantityPerTimes4}
                           onChange={(e) => setFormData({...formData, quantityPerTimes4: e.target.value})}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                        <span>
                                            {errors.quantity4 &&
                                                <span className="error-message">{errors.quantity4}</span>}

                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group slay">
                                        <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">4.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId4" as="select" className="form-select"
                                                       value={formData.medicineId4}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId4: e.target.value
                                                       })}>
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity4"
                                                       value={formData.quantity4}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity4: e.target.value
                                                       })}
                                                       disabled/>
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData4}
                                                        className="btn btn-secondary"
                                                ><i className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times4"
                           value={formData.times4}
                           onChange={(e) => setFormData({
                               ...formData,
                               times4: e.target.value
                           })}
                           disabled/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes4"
                           value={formData.quantityPerTimes4}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes4: e.target.value
                           })}

                    disabled/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                    </>
                                )
                                }


                                {/*5*/}

                                {formData.medicineId5 ? (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">5.</label>
                                            </div>

                                            <div className="slay4">
                                                <Field name="medicineId5" as="select" className="form-select"
                                                       value={formData.medicineId5}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId5: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity5"
                                                       value={formData.quantity5}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity5: e.target.value
                                                       })}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData5}
                                                        className="btn btn-secondary"><i
                                                    className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times5"
                           value={formData.times5}
                           onChange={(e) => setFormData({...formData, times5: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes5"
                           value={formData.quantityPerTimes5}
                           onChange={(e) => setFormData({...formData, quantityPerTimes5: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                        <span>
                                            {errors.quantity5 &&
                                                <span className="error-message">{errors.quantity5}</span>}

                                        </span>
                                    </>
                                ) : (
                                    <>

                                        <div className="form-group slay">
                                        <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">5.</label>
                                            </div>

                                            <div className="slay4">
                                                <Field name="medicineId5" as="select" className="form-select"
                                                       value={formData.medicineId5}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId5: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity5"
                                                       value={formData.quantity5}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity5: e.target.value
                                                       })}
                                                       disabled
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData5}
                                                        className="btn btn-secondary"><i
                                                    className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times5"
                           value={formData.times5}
                           onChange={(e) => setFormData({
                               ...formData,
                               times5: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes5"
                           value={formData.quantityPerTimes5}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes5: e.target.value
                           })}
                          disabled
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                    </>

                                )}


                                {/*6*/}

                                {
                                    formData.medicineId6 ? (
                                        <>
                                            <div className="form-group slay">
                                                <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">6.</label>
                                                </div>
                                                <div className="slay4">
                                                    <Field name="medicineId6" as="select" className="form-select"
                                                           value={formData.medicineId6}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               medicineId6: e.target.value
                                                           })}
                                                    >
                                                        <option value="">chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.id} value={medicine.id}>
                                                                {medicine.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity3"
                                                           type="text"
                                                           name="quantity6"
                                                           value={formData.quantity6}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               quantity6: e.target.value
                                                           })}
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData6}
                                                            className="btn btn-secondary"
                                                    ><i className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times6"
                           value={formData.times6}
                           onChange={(e) => setFormData({...formData, times6: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes6"
                           value={formData.quantityPerTimes6}
                           onChange={(e) => setFormData({...formData, quantityPerTimes6: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            </div>
                                            <span>
                                            {errors.quantity6 &&
                                                <span className="error-message">{errors.quantity6}</span>}

                                        </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group slay">
                                            <div className="slay3">
                                                    <label htmlFor="applicable-object" className="form-label">6.</label>
                                                </div>
                                                <div className="slay4">
                                                    <Field name="medicineId6" as="select" className="form-select"
                                                           value={formData.medicineId6}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               medicineId6: e.target.value
                                                           })}
                                                    >
                                                        <option value="">chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.id} value={medicine.id}>
                                                                {medicine.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>

                                                <div className="slay5">
                                                    <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                           id="quantity3"
                                                           type="text"
                                                           name="quantity6"
                                                           value={formData.quantity6}
                                                           onChange={(e) => setFormData({
                                                               ...formData,
                                                               quantity6: e.target.value
                                                           })}
                                                           disabled
                                                    />
                                                    <label className="form-label" htmlFor="quantity3"
                                                           style={{marginLeft: '2px'}}>viên</label>
                                                </div>

                                                <div className="slay6">
                                                    <button type="button" onClick={clearMedicineData6}
                                                            className="btn btn-secondary"
                                                    ><i className="bi bi-trash3-fill"></i></button>
                                                </div>

                                            </div>
                                            <div className="slay7">
                                                <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times6"
                           value={formData.times6}
                           onChange={(e) => setFormData({
                               ...formData,
                               times6: e.target.value
                           })}
                          disabled
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes6"
                           value={formData.quantityPerTimes6}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes6: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            </div>
                                        </>
                                    )
                                }

                                {/*7*/}

                                {formData.medicineId7 ? (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">7.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId7" as="select" className="form-select"
                                                       value={formData.medicineId7}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId7: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity7"
                                                       value={formData.quantity7}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity7: e.target.value
                                                       })}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData7}
                                                        className="btn btn-secondary"
                                                ><i className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times7"
                           value={formData.times7}
                           onChange={(e) => setFormData({...formData, times7: e.target.value})}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes7"
                           value={formData.quantityPerTimes7}
                           onChange={(e) => setFormData({...formData, quantityPerTimes7: e.target.value})}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                        <span>
                                            {errors.quantity7 &&
                                                <span className="error-message">{errors.quantity7}</span>}

                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">7.</label>
                                            </div>
                                            <div className="slay4">
                                                <Field name="medicineId7" as="select" className="form-select"
                                                       value={formData.medicineId7}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           medicineId7: e.target.value
                                                       })}
                                                >
                                                    <option value="">chọn thuốc</option>
                                                    {medicines?.map((medicine) => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       name="quantity7"
                                                       value={formData.quantity7}
                                                       onChange={(e) => setFormData({
                                                           ...formData,
                                                           quantity7: e.target.value
                                                       })}
                                                       disabled
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" onClick={clearMedicineData7}
                                                        className="btn btn-secondary"
                                                ><i className="bi bi-trash3-fill"></i></button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times7"
                           value={formData.times7}
                           onChange={(e) => setFormData({
                               ...formData,
                               times7: e.target.value
                           })}
                           disabled

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes7"
                           value={formData.quantityPerTimes7}
                           onChange={(e) => setFormData({
                               ...formData,
                               quantityPerTimes7: e.target.value
                           })}
                           disabled
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                        </div>
                                        <span>
                                    {errors.medicineId &&
                                        <span className="error-message">{errors.medicineId}</span>}
                                </span>
                                    </>
                                )}


                            </fieldset>

                        </Modal.Body>
                        <Modal.Footer className="bg-light">
                        <div className="group-button d-flex justify-content-between">
                                <div className="mb-3 d-flex justify-content-center gr1 btn1">
                                    <Button onClick={handleClearForm} className="btn btn-info custom-button">
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
                </Modal>
            </Formik>
        </>
    );

}
