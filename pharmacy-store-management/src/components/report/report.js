import './report.css';
import {generateReport} from "../../utils/ReportService/ReportService";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import * as Yup from "yup";

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {useRef, useState} from "react";

export const Report = () => {

    const [isTimeRequired, setTimeRequired] = useState(true);
    const initialValues = {
        inputStartDate: '',
        inputEndDate: '',
        inputTimeStart: '',
        inputTimeEnd: '',
        reportType: '',
    };
    // const formikRef = useRef();
    const formikRef = useRef(null);

    const [validateFlag, setValidateFlag] = useState(true);


    const onSubmit = async (values) => {
        const {inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd, reportType} = values;
        if (!reportType) {
            toast.warning('Vui lòng chọn loại báo cáo');
        } else {
            if (!["drug-enter", "medicines-expiring-soon"].includes(reportType) && (!inputStartDate || !inputEndDate || !inputTimeStart || !inputTimeEnd)) {
                toast.warning("Vui lòng chọn thời gian báo cáo");
            } else {
                try {
                    const result = await generateReport(reportType, inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd);
                    console.log(result);
                } catch (error) {
                    console.error("Error fetching grades:", error);
                }
            }
        }
    };

    const isTimeValid = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    };

    let validationSchema;

    const currentDate = new Date();


    if (validateFlag) {
        validationSchema = Yup.object().shape({
            inputStartDate: Yup.date()
                .nullable()
                .required('Vui lòng nhập ngày bắt đầu.')
                .test('is-date', 'Không nhập quá ngày hiện tại.', function (value) {
                    if (value instanceof Date || value === null) {
                        return value <= currentDate || this.createError({message: 'Không nhập quá ngày hiện tại.'});
                    }
                    return true;
                }),

            inputEndDate: Yup.date()
                .required('Vui lòng nhập ngày kết thúc.')
                .test('is-valid-end-date', 'Ngày kết thúc phải sau ngày bắt đầu.', function (value) {
                    const {inputStartDate} = this.parent;
                    if (inputStartDate) {
                        return value && new Date(value) >= new Date(inputStartDate);
                    }
                    return true;
                })
                .test('is-valid-end-date-2', 'Không nhập quá ngày hiện tại.', function (value) {
                    return value && value <= currentDate;
                }),
            inputTimeStart: Yup.string().nullable().required('Vui lòng nhập thời gian bắt đầu.').test(
                'is-valid-start-time',
                'Thời gian bắt đầu không hợp lệ.',
                function (value) {
                    return isTimeValid(value);
                }
            ),
            inputTimeEnd: Yup.string().nullable().test(
                'is-valid-end-time',
                'Thời gian kết thúc sau thời gian bắt đầu.',
                function (value) {
                    const {inputTimeStart} = this.parent;
                    if (inputTimeStart) {
                        return isTimeValid(value) && new Date(`2000-01-01T${value}`) >= new Date(`2000-01-01T${inputTimeStart}`);
                    }
                    return true;
                }
            ).required('Vui lòng nhập thời gian kết thúc.'),
        });
    } else {
        validationSchema = Yup.object();
    }

    return (
        <>
            <Formik innerRef={formikRef} initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {formikProps => {
                    function setDefaultDateTime() {
                        formikProps.setErrors({});
                        formikRef.current.resetForm();

                        if (formikRef.current.values.inputStartDate || formikRef.current.values.inputEndDate ||
                            formikRef.current.values.inputTimeStart || formikRef.current.values.inputTimeEnd) {
                            // formikRef.current.resetForm();
                            toast.warning("Báo cáo này không cần cột thời gian");
                        }

                        setValidateFlag(false);
                    }

                    return (
                        <Form>
                            <div className="LoiTH-report">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <div>
                                                <fieldset className="border rounded-3 p-3">
                                                    <legend><b>Thời gian</b></legend>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <div className="form-group">
                                                                <label htmlFor="inputStartDate">Từ ngày</label>
                                                                <Field
                                                                    type="date"
                                                                    id="inputStartDate"
                                                                    name="inputStartDate"
                                                                    className="form-control"
                                                                    disabled={!isTimeRequired}
                                                                />
                                                                <ErrorMessage
                                                                    name="inputStartDate"
                                                                    component="div"
                                                                    className="yup-error-message"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="form-group">
                                                                <label htmlFor="inputEndDate">Đến ngày</label>
                                                                <Field
                                                                    type="date"
                                                                    id="inputEndDate"
                                                                    className="form-control"
                                                                    name="inputEndDate"
                                                                    disabled={!formikProps.values.inputStartDate}
                                                                />
                                                                <ErrorMessage
                                                                    name="inputEndDate"
                                                                    component="div"
                                                                    className="yup-error-message"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="form-group">
                                                                <label htmlFor="inputTimeStart">Từ giờ</label>
                                                                <Field
                                                                    type="time"
                                                                    id="inputTimeStart"
                                                                    className="form-control"
                                                                    name="inputTimeStart"
                                                                    disabled={!isTimeRequired}
                                                                />
                                                                <ErrorMessage
                                                                    name="inputTimeStart"
                                                                    component="div"
                                                                    className="yup-error-message"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="form-group">
                                                                <label htmlFor="inputTimeEnd">Đến giờ</label>
                                                                <Field
                                                                    type="time"
                                                                    id="inputTimeEnd"
                                                                    className="form-control"
                                                                    name="inputTimeEnd"
                                                                    disabled={!formikProps.values.inputTimeStart}
                                                                />
                                                                <ErrorMessage
                                                                    name="inputTimeEnd"
                                                                    component="div"
                                                                    className="yup-error-message"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div>
                                                <fieldset className="border rounded-3 p-3">
                                                    <legend><b>Hệ thống báo cáo</b></legend>
                                                    <div className="report">
                                                        <div className="debt">
                                                            <h6>THU CHI - CÔNG NỢ</h6>
                                                            <div>
                                                                <Field type="radio" id="revenue" name="reportType"
                                                                       value="revenue" onClick={() => {
                                                                    setTimeRequired(true);
                                                                    setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="revenue">Báo cáo danh thu</label><br/>
                                                            </div>
                                                            <div>
                                                                <Field type="radio" id="profit" name="reportType"
                                                                       value="profit" onClick={() => {
                                                                    setTimeRequired(true);
                                                                    setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="profit">Báo cáo lợi nhuận</label><br/>
                                                            </div>
                                                            <div>
                                                                <Field type="radio" id="debt" name="reportType"
                                                                       value="debt" onClick={() => {
                                                                    setTimeRequired(true);
                                                                    setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="debt">Báo cáo công nợ</label><br/>
                                                            </div>
                                                            <div>
                                                                <Field type="radio" id="sellingDiary" name="reportType"
                                                                       value="sales-diary" onClick={() => {
                                                                    setTimeRequired(true);
                                                                    setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="sellingDiary">Nhật ký bán hàng</label>
                                                            </div>
                                                        </div>
                                                        <div className="list">
                                                            <h6>DANH SÁCH ,PHÂN TÍCH</h6>
                                                            <div>
                                                                <Field type="radio" id="enterMore" name="reportType"
                                                                       value="drug-enter" onClick={() => {
                                                                    setDefaultDateTime();
                                                                    setTimeRequired(false);
                                                                    // setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="enterMore">Báo cáo thuốc cần nhập
                                                                    thêm</label><br/>
                                                            </div>
                                                            <div>
                                                                <Field type="radio" id="expired" name="reportType"
                                                                       value="medicines-expiring-soon" onClick={() => {
                                                                    setDefaultDateTime();
                                                                    setTimeRequired(false);
                                                                }}/>
                                                                <label htmlFor="expired"> Báo cáo thuốc sắp hết
                                                                    hạn</label><br/>
                                                            </div>
                                                            <div>
                                                                <Field type="radio" id="selling" name="reportType"
                                                                       value="top-selling-medicine" onClick={() => {
                                                                    setTimeRequired(true);
                                                                    // setTimeRequired(false);
                                                                    setValidateFlag(true);
                                                                }}/>
                                                                <label htmlFor="selling">Báo cáo 100 thuốc bán
                                                                    chạy</label><br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div>
                                                <div className="action">
                                                    <div className="chart">
                                                        <Link to="/chart">
                                                            <button type="button" className="btn btn-warning"><i
                                                                className="bi bi-bar-chart"></i> Biểu đồ thống kê
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <button type="submit" className="btn btn-success"
                                                                disabled={!formikProps.values.reportType}>
                                                            <i className="bi bi-plus-circle"></i> Xuất excel
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn btn-primary"><i
                                                            className="bi bi-arrow-return-left"></i> Trở về
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}
