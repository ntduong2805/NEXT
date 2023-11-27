import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import reservationApi from "../apis/reservation";
import { useNavigate } from "react-router-dom";

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
                    const message = response?.data?.message;
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

export const useCreateReservation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const createReservationMutation = useMutation(
        (data) => reservationApi.createReservation({
            ...data,
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    toast.success("Successful booking");
                    queryClient.invalidateQueries("getReservationByUser");
                    navigate("/trips")
                } else {
                    const message = response?.data?.message;
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

export const useGetReservationByOwner = (status) => {
    const query = useQuery(["getReservationByOwner", status], reservationApi.getReservationByOwner);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

export const useGetReservationByPlaceId = (placeId) => {
    const query = useQuery(["getReservationByPlaceId", placeId], reservationApi.getReservationByPlaceId);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

export const useGetReservationByUser = (status) => {
    const query = useQuery(["getReservationByUser", status], reservationApi.getReservationByUser);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

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
                    const message = response?.data?.message;
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
