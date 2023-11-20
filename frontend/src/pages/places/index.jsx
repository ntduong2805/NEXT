import React, { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";

import { useParams } from "react-router";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import { useGetPlace } from "../../hooks/useGetPlace";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import PlaceClient from "./PlaceClient";
import { useAuth } from "../../hooks/useAuth";
const PlacePage = () => {
  const { placeId } = useParams();
  const { data, isLoading } = useGetPlace(placeId);
  const { data: currentUser } = useAuth();
  return (
    <ClientOnly>
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-20 pt-28">
          <PlaceClient place={data} currentUser={currentUser} />
        </div>
      )}
      <Footer />

    </ClientOnly>
  );
};

export default PlacePage;
