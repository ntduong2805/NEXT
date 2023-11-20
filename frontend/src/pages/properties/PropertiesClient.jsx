import React, { useCallback, useState } from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import PlaceCard from "../../components/places/PlaceCard";
import { useDeletePlace } from "../../hooks/useDeletePlace";

const PropertiesClient = ({ places, currentUser }) => {
  const [deletingId, setDeletingId] = useState("");

  const { data, isLoading, mutateAsync, isSuccess } = useDeletePlace(); // Sử dụng hook ở đây

  const onDelete = async (placeId) => {
    setDeletingId(placeId);
    await mutateAsync(placeId);
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {places
          .sort((a, b) =>
            new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1
          )
          .map((place) => (
            <PlaceCard
              key={place.placeId}
              data={place}
              actionId={place.placeId}
              onAction={onDelete}
              disabled={deletingId === place.placeId}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
