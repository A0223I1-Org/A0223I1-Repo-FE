import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useRef, useState} from "react";
import * as medicineService from "../../utils/InformationService/MedicineInformationManagementService/MedicineService";
import * as detailPrescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";

import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import "./prescription.css";


export default function AddPrescriptionModal(props) {
    const [medicines, setMedicines] = useState([])
    const findAll = async () => {
        const result = await medicineService.findAllMedicine();
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
        name: "",
        target: 1,
        treatmentPeriod: "",
        note: "",
        symptom: "",

        medicineId:'',
        quantity:'',
        times:'',
        quantityPerTimes:''
    },{
        medicineId2:'',
        quantity2:'',
        times2:'',
        quantityPerTimes2:''
    },{
        medicineId3:'',
        quantity3:'',
        times3:'',
        quantityPerTimes3:''
    },{
        medicineId4:'',
        quantity4:'',
        times4:'',
        quantityPerTimes4:''
    },{
        medicineId5:'',
        quantity5:'',
        times5:'',
        quantityPerTimes5:''
    },{
        medicineId6:'',
        quantity6:'',
        times6:'',
        quantityPerTimes6:''
    },{
        medicineId7:'',
        quantity7:'',
        times7:'',
        quantityPerTimes7:''
    });

    const clearMedicineData = () =>{
        setFormData({
            medicineId:'',
            quantity:'',
            times:'',
            quantityPerTimes:''
        })
    };

    const clearMedicineData2 = () =>{
        setFormData({
            medicineId2:'',
            quantity2:'',
            times2:'',
            quantityPerTimes2:''
        })
    };

    const clearMedicineData3 = () =>{
        setFormData({
            medicineId3:'',
            quantity3:'',
            times3:'',
            quantityPerTimes3:''
        })
    };

    const clearMedicineData4 = () =>{
        setFormData({
            medicineId4:'',
            quantity4:'',
            times4:'',
            quantityPerTimes4:''
        })
    };

    const clearMedicineData5 = () =>{
        setFormData({
            medicineId5:'',
            quantity5:'',
            times5:'',
            quantityPerTimes5:''
        })
    };

    const clearMedicineData6 = () =>{
        setFormData({
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
            setFormData({
                name: "",
                target: 1,
                treatmentPeriod: "",
                note: "",
                symptom: "",

                medicineId:'',
                quantity:'',
                times:'',
                quantityPerTimes:''
            },{
                medicineId2:'',
                quantity2:'',
                times2:'',
                quantityPerTimes2:''
            },{
                medicineId3:'',
                quantity3:'',
                times3:'',
                quantityPerTimes3:''
            },{
                medicineId4:'',
                quantity4:'',
                times4:'',
                quantityPerTimes4:''
            },{
                medicineId5:'',
                quantity5:'',
                times5:'',
                quantityPerTimes5:''
            },{
                medicineId6:'',
                quantity6:'',
                times6:'',
                quantityPerTimes6:''
            },{
                medicineId7:'',
                quantity7:'',
                times7:'',
                quantityPerTimes7:''
            });
        }
        setFormData({
            medicineId:'',
            quantity:'',
            times:'',
            quantityPerTimes:''
        },{
            medicineId2:'',
            quantity2:'',
            times2:'',
            quantityPerTimes2:''
        },{
            medicineId3:'',
            quantity3:'',
            times3:'',
            quantityPerTimes3:''
        },{
            medicineId4:'',
            quantity4:'',
            times4:'',
            quantityPerTimes4:''
        },{
            medicineId5:'',
            quantity5:'',
            times5:'',
            quantityPerTimes5:''
        },{
            medicineId6:'',
            quantity6:'',
            times6:'',
            quantityPerTimes6:''
        },{
            medicineId7:'',
            quantity7:'',
            times7:'',
            quantityPerTimes7:''
        });
    };

    // const handleSubmit = (values, { setSubmitting, isValid  }) => {
    //
    //     const createPrescription = async () => {
    //         try {
    //
    //             const detailPrescription = {
    //                 prescription: {
    //                     name: formData.name,
    //                     target: formData.target,
    //                     treatmentPeriod: formData.treatmentPeriod,
    //                     note: formData.note,
    //                     symptom: {
    //                         name: formData.symptom
    //                     }
    //                 },
    //                 medicineId: formData.medicineId,
    //
    //                 detailPrescription: [
    //                     {
    //                         medicineId: formData.medicineId,
    //                         times: formData.times,
    //                         quantity: formData.quantity,
    //                         quantityPerTimes: formData.quantityPerTimes
    //                     },
    //                     {
    //                         medicineId2: formData.medicineId2,
    //                         times2: formData.times2,
    //                         quantity2: formData.quantity2,
    //                         quantityPerTimes2: formData.quantityPerTimes2
    //                     },
    //                     {
    //                         medicineId3: formData.medicineId3,
    //                         times3: formData.times3,
    //                         quantity3: formData.quantity3,
    //                         quantityPerTimes3: formData.quantityPerTimes3
    //                     },
    //                     {
    //                         medicineId4: formData.medicineId4,
    //                         times4: formData.times4,
    //                         quantity4: formData.quantity4,
    //                         quantityPerTimes4: formData.quantityPerTimes4
    //                     },
    //                     {
    //                         medicineId5: formData.medicineId5,
    //                         times5: formData.times5,
    //                         quantity5: formData.quantity5,
    //                         quantityPerTimes5: formData.quantityPerTimes5
    //                     },
    //                     {
    //                         medicineId6: formData.medicineId6,
    //                         times6: formData.times6,
    //                         quantity6: formData.quantity6,
    //                         quantityPerTimes6: formData.quantityPerTimes6
    //                     },
    //                     {
    //                         medicineId7: formData.medicineId7,
    //                         times7: formData.times7,
    //                         quantity7: formData.quantity7,
    //                         quantityPerTimes7: formData.quantityPerTimes7
    //                     }
    //                 ]
    //
    //             };
    //
    //
    //             console.log(detailPrescription)
    //
    //             await detailPrescriptionService.createDetailPrescription(detailPrescription);
    //             props.onHide();
    //             props.onLoad();
    //
    //
    //             toast.success('Create prescription successful!');
    //         } catch (error) {
    //             toast.error('Error creating prescription');
    //         } finally {
    //             setSubmitting(false);
    //
    //         }
    //     };
    //     createPrescription();
    //
    // }

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
                    validationSchema={ Yup.object().shape({
                        name: Yup.string()
                            .required('Tên không được để trống'),
                        // symptom: Yup.string()
                        //     .required('Triệu chứng không được để trống'),
                        // treatmentPeriod: Yup.number()
                        //     .required('Số ngày uống không được để trống')
                        //     .positive('Số ngày uống phải là một số dương')
                        //     .integer('Số ngày uống phải là một số nguyên')
                    })}
                    onSubmit={(values, {setSubmitting}) => {
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
                                    medicineId: formData.medicineId,

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

                                console.log(formData);

                                console.log(detailPrescription)

                                await detailPrescriptionService.createDetailPrescription(detailPrescription);
                                props.onLoad();
                                props.onHide();

                                toast.success('Create prescription successful!');
                            } catch (error) {
                                toast.error('Error creating prescription');
                            } finally {
                                setSubmitting(false);

                            }
                        };
                        createPrescription();
                    }}>


                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Form>
                        <Modal.Header closeButton className="bg-success text-white">
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
                                <span>
                                   <ErrorMessage name="name" component="div" className="error-message"/>
                               </span>
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
                                    <option value="1">Người lớn</option>
                                    <option value="2">Trẻ em</option>
                                    <option value="3">Phụ nữ mang thai</option>
                                </select>

                                <ErrorMessage name="target" component="div" className="error-message"/>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    Triệu chứng
                                </label>
                                <input type="text" name="symptom" className="form-control"
                                       value={formData.symptom}
                                       onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                                />
                                <ErrorMessage name="symptom" component="div" className="error-message"/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="treatmentPeriod" className="form-label">
                                    Số ngày uống
                                </label>
                                <input type="text" name="treatmentPeriod" className="form-control"
                                       value={formData.treatmentPeriod}
                                       onChange={(e) => setFormData({ ...formData, treatmentPeriod: e.target.value })}
                                />
                                <ErrorMessage name="treatmentPeriod" component="div" className="error-message"/>
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

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">1.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId" as="select" className="form-select"
                                               value={formData.medicineId}
                                               onChange={(e) => setFormData({ ...formData, medicineId: e.target.value })}
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
                                               onChange={(e) => setFormData({...formData, quantity: e.target.value})}

                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData} ><i className="bi bi-trash3-fill"></i></button>
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


                                {/*2*/}

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">2.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId2" as="select" className="form-select"
                                               value={formData.medicineId2}
                                               onChange={(e) => setFormData({ ...formData, medicineId2: e.target.value })}
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
                                               onChange={(e) => setFormData({ ...formData, quantity2: e.target.value })}
                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData2}><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times2"
                           value={formData.times2}
                           onChange={(e) => setFormData({ ...formData, times2: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes2"
                           value={formData.quantityPerTimes2}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes2: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>

                                {/*3*/}

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">3.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId3" as="select" className="form-select"
                                               value={formData.medicineId3}
                                               onChange={(e) => setFormData({ ...formData, medicineId3: e.target.value })}
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
                                               onChange={(e) => setFormData({ ...formData, quantity3: e.target.value })}
                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData3}><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times3"
                           value={formData.times3}
                           onChange={(e) => setFormData({ ...formData, times3: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes3"
                           value={formData.quantityPerTimes3}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes3: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>

                                {/*4*/}

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">4.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId4" as="select" className="form-select"
                                               value={formData.medicineId4}
                                               onChange={(e) => setFormData({ ...formData, medicineId4: e.target.value })}>
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
                                               onChange={(e) => setFormData({ ...formData, quantity4: e.target.value })}/>
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData4}><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times4"
                           value={formData.times4}
                           onChange={(e) => setFormData({ ...formData, times4: e.target.value })}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes4"
                           value={formData.quantityPerTimes4}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes4: e.target.value })}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>

                                {/*5*/}
                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">5.</label>
                                    </div>

                                    <div className="slay4">
                                        <Field name="medicineId5" as="select" className="form-select"
                                               value={formData.medicineId5}
                                               onChange={(e) => setFormData({ ...formData, medicineId5: e.target.value })}
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
                                               onChange={(e) => setFormData({ ...formData, quantity5: e.target.value })}
                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData5} ><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times5"
                           value={formData.times5}
                           onChange={(e) => setFormData({ ...formData, times5: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes5"
                           value={formData.quantityPerTimes5}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes5: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>


                                {/*6*/}

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">6.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId6" as="select" className="form-select"
                                               value={formData.medicineId6}
                                               onChange={(e) => setFormData({ ...formData, medicineId6: e.target.value })}
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
                                               onChange={(e) => setFormData({ ...formData, quantity6: e.target.value })}
                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData6}><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times6"
                           value={formData.times6}
                           onChange={(e) => setFormData({ ...formData, times6: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes6"
                           value={formData.quantityPerTimes6}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes6: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>

                                {/*7*/}

                                <div className="form-group slay">
                                    <div className="slay3">
                                        <label htmlFor="applicable-object" className="form-label">7.</label>
                                    </div>
                                    <div className="slay4">
                                        <Field name="medicineId7" as="select" className="form-select"
                                               value={formData.medicineId7}
                                               onChange={(e) => setFormData({ ...formData, medicineId7: e.target.value })}
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
                                               onChange={(e) => setFormData({ ...formData, quantity7: e.target.value })}
                                        />
                                        <label className="form-label" htmlFor="quantity3"
                                               style={{marginLeft: '2px'}}>viên</label>
                                    </div>

                                    <div className="slay6">
                                        <button type="button" onClick={clearMedicineData7}><i className="bi bi-trash3-fill"></i></button>
                                    </div>

                                </div>
                                <div className="slay7">
                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="times7"
                           value={formData.times7}
                           onChange={(e) => setFormData({ ...formData, times7: e.target.value })}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           name="quantityPerTimes7"
                           value={formData.quantityPerTimes7}
                           onChange={(e) => setFormData({ ...formData, quantityPerTimes7: e.target.value })}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                </div>
                            </fieldset>

                        </Modal.Body>
                        <Modal.Footer className="bg-light">
                            <div className="group-button">
                                <div className="mb-3 d-flex justify-content-center gr1 btn1">
                                    <Button onClick={handleClearForm} className="btn btn-info custom-button">
                                        Back
                                    </Button>
                                </div>


                                <div className="mb-3 d-flex justify-content-center gr2">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Formik>
        </>
    );

}
