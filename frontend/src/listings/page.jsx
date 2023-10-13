import React, { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ListingClient from "./ListingClient";
import listingApi from "../apis/listing";
import { useParams } from 'react-router';
import Navbar from "../components/navbars/Navbar";
import LoginModal from "../components/modals/LoginModal";

const ListingPage = () => {
  const { listingId } = useParams(); 
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedListing = await listingApi.getListing(listingId);
      const fetchedUser = await getCurrentUser();
      setListing(fetchedListing?.data.data);
      setUser(fetchedUser);
    };

    fetchData();
  }, [listingId]);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
      <ClientOnly>
        <LoginModal/>
        <Navbar currentUser={user} />
        <div className="pb-20 pt-28">
          <ListingClient
            listing={listing}
            currentUser={user}
          />
        </div>
    </ClientOnly>
  );
};

export default ListingPage;
