import { useQuery } from "@tanstack/react-query";
import reservationApi from "../apis/reservation";

export const useGetReservationByOwner = (status) => {
    const query = useQuery(["getReservationByOwner", status], reservationApi.getReservationByOwner);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}