import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbars/Navbar";
import ClientOnly from "../../components/ClientOnly";
import RegisterModal from "../../components/modals/RegisterModal";
import ToasterProvider from "../../providers/ToasterProvider";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import PlaceItem from "./Home";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";



export const metadata = {
  title: "Next",
  description: "Next LV",
};

function HomePage() {
  const {data: currentUser } = useAuth();
  
  return (
    <div>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
      </ClientOnly>
      <div className="pb-20 pt-28">
        <PlaceItem currentUser={currentUser}/>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
