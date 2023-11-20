import React, { useState } from "react";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import PlaceCard from "../../components/places/PlaceCard";
import { useGetListPlace } from "../../hooks/useGetListPlace";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";

export default function PlaceItem({
  currentUser
}) {
  const { data, isLoading } = useGetListPlace();

  if (!data && !isLoading) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        {
          isLoading ? <Loading /> : <div className="pt-24 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data.map((place) => {
            return (
              <PlaceCard key={place.placeId}  data={place} currentUser={currentUser}/>
            );
          })}
        </div>
        }
      </Container>
    </ClientOnly>
  );
}
