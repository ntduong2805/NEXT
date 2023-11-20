import React, { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import Navbar from "../../components/navbars/Navbar";
import LoginModal from "../../components/modals/LoginModal";
import RentModal from "../../components/modals/RentModal";
import ToasterProvider from "../../providers/ToasterProvider";
import RegisterModal from "../../components/modals/RegisterModal";

import Loading from "../../components/Loading";
import { useGetListPlaceByOwner } from "../../hooks/useGetListPlaceByOwner";
import PropertiesClient from "./PropertiesClient";
import { useAuth } from "../../hooks/useAuth";
const PropertiesPage = () => {
  const { data: currentUser } = useAuth();
  const { data: places, isLoading } = useGetListPlaceByOwner();

  if (places === null || currentUser === null) {
    return (
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <EmptyState
          title="No places found"
          subtitle="Looks like you have not reserved any trips yet"
        />
      </ClientOnly>
    );
  }

  if (!places && !isLoading) {
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
          <PropertiesClient places={places} currentUser={currentUser} />
        </div>
      )}
    </ClientOnly>
  );
};

export default PropertiesPage;
