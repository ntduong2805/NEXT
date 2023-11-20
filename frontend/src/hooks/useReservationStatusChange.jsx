import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import reservationApi from "../apis/reservation";

export const useReservationStatusChange = () => {
    const queryClient = useQueryClient();

    const reservationStatusChange = useMutation(
        (data) => reservationApi.statusChange({
            reservationId: data.reservationId,
            status: data.status
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200){
                    toast.success("Status change successful");
                    queryClient.invalidateQueries("getReservationByOwner", {
                        exact: true // Đảm bảo query cần bị tải lại hoàn toàn
                    });
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    );

    return {
        ...reservationStatusChange
    };
}
