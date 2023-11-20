import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import reservationApi from "../apis/reservation";

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    const createReservationMutation = useMutation(
        (data) => reservationApi.createReservation({
            ...data,
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    toast.success("Successfully created");
                    queryClient.invalidateQueries("getReservationByUser");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    )
    return {
        ...createReservationMutation
    }
}