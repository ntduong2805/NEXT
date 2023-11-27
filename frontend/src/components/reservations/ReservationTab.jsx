import React, { useState } from "react";
import { Button, Image, Table, Tag, Spin, Modal } from "antd";
import ConfirmModal from "../modals/ConfirmModal";
import { useMemo } from "react";
import { useCancelReservation, useGetReservationByOwner, useReservationStatusChange } from "../../hooks/useReservation";

const ReservationTab = ({ status, statusChange }) => {
  const { data: reservations, isLoading, refetch } = useGetReservationByOwner(status);
  const { mutateAsync } = useCancelReservation();
  const { mutateAsync: mutateAsyncConfirm } = useReservationStatusChange();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false); // State để kiểm tra xem đang refetch hay không

  const onCancel = async (reservationId) => {
    setIsCanceling(true);
    try {
      await mutateAsync(reservationId);
      setShowCancelModal(false);
      refetchData();
    } finally {
      setIsCanceling(false);
    }
  };

  const onConfirm = async (reservationId) => {
    setIsConfirming(true);
    try {
      const data = {
        reservationId,
        status: statusChange,
      };
      await mutateAsyncConfirm(data);
      refetchData();
    } finally {
      setIsConfirming(false);
    }
  };

  const refetchData = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };
  const buttonConfirm = useMemo(() => {
    if (status === 0 || status === 3 || status === 4 || status === "") {
      return "Confirm";
    } else if (status === 1) {
      return "Check-in";
    } else if (status === 2) {
      return "Check-out";
    }
  })
  const columns = [
    {
      title: "#",
      dataIndex: "url",
      render: (url) => <Image src={url} width={80} height={80} className="rounded-lg" />,
    },
    {
      title: "Place",
      dataIndex: "title",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let tagColor = "";
        let tagText = "";
        if (status === 0) {
          tagColor = "warning";
          tagText = "Pending";
        } else if (status === 1) {
          tagColor = "success";
          tagText = "Confirm";
        } else if (status === 2) {
          tagColor = "success";
          tagText = "Operational";
        } else if (status === 3) {
          tagColor = "success";
          tagText = "Completed";
        } else if (status === 4) {
          tagColor = "warning";
          tagText = "Cancelled";
        }
        return <Tag color={tagColor}>{tagText}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Dates",
      dataIndex: "nightCount",
    },
    {
      title: "Guests",
      dataIndex: "guestCount",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => onConfirm(record.reservationId)}
            className="mr-2 bg-blue-500"
            type="primary"
            disabled={status === 3 || status === 4 || status === ""} // Disable nút nếu status là 3, 4 hoặc 5
          >
            {buttonConfirm}
          </Button>
          <Button
            onClick={() => {
              setDeletingId(record.reservationId);
              setShowCancelModal(true);
            }}
            type="default"
            disabled={isCanceling || status === 3 || status === 4 || status === ""} // Disable nút nếu status là 3, 4 hoặc 5 hoặc đang trong quá trình hủy
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Button onClick={refetchData} disabled={isRefetching}>
          Refresh
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={reservations}
        rowKey="reservationId"
        loading={isLoading || isRefetching} // Sử dụng isLoading cho Spin trong Table
        indicator={isRefetching && <Spin size="large" />} // Spin trong body của bảng khi refetch
      />

      <ConfirmModal
        title={"Cancelling Reservation"}
        isVisible={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        isCanceling={isCanceling}
        onConfirm={() => onCancel(deletingId)}
        question={"Are you sure you want to cancel this reservation?"}
        button={"Cancel Reservation"}
      />
      {isConfirming ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
          <Spin size="large" className="text-blue-500" />
        </div>
      ) : null}
    </div>
  );
};

export default ReservationTab;
