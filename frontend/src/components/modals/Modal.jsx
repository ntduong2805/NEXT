import React from 'react';
import { Modal, Button } from 'antd';

function CustomModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  isLoading, // Thêm isLoading vào danh sách tham số
}) {
  return (
    <Modal
      open={isOpen} // Sửa lại thành visible
      onCancel={onClose}
      onOk={onSubmit}
      title={title || 'Modal Title'}
      footer={null}
    >
      <div>{body}</div>
      <div className="flex flex-col gap-2 pt-2">
        {secondaryAction && secondaryActionLabel && (
          <Button
            type="default"
            onClick={secondaryAction}
            disabled={isLoading} // Vô hiệu hóa khi isLoading là true
          >
            {secondaryActionLabel}
          </Button>
        )}
        <Button
          className='bg-blue-500'
          type="primary"
          onClick={onSubmit}
          disabled={isLoading} // Vô hiệu hóa khi isLoading là true
        >
          {actionLabel || 'Submit'}
        </Button>
      </div>
      {footer}
    </Modal>
  );
}

export default CustomModal;
