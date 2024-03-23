import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import * as prescriptionService from "../../utils/InformationService/PrescriptionManagementService/PrescriptionService";

import * as medicineService
    from "../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService";
import * as prescriptionDetailservice
    from "../../utils/InformationService/PrescriptionManagementService/PrescriptionDetailService";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import styled from "styled-components";

const StyledModalHeader = styled(Modal.Header)`
    background-color: #449af8;
    color: white; /* Assuming you want white text on the blue background */
`;

const StyledPU = styled.div`

    .error-message {
        color: red;
        font-size: 14px;
        font-weight: bold;
    }

    a {
        text-decoration: none;
    }

    .btn1 {
        margin-left: 10px;
    }

    fieldset {
        border: 2px solid #000;
    }

    a {
        margin-left: 30px;
    }

    p {
        margin-left: 20px;
    }

    .form-group {
        display: flex;
    }

    label {
        font-size: 15px;
        margin-top: 20px;
    }

    select {
        font-size: 15px;
        margin-top: 13px;
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
        margin-top: 10px;
        margin-left: 30px;
    }

    .slay5 input {
        margin-top: 10px;
    }

    legend {
        all: revert;
        font-weight: bold;
    }

    .slay6 {
        flex: 1;
    }

    .slay7 {
        margin-top: -20px;
    }


    fieldset {
        width: 100%;
        box-sizing: border-box;
    }

    .btn {
        margin-top: 1rem;
        display: inline-block;
        border-radius: .5rem;
        color: #fff;
        cursor: pointer;
        font-weight: 500;
    }

    input, select {
        border: 1px solid;
    }

    .form-group {
        margin-bottom: 15px;
    }


    .error-message1 {
        color: red;
        font-size: 14px;
        font-weight: bold;
    }
`


