import React from "react";
import Modal from "react-modal";

class DeletePrescriptionModalComponent extends React.Component {
    render() {
        return <Modal
            isOpen={this.props.open}
            onRequestClose={this.props.onRequestClose}
            contentLabel="Delete Confirmation"
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
        >
            <div className="modal-content">
                <p>Bạn có muốn xoá đơn thuốc <span className="error-message1">{this.props.name}</span> không?</p>
            </div>
            <div className="modal-buttons">
                <button className="confirm-button" onClick={this.props.onClick}>
                    Có, Xoá đi
                </button>

                <div style={{ marginRight: '10px' }}></div>

                <button className="cancel-button" onClick={this.props.onRequestClose}>
                    Huỷ
                </button>
            </div>

        </Modal>;
    }
}

export default DeletePrescriptionModalComponent;