import React from "react";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import PlaceCard from "../../components/places/PlaceCard";
import EmptyState from "../../components/EmptyState";
import IndexPage from "../index";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useGetListPlaceByCategory } from "../../hooks/usePlace";

export default function CategoryHome() {
  const { label } = useParams();
  const { data, isLoading } = useGetListPlaceByCategory(label);
  const { data: currentUser } = useAuth();

  return (
    <IndexPage>
      <ClientOnly>
        <Container>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Spin size="large" />
            </div>
          ) : (
            <div className="pt-24">
              {data.length === 0 ? (
                <EmptyState showHome />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                  {data.map((place) => (
                    <PlaceCard key={place.placeId} data={place} currentUser={currentUser} />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </ClientOnly>
    </IndexPage>
  );
}