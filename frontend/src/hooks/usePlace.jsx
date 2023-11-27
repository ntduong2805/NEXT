import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
                    const message = response?.data?.message;
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
                    navigator(0);
                    queryClient.invalidateQueries("getListPlace");
                } else {
                    const message = response?.data?.message;
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

export const useGetListPlace = () => {
    const query = useQuery(["getListPlace"], placeApi.getListPlace);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

export const useGetListPlaceByCategory = (category) => {
    const query = useQuery(["getListPlaceByCategory", category], placeApi.getPlaceByCategory);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}


export const useGetListPlaceByOwner = () => {
    const query = useQuery(["getListPlaceByOwner"], placeApi.getListPlaceByOwner);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

export const useGetPlace = (placeId) => {
    const query = useQuery(["getPlace", placeId], placeApi.getPlace);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}

export const useGetPlaceFavorites = () => {
    const query = useQuery(["getPlaceFavorites"], placeApi.getListPlaceFavorites);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}