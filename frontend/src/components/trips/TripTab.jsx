import { Spin, Button } from "antd";
import EmptyState from "../EmptyState";
import TripProcess from "./TripProcess";
import { useState } from "react";
import { useGetReservationByUser } from "../../hooks/useReservation";

const TripTab = ({ status, showReview }) => {
  const { data, isLoading, refetch } = useGetReservationByUser(status);
  const [isRefetching, setIsRefetching] = useState(false);
  const refetchData = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  return (
    <div className="px-4">
      {(isLoading || isRefetching) ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="gap-8">
          <div className="flex justify-between items-center">
            <Button onClick={refetchData} className="mr-2">
              Refresh
            </Button>
          </div>
          {data?.length > 0 ? (
            data.map((reservation) => (
              <TripProcess
                key={reservation.reservationId}
                reservation={reservation}
                showReview={showReview}
              />
            ))
          ) : (
            <EmptyState showHome />
          )}
        </div>
      )}
    </div>
  );
};

export default TripTab;
