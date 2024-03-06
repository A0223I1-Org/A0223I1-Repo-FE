// import '../SalesManagement/RetailInvoice.css';
// import { useEffect, useState } from "react";
// import { format, isValid, parse, parseISO } from "date-fns";
// import { DateTime } from 'luxon';
// import Header from '../../components/header/Header';
// import Nav from '../../components/nav/Nav';
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import * as salesManagementService from '../../utils/SaleManagementService/RetailSalesManagementService';


// export function RetailSalesManagement() {

//     return (
//         <>
//           <Header />
//         <section class="main">
//             <Nav />
//         </section>
           
//     {/* <!-- MODAL DANH SÁCH TOA THUỐC KÊ SẴN --> */}
//     <div class="modal fade" id="add" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//         aria-labelledby="staticBackdropLabel" aria-hidden="true">
//         <div class="modal-dialog modal-dialog-centered modal-lg">
//             <div class="modal-content rounded-3">
//                 <div class="modal-header bg-success text-white">
//                     <h1 class="modal-title fs-5" id="staticBackdropLabel">Danh sách toa thuốc kê sẵn</h1>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="container">
//                     <fieldset class="border p-2"
//                         style="border: 1px solid #000000; border-radius: 5px; margin-top: 5px;">
//                         <legend class="w-auto" style="font-weight: bold; ">Thông tin tìm kiếm</legend>
//                         <div class="alo-modal">
//                             <form class="form-modal" action="">
//                                 <div class="select-filter form-group">
//                                     <label style="font-weight: bold;">Tìm kiếm theo</label>
//                                     <select style="border: 1px solid; height: 40px" name="cars" id="medicals">
//                                         <option value="code">Tên toa thuốc</option>
//                                         <option value="saab">Triệu chứng</option>
//                                     </select>
//                                     <input style="border: 1px solid; height: 40px; width: 250px; margin-left: 5px"
//                                         type="search" name="" placeholder="search here..." id="search-box">
//                                     <button style="height: 40px; font-size: 15px;" type="submit"
//                                         class="btn btn-primary"><i class="bi bi-search"></i> Tìm kiếm</button>
//                                 </div>
//                             </form>

//                         </div>
//                     </fieldset>

//                     <br />
//                     <fieldset class="border p-2" style="border: 1px solid #000; border-radius: 5px;">
//                         <legend class="w-auto" style="font-weight: bold; ">Danh sách toa thuốc kê sẵn</legend>
//                         <table class="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Mã toa thuốc</th>
//                                     <th>Tên toa thuốc</th>
//                                     <th>Đối tượng</th>
//                                     <th>Triệu chứng</th>
//                                     <th>Ghi chú</th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>TT001</td>
//                                     <td>Viêm họng TE</td>
//                                     <td>Trẻ em</td>
//                                     <td>Đau họng, ho</td>
//                                     <td></td>
//                                 </tr>
//                                 <tr>
//                                     <td>TT002</td>
//                                     <td>Viêm họng TD</td>
//                                     <td>Trẻ em vừa</td>
//                                     <td>Đau họng, đau đầu</td>
//                                     <td></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </fieldset>

//                     <div class="modal-footer">
//                         <button type="button" data-bs-toggle="modal" data-bs-target="#detail" class="btn btn-secondary">
//                             <span class="me-1"><i class="bi bi-ticket-detailed"></i></span>
//                             Chi tiết đơn thuốc
//                         </button>

//                         <button type="button" class="btn btn-primary" data-bs-dismiss="modal"><span class="me-1"><i
//                                     class="bi bi-arrow-return-left"></i></span>
//                             Trở về
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     {/* <!-- MODAL CHI TIẾT DANH SÁCH TOA THUỐC KÊ SẴN --> */}
//     <div class="modal fade" id="detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//         aria-labelledby="staticBackdropLabel1" aria-hidden="true">
//         <div class="modal-dialog modal-dialog-centered modal-custom">
//             <div class="modal-content rounded-3">
//                 <div class="modal-header bg-info text-white">
//                     <h1 class="modal-title fs-5" id="staticBackdropLabel1">Thông tin toa thuốc</h1>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                     <div class="text-center">
//                         <h2>ĐƠN THUỐC</h2>
//                     </div>
//                     <form class="form-detail" action="">
//                         <fieldset class="detail-header">
//                             <div class="ten">
//                                 <label for="name1">Tên đơn thuốc:</label>
//                                 <input id="name1" type="text" value="VIÊM HỌNG TE (1-2T)" style="width: 470px;">
//                             </div>

