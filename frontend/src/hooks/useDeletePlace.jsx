import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import placeApi from "../apis/place";

export const useDeletePlace = () => {
    const queryClient = useQueryClient();
    const deletePlaceMutation = useMutation(
        (data) => placeApi.deletePlace({
            placeId: data
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    toast.success("Successfully deleted");
                    window.location.reload();
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
        ...deletePlaceMutation
    }
}