import { useState } from "react";
import { format } from "date-fns";
import { useMemo } from "react";
import { useCancelReservation } from "../../hooks/useCancelReservation";
import { Avatar, Button } from "antd";
import ConfirmModal from "../modals/ConfirmModal";

const ReservationResult = ({ reservation }) => {
  const reservationId = reservation.reservationId;
  const nightCount = reservation.nightCount;
  const totalPrice = reservation.totalPrice;
  const title = reservation.title;
  const imageSrc = reservation.url;
  const numGuests = reservation.guestCount;
  const { mutateAsync } = useCancelReservation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (reservationId) => {
    setIsCanceling(true);
    try {
      await mutateAsync(reservationId);
      setShowCancelModal(false);
    } finally {
      setIsCanceling(false);
    }
  };
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const status = useMemo(() => {
    if (reservation.status === 0) {
      return "Pending";
    } else if (reservation.status === 1) {
      return "Confirmed";
    } else if (reservation.status === 2) {
      return "Operational";
    } else if (reservation.status === 3) {
      return "Completed";
    } else if (reservation.status === 4) {
      return "Cancelled";
    }
  });

  const isCancelDisabled = useMemo(() => {
    return [2, 3, 4].includes(reservation.status); // Kiểm tra xem status có trong danh sách [2, 3, 4] không
  }, [reservation.status]);

  return (
    <div className="rounded-lg justify-center items-center bg-blue-lightest py-4">
      <div className="bg-white w-full rounded shadow-md flex card text-grey-darkest border border-black-300">
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between p-2 border-b border-black-300">
            <div className="flex flex-col pl-3">
              <p className="text-sm font-semibold">{reservationDate}</p>
              <p className="text-sm font-semibold">
                {nightCount} nights・ {numGuests} guests
              </p>
            </div>
            <div className="flex flex-col items-end">
              <Button
                onClick={() => {
                  setDeletingId(reservationId);
                  setShowCancelModal(true);
                }}
                disabled={isCancelDisabled}
              >
                Cancel
              </Button>
              <p className="text-sm font-semibold">
                Total price: ${totalPrice}
              </p>
            </div>
          </div>
          <div className="p-2 flex flex-col md:flex-row">
            <div className="p-2">
              <img
                className="rounded-xl w-full md:w-48 h-36 object-cover"
                src={imageSrc}
                alt="Room Image"
              />
            </div>
            <div className="p-2">
              <h3 className="font-light mb-1 text-grey-darkest">{title}</h3>
              <div className="text-xs">{/* {address}, {location} */}</div>
              <span className="text-xl text-grey-darkest">
                ${reservation.price}
                <span className="text-sm"> /night</span>
              </span>

              <div className="flex items-center mt-4">
                <span className="text-md text-grey-darkest">
                  Status: {status}
                </span>
              </div>

              <div>
                Contact: {reservation.phoneNumber} - Email: {reservation.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title={"Cancelling Reservation"}
        isVisible={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        isCanceling={isCanceling}
        onConfirm={() => onCancel(deletingId)}
        question={"Are you sure you want to cancel this reservation?"}
        button={"Cancel Reservation"}
      />
    </div>
  );
};

export default ReservationResult;