//                             <div class="trieu-chung">
//                                 <label for="symptom1">Triệu chứng:</label>
//                                 <input id="symptom1" type="text" value="Đau họng, rát họng, ho"
//                                     style="margin-left: 24px; width: 470px;">
//                             </div>

//                             <div class="doi-tuong">
//                                 <label for="applicable-object1">Đối tượng:</label>
//                                 <select id="applicable-object1" style="margin-left: 39.8px;">
//                                     <option value=" saab">Trẻ em</option>
//                                     <option value="code">Người lớn</option>
//                                     <option value="opel">Phụ nữ mang thai</option>
//                                 </select>
//                                 <label for="date1">Số ngày uống:</label>
//                                 <input id="date1" type="number" value="0">
//                             </div>
//                         </fieldset>

//                         <br />
//                         <fieldset class="detail-body">
//                             <legend class="w-auto" style="font-weight: bold;">Chỉ định</legend>
//                             <!-- 1 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">1.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 100mg</option>
//                                         </select>
//                                         <input style="height: 35px; width: 35px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên
//                                         </label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 35px; width: 35px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 35px; width: 35px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>

//                             </div>

//                             <!-- 2 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">2.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 200mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <!-- 3 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">3.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 300mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <!-- 4 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">4.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 400mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <!-- 5 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">5.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 500mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <!-- 6 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">6.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 600mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <!-- 7 -->
//                             <div class="type-of-medicine">
//                                 <div class="group-slay">
//                                     <div class="slay3">
//                                         <label for="applicable-object" class="form-label">7.</label>
//                                         <select class="form-select">
//                                             <option value="code">ALFIGOLD 700mg</option>
//                                         </select>
//                                         <input style="height: 38px; width: 38px; text-align: center" id="quantity3"
//                                             type="text" value="2">
//                                         <label class="form-label" for="quantity3" style=" margin-left: 2px">viên</label>
//                                         <button><i class="bi bi-trash3-fill"></i></button>
//                                     </div>
//                                     <br>
//                                     <div class="slay7">
//                                         <p>Ngày uống <span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="2">
//                                                 <label class="form-label" for="quantity1"
//                                                     style=" margin-left: 2px">lần</label>
//                                             </span>, mỗi lần<span>
//                                                 <input style="height: 38px; width: 38px; text-align: center" type="text"
//                                                     value="1">
//                                                 <label class="form-label" for="quantity2"
//                                                     style=" margin-left: 2px">viên</label>
//                                             </span></p>
//                                     </div>
//                                 </div>
//                             </div>

//                         </fieldset>

//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-primary"><span class="me-1"><i
//                                         class="bi bi-check-lg"></i></span>
//                                 Thêm vào hóa đơn
//                             </button>
//                             <button type="button" data-bs-toggle="modal" data-bs-target="#detail"
//                                 class="btn btn-info"><span class="em-1"><i class="bi bi-printer"></i></span> In toa
//                             </button>
//                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
//                                 <span class="me-1"><i class="bi bi-x-circle"></i></span>
//                                 Huỷ
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>

//     {/* <!-- MODAL XÁC NHẬN XÓA --> */}
//     <div className="modal" id="delete" tabIndex="-1">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header bg-danger text-white">
//             <h5 className="modal-title">Xoá đơn thuốc</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <p>Bạn có chắc chắn muốn xoá đơn thuốc này hay không ?</p>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//               Huỷ
//             </button>
//             <button type="button" className="btn btn-danger">
//               Xoá
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//         </>
        
//     )

// }