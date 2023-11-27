import React from "react";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import { Spin } from "antd";
import IndexPage from "../index";
import Container from "../../components/Container";
import PlaceCard from "../../components/places/PlaceCard";
import { useGetListPlace } from "../../hooks/usePlace";

export default function PlaceItem({
  currentUser
}) {
  const { data, isLoading } = useGetListPlace();

  if (!data && !isLoading) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <IndexPage>
      <ClientOnly>
        <Container>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Spin size="large" />
            </div>
          ) : (
            <div className="pt-24 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {data.map((place) => (
                <PlaceCard key={place.placeId} data={place} currentUser={currentUser} />
              ))}
            </div>
          )}
        </Container>
      </ClientOnly>
    </IndexPage>
  );
}
