import { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";

export const CustomModal = (props: any) => {
  const { content, setShow, show, txStatus } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <button className="modal-close-x" onClick={handleClose}>
          Close
        </button>

        <div className="modal-header-text">Header txt modal</div>
        <div className="modal-body">
          <div className="line"></div>
          <p className="p-5">
            Select how you want to send the email with these two options:
          </p>
          <button className="btn-light">Send every 15 minutes</button>
          <button className="btn-light">
            Send only to wallet addresses with more than 15 MATIC
          </button>

          <div className="line"></div>
        </div>
      </Modal>
    </>
  );
};
