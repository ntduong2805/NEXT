import { useQuery } from "@tanstack/react-query";
import reservationApi from "../apis/reservation";

export const useGetReservationByUser = () => {
    const query = useQuery(["getReservationByUser"], reservationApi.getReservationByUser);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}