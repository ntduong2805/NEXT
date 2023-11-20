import { useQuery } from "@tanstack/react-query";
import reservationApi from "../apis/reservation";

export const useGetReservationByPlaceId = (placeId) => {
    const query = useQuery(["getReservationByPlaceId", placeId], reservationApi.getReservationByPlaceId);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}