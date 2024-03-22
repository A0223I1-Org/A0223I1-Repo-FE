import {get, ref} from 'firebase/database';
import React, {useEffect, useRef, useState} from "react";
import {database} from "../../configs/FirebaseConfig";
import {NavLink} from "react-router-dom";
import emailjs from '@emailjs/browser';
export const CustomerService = () =>{
    const [messages, setMessages] = useState([])
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_beaydoo', 'template_dqrk62l', form.current, {
                publicKey: '_RHR-vv6DqhOgJRnE',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    useEffect(() => {
        const messagesRef = ref(database, 'Message');
        get(messagesRef).then((snapshot)=>{
            if(snapshot.exists()){
                const messagesArray = Object.entries(snapshot.val()).map(([id,data]) =>({
                    id,
                    ...data,
                }))
                setMessages(messagesArray)
            }
            else {
                console.log('No data available')
            }
        }).catch((e) =>{
            console.error(e)
        })
    },[]);
    const closeModalReply = () => {
        const modal = document.getElementById('replyModal');
        modal.style.display = 'none'
    }


    const handleReplyButtonClick = (m) => {
        try {
            const replyModal = document.getElementById("replyModal")
            document.getElementById('customerName').value = m.Name;
            document.getElementById('to_email').value = m.Email;

            replyModal.classList.add('show');
            replyModal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };
    return(
        <>

                        <div className="col-1"></div>
                        <div className="col-10">
                            <div>
                                <fieldset className="border rounded-3 p-3">
                                    <legend><b style={{fontSize: "19px"}}>Danh sách khách hàng</b></legend>

                                    <div className="table-responsive">
                                        <table className="myTable">
                                            <thead>
                                            <tr className="row-scope">
                                                <th>Tên khách hàng</th>
                                                <th>Email</th>
                                                <th>SĐT</th>
                                                <th>Vấn đề</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                messages && messages.length > 0 ? messages.map((m) => (
                                                    <tr className="table-row" key={m.id} >
                                                        <td>{m.Name}</td>
                                                        <td>{m.Email}</td>
                                                        <td>{m.SDT}</td>
                                                        <td>{m.Message}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-secondary"
                                                                    onClick={()=>handleReplyButtonClick(m)}><i
                                                                className="bi bi-pencil-square"></i> Trả lời
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : <td style={{textAlign: "center"}} colSpan="7">Không có dữ
                                                    liệu</td>
                                            }

                                            </tbody>
                                        </table>
                                    </div>

                                </fieldset>
                            </div>
                        </div>
                        <div className="col-1"></div>
            {/* Modal reply*/}
            <div className="modal fade" tabIndex="-1" id="replyModal" aria-labelledby="replyModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="editModalLabel">Trả lời </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={closeModalReply}></button>
                        </div>
                        <div className="modal-body">
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label modal-label">Tên
                                        khách
                                        hàng</label>
                                    <input type="text" className="form-control" id="customerName"
                                           name="customerName"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="to_email" className="form-label modal-label">Tên
                                        khách
                                        hàng</label>
                                    <input type="text" className="form-control" id="to_email"
                                           name="to_email" readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label modal-label">Ghi
                                        chú</label>
                                    <textarea className="form-control" id="message"
                                              name="message" rows="3"></textarea>
                                </div>
                                    <button type="submit" className="btn btn-success" value='Send'>
                                        <i className="bi bi-plus-circle"></i> Chấp nhận
                                    </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}