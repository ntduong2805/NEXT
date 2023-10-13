import React, { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";
import reservationApi from "../apis/reservation";
import Navbar from "../components/navbars/Navbar";
import Loader from "../components/Loader";

const TripsPage = () => {
  const [reservations, setReservations] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        const response = await reservationApi.getReservationByUserId(user.id);
        if (response?.data?.codeStatus === 200) {
          setReservations(response?.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  if (reservations === null || currentUser === null) {
    // Thêm xử lý cho trạng thái đang tải dữ liệu
    return (
      <ClientOnly>
        <Loader/>
      </ClientOnly>
    );
  }

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have not reserved any trips yet"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </div>
    </ClientOnly>
  );
};

export default TripsPage;
