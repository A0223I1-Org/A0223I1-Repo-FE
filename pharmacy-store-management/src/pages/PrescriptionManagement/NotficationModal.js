import React from "react";
import Modal from "react-modal";

class NotificationModal extends React.Component {
    render() {
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.onRequestClose}
                contentLabel="Delete Confirmation"
                className="custom-modal2"
                overlayClassName="custom-modal-overlay"
            >
                <div className="modal-content2">
                    <p>Vui lòng chọn đơn thuốc!!</p>
                </div>
                <div className="modal-buttons2">
                    <button className="cancel-button" onClick={this.props.onRequestClose}>
                        Đã hiểu
                    </button>
                </div>
            </Modal>
        );
    }
}

export default NotificationModal;
