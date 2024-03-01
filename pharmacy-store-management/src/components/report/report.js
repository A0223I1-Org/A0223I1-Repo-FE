import './report.css';
import {generateReport} from "../../utils/ReportService/ReportService";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

export const Report = () => {
    const initialValues = {
        inputStartDate: '',
        inputEndDate: '',
        inputTimeStart: '00:00',
        inputTimeEnd: '23:59',
        reportType: '',
    };

    // const validationSchema = Yup.object().shape({
    //     inputStartDate: Yup.date()
    //         .required('Vui lòng nhập ngày bắt đầu')
    //         .max(new Date(), 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày hiện tại'),
    //     inputEndDate: Yup.date()
    //         .required('Vui lòng nhập ngày kết thúc')
    //         .min(Yup.ref('inputStartDate'), 'Ngày kết thúc phải lớn hơn ngày bắt đầu'),
    // });

    const onSubmit = async (values) => {
        const {inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd, reportType} = values;
        console.log(values)


        if (!reportType) {
            toast.warning('Vui lòng chọn loại báo cáo');
        } else {
            if (!["drug-enter", "medicines-expiring-soon", "debt"].includes(reportType) && (!inputStartDate || !inputEndDate)) {
                toast.warning("Vui lòng chọn thòi gian báo cáo");
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

    return (
        // validationSchema={validationSchema}
        <>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}>
                <Form>
                    <div className="container">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div>
                                    <fieldset className="border rounded-3 p-3">
                                        <legend><b>Thời gian</b></legend>
                                        <div className="form-group">
                                            <div>
                                                <label htmlFor="inputStartDate">Từ ngày</label>
                                                <Field type="date" name="inputStartDate" className="form-control"/>

                                            </div>

                                            <div>
                                                <label htmlFor="inputEndDate">Đến ngày</label>
                                                <Field type="date" className="form-control" name="inputEndDate"/>
                                            </div>
                                            <div>
                                                <label htmlFor="inputTimeStart">Từ giờ</label>
                                                <Field type="time" className="form-control" name="inputTimeStart"/>
                                            </div>
                                            <div>
                                                <label htmlFor="inputTimeEnd">Đến giờ</label>
                                                <Field type="time" className="form-control" name="inputTimeEnd"/>
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
                                                    <Field type="radio" id="revenue" name="reportType" value="revenue"/>
                                                    <label htmlFor="revenue">Báo cáo danh thu</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="profit" name="reportType" value="profit"/>
                                                    <label htmlFor="profit">Báo cáo lợi nhuận</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="debt" name="reportType" value="debt"/>
                                                    <label htmlFor="debt">Báo cáo công nợ</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="sellingDiary" name="reportType"
                                                           value="sales-diary"/>
                                                    <label htmlFor="sellingDiary">Nhật ký bán hàng</label>
                                                </div>
                                            </div>
                                            <div className="list">
                                                <h6>DANH SÁCH ,PHÂN TÍCH</h6>
                                                <div>
                                                    <Field type="radio" id="enterMore" name="reportType"
                                                           value="drug-enter"/>
                                                    <label htmlFor="enterMore">Báo cáo thuốc cần nhập thêm</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="expired" name="reportType"
                                                           value="medicines-expiring-soon"/>
                                                    <label htmlFor="expired">Báo cáo thuốc sắp hết hạn</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="selling" name="reportType"
                                                           value="top-selling-medicine"/>
                                                    <label htmlFor="selling">Báo cáo 100 thuốc bán chạy</label><br/>
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
                                            <button type="submit" className="btn btn-success">
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
                    {/*<ToastContainer />*/}

                </Form>
            </Formik>
        </>
    )
}
