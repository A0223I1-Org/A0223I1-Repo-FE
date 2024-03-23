import React from "react";
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";

const StyledModal = styled.div`


    .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        max-width: 600px;
    }

    .modal-content p {
        text-align: center;
    }
    p{
        font-weight: bold;
    }


`
const StyleNB = styled.div`
    .cancel-button {
        background-color: #f44336;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 55px;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
    }

    .cancel-button:hover {
        background-color: #d32f2f;
    }

    .cancel-button:focus {
        outline: none;
    }
`

class NotificationModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.open}
                onHide={this.props.onRequestClose}
                centered
            >
                <Modal.Body>
                    <StyledModal>
                        <div className='modal-content'>
                            <p>Vui lòng chọn đơn thuốc!!</p>
                        </div>
                    </StyledModal>
                </Modal.Body>

                <StyleNB>
                    <div className='modal-footer'>
                        <button className="cancel-button" onClick={this.props.onRequestClose}>
                            Đã hiểu!!
                        </button>
                    </div>

                </StyleNB>
            </Modal>
        );
    }
}

export default NotificationModal;
