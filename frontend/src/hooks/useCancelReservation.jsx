import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import reservationApi from "../apis/reservation";

export const useCancelReservation = () => {
    const queryClient = useQueryClient();
    const cancelReservationMutation = useMutation(
        (data) => reservationApi.cancelReservation({
            reservationId: data
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    toast.success("Successfully canceled");
                    queryClient.invalidateQueries("getReservationByUserId");
                    queryClient.invalidateQueries("getReservationByUserOwner");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    )
    return {
        ...cancelReservationMutation
    }
}