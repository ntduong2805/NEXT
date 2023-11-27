import React from "react";
import { Button, Modal, Spin } from "antd";

function ConfirmModal({title, isVisible, onCancel, isCanceling, onConfirm, question, button }) {

  const footerContent = (
    <>
    <Button onClick={onCancel} type="primary" className="bg-blue-500" disabled={isCanceling}>
        Close
    </Button>

    <Button onClick={onConfirm} type="default" disabled={isCanceling}>
        {button}
    </Button>
    </>
  );
  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={onCancel}
      footer={footerContent}
    >
      {isCanceling ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <p>{question}</p>
          
        </div>
      )}
    </Modal>
  );
}

export default ConfirmModal;
