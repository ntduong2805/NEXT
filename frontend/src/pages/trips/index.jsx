import React from "react";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import TripsClient from "./TripsClient";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import { useAuth } from "../../hooks/useAuth";
const TripsPage = () => {
  const { data: currentUser } = useAuth();

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
        <div className="pb-20 pt-28 px-20">
          <TripsClient />
        </div>
    </ClientOnly>
  );
};

export default TripsPage;
