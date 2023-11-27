import React, { useState } from 'react';
import { Modal, Rate, Input, Button, Spin } from 'antd';
import { useCreateReview} from '../../hooks/useReview';

const ReviewModal = ({ isVisible, onCancel, reservation, isReview }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const { mutateAsync, isLoading } = useCreateReview();
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      placeId: reservation?.placeId,
      reservationId: reservation?.reservationId,
      rating: rating,
      content: content,
    };
    await mutateAsync(data);
    onCancel();
  };

  return (
    <Modal
      title="Review your trip"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-blue-500"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isReview === 1}
        >
          Submit
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
        <div>
          <p>Please rate your experience:</p>
          <Rate value={rating} onChange={handleRatingChange} />
        </div>
        <div style={{ marginTop: '16px' }}>
          <p>Write your review:</p>
            <Input.TextArea
              value={content}
              onChange={handleContentChange}
              rows={4}
            />
        </div>
      </Spin>
    </Modal>
  );
};

export default ReviewModal;
