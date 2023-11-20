import React from "react";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import TripsClient from "./TripsClient";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import Loading from "../../components/Loading";
import { useGetReservationByUser } from "../../hooks/useGetReservationByUser";
import { useAuth } from "../../hooks/useAuth";
const TripsPage = () => {
  const { data: currentUser } = useAuth();
  const { data: reservations, isLoading } = useGetReservationByUser();

  if (reservations === null || currentUser === null) {
    return (
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have not reserved any trips yet"
        />
      </ClientOnly>
    );
  }

  if (!reservations && !isLoading) {
    return (
      <ClientOnly>
        <Navbar currentUser={currentUser} />
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
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
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-20 pt-28">
          <TripsClient reservations={reservations} currentUser={currentUser} />
        </div>
      )}
    </ClientOnly>
  );
};

export default TripsPage;
