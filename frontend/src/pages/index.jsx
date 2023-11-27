import React from "react";
import { useAuth } from "../hooks/useAuth";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/navbars/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import RentModal from "../components/modals/RentModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
const IndexPage = ({ children }) => {
  const {data: currentUser} = useAuth();
  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} showSearch showRentModal/>
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      <div className="pb-5 pt-12 sm:pb-20 sm:pt-28">
        {children}
      </div>
    </ClientOnly>
  );
};

export default IndexPage;