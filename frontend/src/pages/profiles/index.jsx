import React, { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import ProfileClient from "./ProfileClient";
import { useAuth } from "../../hooks/useAuth";
const ProfilePage = ({ children }) => {
  const {data: currentUser} = useAuth();
  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
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

export default ProfilePage;
