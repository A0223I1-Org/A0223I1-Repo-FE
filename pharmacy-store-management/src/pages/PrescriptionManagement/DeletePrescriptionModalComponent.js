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
                <p>Are you sure you want to delete this prescription <span className="error-message">{this.props.name}</span>?</p>
            </div>
            <div className="modal-buttons">
                <button className="confirm-button" onClick={this.props.onClick}>
                    Yes, Delete
                </button>
                <button className="cancel-button" onClick={this.props.onRequestClose}>
                    Cancel
                </button>
            </div>
        </Modal>;
    }
}
export default DeletePrescriptionModalComponent;