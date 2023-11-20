import { useMutation, useQueryClient } from "@tanstack/react-query"
import placeApi from "../apis/place"
import toast from "react-hot-toast";

export const useCreatePlace = () => {
    const queryClient = useQueryClient();
    const createPlaceMutation = useMutation(
        (data) => placeApi.createPlace({
            ...data,
            location: data.location.value
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    toast.success("Successfully created");
                    queryClient.invalidateQueries("getListPlace");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    )
    return {
        ...createPlaceMutation
    }
}