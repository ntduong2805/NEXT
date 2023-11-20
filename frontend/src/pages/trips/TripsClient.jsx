import React, { useCallback, useState } from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import PlaceCard from "../../components/places/PlaceCard";
import { useCancelReservation } from "../../hooks/useCancelReservation";

const TripsClient = ({
  reservations,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  
  const { data, isLoading, mutateAsync, isSuccess } = useCancelReservation(); // Sử dụng hook ở đây

  const onCancel = async (reservationId) => {
    setDeletingId(reservationId);
    await mutateAsync(reservationId);
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations
          .sort((a, b) =>
            new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1
          )
          .map((reservation) => (
            <PlaceCard
              key={reservation.reservationId}
              data={reservation.place}
              reservation={reservation}
              actionId={reservation.reservationId}
              onAction={onCancel}
              disabled={deletingId === reservation.reservationId}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
      </div>
    </Container>
  );
};

export default TripsClient;