export function UpdatePrescriptionComponent(props) {
    const {uid} = props;
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [errors, setErrors] = useState('');


    const clearMedicineData = () => {
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
        const newData = {...data};
        const firstDetailPrescription = newData.prescriptions?.[0]?.prescriptionDetails?.[0];

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
            prescriptionId: '',
            prescriptionName: '',
            target: 1,
            treatmentPeriod: '',
            exName: '',
            note: '',
            symptom: {
                symptomName: ''
            }
        },
        detailPrescription: [
            {medicineId: '', quantity: '', times: '', quantityPerTimes: ''},
            {medicineId2: '', quantity2: '', times2: '', quantityPerTimes2: ''},
            {medicineId3: '', quantity3: '', times3: '', quantityPerTimes3: ''},
            {medicineId4: '', quantity4: '', times4: '', quantityPerTimes4: ''},
            {medicineId5: '', quantity5: '', times5: '', quantityPerTimes5: ''},
            {medicineId6: '', quantity6: '', times6: '', quantityPerTimes6: ''},
            {medicineId7: '', quantity7: '', times7: '', quantityPerTimes7: ''}
        ]
    });


    useEffect(() => {
        fetchData();
    }, [uid]);

    const fetchData = async () => {
        try {
            const [detailPrescriptionResult, medicineResult, prescriptionResult] = await Promise.all([
                prescriptionDetailservice.findDetailPrescriptionById(uid),
                medicineService.getAllMedicine(),
                prescriptionService.findAll()
            ]);
            setData(detailPrescriptionResult);
            setMedicines(medicineResult);
            console.log(medicineResult);
            setPrescription(prescriptionResult)

        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const detailPrescription = {

                detailPrescription: [
                    {
                        times: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0],
                        quantity: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[0],
                        quantityPerTimes: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[0],
                        medicineId: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[0]
                    },
                    {
                        times2: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1],
                        quantity2: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1],
                        quantityPerTimes2: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1],
                        medicineId2: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[1]
                    },
                    {

                        times3: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[2],
                        quantity3: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[2],
                        quantityPerTimes3: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[2],
                        medicineId3: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[2]
                    },
                    {

                        times4: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[3],
                        quantity4: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[3],
                        quantityPerTimes4: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[3],
                        medicineId4: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[3]
                    },
                    {

                        times5: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[4],
                        quantity5: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[4],
                        quantityPerTimes5: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[4],
                        medicineId5: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[4]
                    },
                    {
                        times6: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[5],
                        quantity6: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[5],
                        quantityPerTimes6: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[5],
                        medicineId6: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[5]
                    },
                    {
                        times7: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[6],
                        quantity7: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[6],
                        quantityPerTimes7: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[6],
                        medicineId7: data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[6]
                    },

                ],
                prescription: {
                    prescriptionId: data.prescriptions?.[0]?.prescriptionId,
                    prescriptionName: data.prescriptions?.[0]?.prescriptionName,
                    target: data.prescriptions?.[0]?.target,
                    treatmentPeriod: data.prescriptions?.[0]?.treatmentPeriod,
                    note: data.prescriptions?.[0]?.note,
                    symptom: {
                        symptomName: data.symptomName
                    }
                }
            }

            const validationErrors = {}

            if (!data.prescriptions?.[0]?.prescriptionName?.trim()) {
                validationErrors.name = "Tên đơn thuốc không được bỏ trống!"
            }

            if (!data.symptomName?.trim()) {
                validationErrors.symptom = "Triệu chứng không được bỏ trống!"
            }

            if (!data.prescriptions?.[0]?.treatmentPeriod?.trim()) {
                validationErrors.treatmentPeriod = "Số ngày uống không được bỏ trống!";
            } else if (!Number.isInteger(Number(data.prescriptions?.[0]?.treatmentPeriod?.trim()))) {
                validationErrors.treatmentPeriod = "Số ngày uống phải là một số nguyên";
            }

            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[0]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[0]?.trim()))) {
            //         validationErrors.quantity = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }


            if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0]?.trim())) ||
                !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[0]?.trim())) ||
                !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[0]?.trim()))) {
                validationErrors.quantity = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }

            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1]?.trim())))) {
                validationErrors.quantity1 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }

            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[2]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[2]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[2]?.trim())))) {
                validationErrors.quantity2 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }

            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[3]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[3]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[3]?.trim())))) {
                validationErrors.quantity3 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }
            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[4]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[4]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[4]?.trim())))) {
                validationErrors.quantity4 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }
            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[5]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[5]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[5]?.trim())))) {
                validationErrors.quantity5 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }

            if (!Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[6]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[6]?.trim()))) || !Number.isInteger((Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[6]?.trim())))) {
                validationErrors.quantity6 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            }

            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1]?.trim() !== "" || data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1]?.trim() !== "" || data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1]?.trim()))) {
            //         validationErrors.quantity1 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }


            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[2]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[2]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[2]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[2]?.trim()))) {
            //         validationErrors.quantity2 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }
            //
            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[3]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[3]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[3]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[3]?.trim()))) {
            //         validationErrors.quantity3 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }
            //
            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[4]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[4]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[4]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[4]?.trim()))) {
            //         validationErrors.quantity4 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }
            //
            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[5]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[5]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[5]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[5]?.trim()))) {
            //         validationErrors.quantity5 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }
            //
            // if (data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[6]?.trim() !== "") {
            //     if (!Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[6]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[6]?.trim())) ||
            //         !Number.isInteger(Number(data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[6]?.trim()))) {
            //         validationErrors.quantity6 = "Số lượng thuốc, số lần uống và số viên mỗi lần phải là một số nguyên";
            //     }
            // }

            if(!data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[0]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[1]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[2]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[3]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[4]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[5]?.trim() &&
                !data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[6]?.trim()
            ){
                validationErrors.medicineId = "Hãy chọn it nhất một loại thuốc"
            }


            setErrors(validationErrors);


            if (Object.keys(validationErrors).length === 0) {

                await prescriptionDetailservice.updateDetailPrescription(uid, detailPrescription);
                await fetchData();
                props.onLoad();
                setErrors("");
                toast.success(`Sửa thông tin đơn thuốc thành công!`, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

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
                        id="editModal"
                >
                    <StyledModalHeader closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sửa Toa Thuốc
                        </Modal.Title>
                    </StyledModalHeader>
                    <Modal.Body>
                        <Formik>

                            <form onSubmit={handleUpdate}>

                                <Field type="hidden" name="prescriptionDetailId" id="id" className="form-control"/>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Tên Toa Thuốc
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.prescriptions?.[0]?.prescriptionName || ''}
                                        onChange={(e) => setData({
                                            ...data,
                                            prescriptions: [{
                                                ...data.prescriptions?.[0],
                                                prescriptionName: e.target.value
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
                                           value={data.symptomName || ''}
                                           onChange={(e) => setData({
                                               ...data,
                                               symptomName: e.target.value,
                                           })}
                                    />
                                    {errors.symptom && <span className="error-message">{errors.symptom}</span>}

                                </div>


                                <div className="mb-3">
                                    <label htmlFor="treatment_period" className="form-label">
                                        Số ngày uống
                                    </label>
                                    <input type="text" className="form-control"
                                           value={data.prescriptions?.[0]?.treatmentPeriod || ''}
                                           onChange={(e) => setData({
                                               ...data,
                                               prescriptions: [{
                                                   ...data.prescriptions?.[0],
                                                   treatmentPeriod: e.target.value
                                               }, ...data.prescriptions.slice(1)]
                                           })}
                                    />
                                    {errors.treatmentPeriod &&
                                        <span className="error-message">{errors.treatmentPeriod}</span>}

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

                                <StyledPU>
                                    <fieldset>
                                        <legend className="w-auto">
                                            Chỉ định
                                        </legend>

                                        {data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[0] ? (
                                            <>
                                                <div className="form-group slay">
                                                    <div className="slay3">
                                                        <label htmlFor="applicable-object"
                                                               className="form-label">1.</label>
                                                    </div>
                                                    <select
                                                        name="detailPrescription.[1].medicineId2"
                                                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[0] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                            medicineList[0] = e.target.value;
                                                            newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4"
                                                    >
                                                        <option value="">Chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.medicineId}
                                                                    value={medicine.medicineId}>{medicine.medicineName}</option>
                                                        ))}
                                                    </select>

                                                    <div className="slay5">
                                                        <input
                                                            style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                            id="quantity2"
                                                            type="text"
                                                            value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[0] || ''}
                                                            onChange={(e) => {
                                                                const newData = {...data};
                                                                const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                                quantity[0] = e.target.value;
                                                                newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
                                                                setData(newData);
                                                            }}
                                                        />
                                                        <label className="form-label" htmlFor="quantity3"
                                                               style={{marginLeft: '2px'}}>viên</label>
                                                    </div>

                                                    <div className="slay6">
                                                        <button type="button" className="btn btn-secondary"
                                                                onClick={clearMedicineData}><i
                                                            className="bi bi-trash3-fill"></i>
                                                        </button>
                                                    </div>

                                                </div>
                                                <div className="slay7">
                                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times.split(",");
                               quantityPerTimesArray[0] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[0] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[0] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
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
                                                        <label htmlFor="applicable-object"
                                                               className="form-label">2.</label>
                                                    </div>
                                                    <select
                                                        name="detailPrescription.[1].medicineId2"
                                                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[0] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                            medicineList[0] = e.target.value;
                                                            newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4"
                                                    >
                                                        <option value="">Chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.medicineId}
                                                                    value={medicine.medicineId}>{medicine.medicineName}</option>
                                                        ))}
                                                    </select>

                                                    <div className="slay5">
                                                        <input
                                                            style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                            id="quantity2"
                                                            disabled
                                                            type="text"
                                                            value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[0] || ''}
                                                            onChange={(e) => {
                                                                const newData = {...data};
                                                                const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                                quantity[0] = e.target.value;
                                                                newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
                                                                setData(newData);
                                                            }}
                                                        />
                                                        <label className="form-label" htmlFor="quantity3"
                                                               style={{marginLeft: '2px'}}>viên</label>
                                                    </div>

                                                    <div className="slay6">
                                                        <button type="button" className="btn btn-secondary"
                                                                onClick={clearMedicineData}><i
                                                            className="bi bi-trash3-fill"></i>
                                                        </button>
                                                    </div>

                                                </div>
                                                <div className="slay7">
                                                    <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           disabled
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[0] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptionDetails[0].detailPrescription[0].times.split(",");
                               quantityPerTimesArray[0] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
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
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[0] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[0] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />

                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                                    {errors.quantity &&
                                                        <span className="error-message">{errors.quantity}</span>}

                                                </div>

                                            </>
                                        )}


                                        {/*2*/}

                                        {data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[1] ? (
                                            <>
                                                <div className="form-group slay">
                                                    <div className="slay3">
                                                        <label htmlFor="applicable-object"
                                                               className="form-label">2.</label>
                                                    </div>
                                                    <select
                                                        name="detailPrescription.[1].medicineId2"
                                                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[1] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                            medicineList[1] = e.target.value;
                                                            newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4"
                                                    >
                                                        <option value="">Chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.medicineId}
                                                                    value={medicine.medicineId}>{medicine.medicineName}</option>
                                                        ))}
                                                    </select>

                                                    <div className="slay5">
                                                        <input
                                                            style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                            id="quantity2"
                                                            type="text"
                                                            value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1] || ''}
                                                            onChange={(e) => {
                                                                const newData = {...data};
                                                                const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                                quantity[1] = e.target.value;
                                                                newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
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
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times.split(",");
                               quantityPerTimesArray[1] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[1] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
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
                                                        <label htmlFor="applicable-object"
                                                               className="form-label">2.</label>
                                                    </div>
                                                    <select
                                                        name="detailPrescription.[1].medicineId2"
                                                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[1] || ''}
                                                        onChange={(e) => {
                                                            const newData = {...data};
                                                            const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                            medicineList[1] = e.target.value;
                                                            newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                            setData(newData);
                                                        }}
                                                        className="form-select slay4"
                                                    >
                                                        <option value="">Chọn thuốc</option>
                                                        {medicines?.map((medicine) => (
                                                            <option key={medicine.medicineId}
                                                                    value={medicine.medicineId}>{medicine.medicineName}</option>
                                                        ))}
                                                    </select>

                                                    <div className="slay5">
                                                        <input
                                                            style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                            id="quantity2"
                                                            disabled
                                                            type="text"
                                                            value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[1] || ''}
                                                            onChange={(e) => {
                                                                const newData = {...data};
                                                                const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                                quantity[1] = e.target.value;
                                                                newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
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
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[1] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptionDetails[0].detailPrescription[0].times.split(",");
                               quantityPerTimesArray[1] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
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
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[1] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[1] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
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
                                                name="prescriptionDetails.[1].medicineId3"
                                                value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[2] || ''}
                                                onChange={(e) => {
                                                    const newData = {...data};
                                                    const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                    medicineList[2] = e.target.value;
                                                    newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                    setData(newData);
                                                }}
                                                className="form-select slay4"
                                            >
                                                <option value="">Chọn thuốc</option>
                                                {medicines?.map((medicine) => (
                                                    <option key={medicine.medicineId}
                                                            value={medicine.medicineId}>{medicine.medicineName}</option>
                                                ))}
                                            </select>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity3"
                                                       type="text"
                                                       value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[2] || ''}
                                                       onChange={(e) => {
                                                           const newData = {...data};
                                                           const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                           quantity[2] = e.target.value;
                                                           newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
                                                           setData(newData);
                                                       }}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={clearMedicineData3}><i
                                                    className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[2] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times.split(",");
                               quantityPerTimesArray[2] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}

                    />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes3"
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[2] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[2] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />

                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            {errors.quantity2 &&
                                                <span className="error-message">{errors.quantity2}</span>}

                                        </div>

                                        {/*4*/}

                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">4.</label>
                                            </div>
                                            <select
                                                name="prescriptionDetails.[1].medicineId2"
                                                value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[3] || ''}
                                                onChange={(e) => {
                                                    const newData = {...data};
                                                    const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                    medicineList[3] = e.target.value;
                                                    newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                    setData(newData);
                                                }}
                                                className="form-select slay4"
                                            >
                                                <option value="">Chọn thuốc</option>
                                                {medicines?.map((medicine) => (
                                                    <option key={medicine.medicineId}
                                                            value={medicine.medicineId}>{medicine.medicineName}</option>
                                                ))}
                                            </select>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity4"
                                                       type="text"
                                                       value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[3] || ''}
                                                       onChange={(e) => {
                                                           const newData = {...data};
                                                           const quantity = newData.prescriptions[0].prescriptionDetails[0].quantity.split(",");
                                                           quantity[3] = e.target.value;
                                                           newData.prescriptions[0].prescriptionDetails[0].quantity = quantity.join(",");
                                                           setData(newData);
                                                       }}
                                                />
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={clearMedicineData4}><i
                                                    className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                     <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                            value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[3] || ''}
                            onChange={(e) => {
                                const newData = {...data};
                                const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times.split(",");
                                quantityPerTimesArray[3] = e.target.value;
                                newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                                setData(newData);
                            }}

                     />
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes"
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[3] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes.split(",");
                            quantityPerTimesArray[3] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>

                                            {errors.quantity3 &&
                                                <span className="error-message">{errors.quantity3}</span>}

                                        </div>

                                        {/*5*/}

                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">5.</label>
                                            </div>
                                            <select
                                                className="form-select slay4"
                                                value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[4] || ''}
                                                onChange={(e) => {
                                                    const newData = {...data};
                                                    const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                    medicineList[4] = e.target.value;
                                                    newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                    setData(newData);
                                                }}
                                            >
                                                <option value=" ">chọn thuốc</option>
                                                {medicines?.map((medicine) => (
                                                    <option
                                                        value={(medicine.medicineId)}>{medicine.medicineName}</option>
                                                ))}
                                            </select>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity2"
                                                       type="text"
                                                       value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[4] || ''}
                                                       onChange={(e) => {
                                                           const newData = {...data};
                                                           const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantity?.split(",");
                                                           quantityPerTimesArray[4] = e.target.value;
                                                           newData.prescriptions[0].prescriptionDetails[0].quantity = quantityPerTimesArray.join(",");
                                                           setData(newData);
                                                       }}/>
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={clearMedicineData5}><i
                                                    className="bi bi-trash3-fill"></i>
                                                </button>

                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[4] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times?.split(",");
                               quantityPerTimesArray[4] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>



                    <input
                        style={{height: '38px', width: '38px', textAlign: 'center'}}
                        type="text"
                        name="quantityPerTimes4"
                        value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[4] || ''}
                        onChange={(e) => {
                            const newData = {...data};
                            const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes?.split(",");
                            quantityPerTimesArray[4] = e.target.value;
                            newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                            setData(newData);
                        }}
                    />
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            {errors.quantity4 &&
                                                <span className="error-message">{errors.quantity4}</span>}

                                        </div>

                                        {/*6*/}

                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">6.</label>
                                            </div>
                                            <select
                                                className="form-select slay4"
                                                value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[5] || ''}
                                                onChange={(e) => {
                                                    const newData = {...data};
                                                    const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                    medicineList[5] = e.target.value;
                                                    newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                    setData(newData);
                                                }}
                                            >
                                                <option value=" ">chọn thuốc</option>
                                                {medicines?.map((medicine) => (
                                                    <option
                                                        value={(medicine.medicineId)}>{medicine.medicineName}</option>
                                                ))}
                                            </select>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity2"
                                                       type="text"
                                                       value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[5] || ''}
                                                       onChange={(e) => {
                                                           const newData = {...data};
                                                           const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantity?.split(",");
                                                           quantityPerTimesArray[5] = e.target.value;
                                                           newData.prescriptions[0].prescriptionDetails[0].quantity = quantityPerTimesArray.join(",");
                                                           setData(newData);
                                                       }}/>
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={clearMedicineData6}><i
                                                    className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[5] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times?.split(",");
                               quantityPerTimesArray[5] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}
                    />

                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>

                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[5] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes?.split(",");
                               quantityPerTimesArray[5] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}
                    />


                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            {errors.quantity5 &&
                                                <span className="error-message">{errors.quantity5}</span>}

                                        </div>


                                        {/*7*/}

                                        <div className="form-group slay">
                                            <div className="slay3">
                                                <label htmlFor="applicable-object" className="form-label">7.</label>
                                            </div>
                                            <select
                                                className="form-select slay4"
                                                value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.medicineList?.split(",")[6] || ''}
                                                onChange={(e) => {
                                                    const newData = {...data};
                                                    const medicineList = newData.prescriptions[0].prescriptionDetails[0].medicineList.split(",");
                                                    medicineList[6] = e.target.value;
                                                    newData.prescriptions[0].prescriptionDetails[0].medicineList = medicineList.join(",");
                                                    setData(newData);
                                                }}
                                            >
                                                <option value=" ">chọn thuốc</option>
                                                {medicines?.map((medicine) => (
                                                    <option
                                                        value={(medicine.medicineId)}>{medicine.medicineName}</option>
                                                ))}
                                            </select>

                                            <div className="slay5">
                                                <input style={{height: '38px', width: '38px', textAlign: 'center'}}
                                                       id="quantity2"
                                                       type="text"
                                                       value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantity?.split(",")[6] || ''}
                                                       onChange={(e) => {
                                                           const newData = {...data};
                                                           const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantity?.split(",");
                                                           quantityPerTimesArray[6] = e.target.value;
                                                           newData.prescriptions[0].prescriptionDetails[0].quantity = quantityPerTimesArray.join(",");
                                                           setData(newData);
                                                       }}/>
                                                <label className="form-label" htmlFor="quantity3"
                                                       style={{marginLeft: '2px'}}>viên</label>
                                            </div>

                                            <div className="slay6">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={clearMedicineData7}><i
                                                    className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="slay7">
                                            <p>Ngày uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.times?.split(",")[6] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].times?.split(",");
                               quantityPerTimesArray[6] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].times = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>

                    <label className="form-label" htmlFor="quantity1" style={{marginLeft: '2px'}}>lần</label>
                </span>, mỗi lần uống <span>
                    <input style={{height: '38px', width: '38px', textAlign: 'center'}} type="text"
                           value={data.prescriptions?.[0]?.prescriptionDetails?.[0]?.quantityPerTimes?.split(",")[6] || ''}
                           onChange={(e) => {
                               const newData = {...data};
                               const quantityPerTimesArray = newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes?.split(",");
                               quantityPerTimesArray[6] = e.target.value;
                               newData.prescriptions[0].prescriptionDetails[0].quantityPerTimes = quantityPerTimesArray.join(",");
                               setData(newData);
                           }}/>
                    <label className="form-label" htmlFor="quantity2" style={{marginLeft: '2px'}}>viên</label>
                </span></p>
                                            {errors.quantity6 &&
                                                <span className="error-message">{errors.quantity6}</span>}

                                        </div>
                                        <span>
                                    {errors.medicineId &&
                                        <span className="error-message1">{errors.medicineId}</span>}
                                </span>


                                    </fieldset>
                                </StyledPU>

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
