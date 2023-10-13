import React, { useEffect, useState } from "react";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import listingApi from "../apis/listing";
import getCurrentUser from "../actions/getCurrentUser";

export default function Home() {
  const [listings, setListings] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getCurrentUser();
        setUser(user);
    	  const response = await listingApi.getList();
        console.log(1)
    	if (response?.data?.codeStatus == 200) {
        	setListings(response?.data?.data)
		    }
    	} catch (error) {
			console.error(error);
	  	}
    }

    fetchData();
  }, []);

  if (!listings) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {listings.map((listing) => {
            return (
              <ListingCard key={listing.listingId}  data={listing} currentUser={user} />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
