import React, { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import ReservationsClient from "./ReservationClient";
import { useAuth } from "../../hooks/useAuth";
const ReservationsPage = () => {
  const {data: currentUser } = useAuth();

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
        <div className="pb-20 pt-28">
          <ReservationsClient
            currentUser={currentUser}
          />
        </div>
    </ClientOnly>
  );
};

export default ReservationsPage;
