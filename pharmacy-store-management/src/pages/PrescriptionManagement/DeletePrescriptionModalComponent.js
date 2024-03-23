import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";


const StylePD = styled.p`
    .error-message{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
`

const StyledModalHeader = styled(Modal.Header)`
    background-color: #f44336;
    color: white;
`

class DeletePrescriptionModalComponent extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.open}
                onHide={this.props.onRequestClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <StyledModalHeader closeButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        Xoá Toa Thuốc
                    </Modal.Title>

                </StyledModalHeader>
                <Modal.Body>
                    <StylePD>
                        <p>Bạn có muốn xoá đơn thuốc <span className="error-message">{this.props.name}</span> không?
                        </p>
                    </StylePD>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onClick}>Có, Xoá đi</Button>
                    <Button variant="secondary" onClick={this.props.onRequestClose}>Huỷ</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeletePrescriptionModalComponent;
