import './report.css';
import {generateReport} from "../../utils/ReportService/ReportService";
import * as ReportService from "../../utils/ReportService/ReportService";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

export const Report = () => {
    // const exportExcel = async () => {
    //     const startDate = document.getElementById("inputStartDate").value;
    //     const endDate = document.getElementById("inputEndDate").value;
    //     const startTime = document.getElementById("inputTimeStart").value;
    //     const endTime = document.getElementById("inputTimeEnd").value;
    //     const reportType = document.querySelector('input[name="radio"]:checked').value;
    //     try {
    //         const result = await ReportService.generateReport(reportType,startDate,endDate,startTime,endTime);
    //         console.log(result)
    //     } catch (error) {
    //         console.error("Error fetching grades:", error);
    //     }
    // }

    // return (
    //     <>
    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-1"></div>
    //                 <div className="col-10">
    //                     <div>
    //                         <fieldset className="border rounded-3 p-3">
    //                             <legend><b>Thời gian</b></legend>
    //                             <div className="form-group">
    //                                 <div>
    //                                     <label htmlFor="inputStartDate">Từ ngày</label>
    //                                     <input type="date" className="form-control" id="inputStartDate"/>
    //                                 </div>
    //                                 <div>
    //                                     <label htmlFor="inputEndDate">Đến ngày</label>
    //                                     <input type="date" className="form-control" id="inputEndDate"/>
    //                                 </div>
    //                                 <div>
    //                                     <label htmlFor="inputTimeStart">Từ giờ</label>
    //                                     <input type="time" className="form-control" id="inputTimeStart" value="00:00"/>
    //                                 </div>
    //                                 <div>
    //                                     <label htmlFor="inputTimeEnd">Đến giờ</label>
    //                                     <input type="time" className="form-control" id="inputTimeEnd" value="23:59"/>
    //                                 </div>
    //                             </div>
    //                         </fieldset>
    //                     </div>
    //                     <div>
    //                         <fieldset className="border rounded-3 p-3">
    //                             <legend><b>Hệ thống báo cáo</b></legend>
    //                             <div className="report">
    //                                 <div className="debt">
    //                                     <h6>THU CHI - CÔNG NỢ</h6>
    //                                     <input id="revenue" type="radio" name="radio"/>
    //                                         <label htmlFor="revenue">Báo cáo danh thu</label><br/>
    //                                         <input id="profit" type="radio" name="radio"/>
    //                                             <label htmlFor="profit">Báo cáo lợi nhuận</label><br/>
    //                                             <input id="debt" type="radio" name="radio"/>
    //                                                 <label htmlFor="debt">Báo cáo công nợ</label><br/>
    //                                                 <input id="sellingDiary" type="radio" name="radio"/>
    //                                                     <label htmlFor="sellingDiary">Nhật ký bán hàng</label>
    //                                 </div>
    //                                 <div className="list">
    //                                     <h6>DANH SÁCH ,PHÂN TÍCH</h6>
    //                                     <input id="enterMore" type="radio" name="radio"/>
    //                                         <label htmlFor="enterMore">Báo cáo thuốc cần nhập thêm</label><br/>
    //                                         <input id="expired" type="radio" name="radio"/>
    //                                             <label htmlFor="expired">Báo cáo thuốc sắp hết hạn</label><br/>
    //                                             <input id="selling" type="radio" name="radio"/>
    //                                                 <label htmlFor="selling">Báo cáo 100 thuốc bán chạy</label><br/>
    //                                 </div>
    //                             </div>
    //
    //                         </fieldset>
    //                     </div>
    //                     <div>
    //                         <div className="action">
    //                             <div className="chart">
    //                                 <button type="button" className="btn btn-warning"><i
    //                                     className="bi bi-bar-chart"></i> Biểu đồ thống kê
    //                                 </button>
    //                             </div>
    //                             <div>
    //                                 <button type="button" className="btn btn-success" onClick={exportExcel}>
    //                                     <i className="bi bi-plus-circle"></i> Xuất excel
    //                                 </button>
    //                             </div>
    //                             <div>
    //                                 <button type="button" className="btn btn-primary"><i
    //                                     className="bi bi-arrow-return-left"></i> Trở về
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="col-1"></div>
    //             </div>
    //         </div>
    //     </>

    const initialValues = {
        inputStartDate: '',
        inputEndDate: '',
        inputTimeStart: '00:00',
        inputTimeEnd: '23:59',
        reportType: '',
    };

    // const validationSchema = Yup.object().shape({
    //     inputStartDate: Yup.string().required('Từ ngày không được bỏ trống'),
    //     inputEndDate: Yup.string().required('Đến ngày không được bỏ trống'),
    //     inputTimeStart: Yup.string().required('Từ giờ không được bỏ trống'),
    //     inputTimeEnd: Yup.string().required('Đến giờ không được bỏ trống'),
    //     reportType: Yup.string().required('Hệ thống báo cáo không được bỏ trống'),
    // });

    const onSubmit = async (values) => {
        const {inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd, reportType} = values;
        console.log(values)
        try {

            const result = await generateReport(reportType, inputStartDate, inputEndDate, inputTimeStart, inputTimeEnd);
            console.log(result);
        } catch (error) {
            console.error("Error fetching grades:", error);
        }

        // setSubmitting(false);
    };

    return (
        // validationSchema={validationSchema}
        <Formik initialValues={initialValues}  onSubmit={onSubmit}>
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
                                                <Field type="time" className="form-control" name="inputTimeStart"
                                                       value="00:00"/>
                                            </div>
                                            <div>
                                                <label htmlFor="inputTimeEnd">Đến giờ</label>
                                                <Field type="time" className="form-control" name="inputTimeEnd"
                                                       value="23:59"/>
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
                                                    <Field type="radio" id="revenue" name="reportType" value="revenue" />
                                                    <label htmlFor="revenue">Báo cáo danh thu</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="profit" name="reportType" value="profit" />
                                                    <label htmlFor="profit">Báo cáo lợi nhuận</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="debt" name="reportType" value="debt" />
                                                    <label htmlFor="debt">Báo cáo công nợ</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="sellingDiary" name="reportType" value="sellingDiary" />
                                                    <label htmlFor="sellingDiary">Nhật ký bán hàng</label>
                                                </div>
                                            </div>
                                            <div className="list">
                                                <h6>DANH SÁCH ,PHÂN TÍCH</h6>
                                                <div>
                                                    <Field type="radio" id="enterMore" name="reportType" value="enterMore" />
                                                    <label htmlFor="enterMore">Báo cáo thuốc cần nhập thêm</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="expired" name="reportType" value="expired" />
                                                    <label htmlFor="expired">Báo cáo thuốc sắp hết hạn</label><br/>
                                                </div>
                                                <div>
                                                    <Field type="radio" id="selling" name="reportType" value="selling" />
                                                    <label htmlFor="selling">Báo cáo 100 thuốc bán chạy</label><br/>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div>
                                    <div className="action">
                                        <div className="chart">
                                            <button type="button" className="btn btn-warning"><i
                                                className="bi bi-bar-chart"></i> Biểu đồ thống kê
                                            </button>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-success" >
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
                </Form>
        </Formik>
    )
}
