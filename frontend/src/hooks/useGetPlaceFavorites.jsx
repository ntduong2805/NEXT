import { useQuery } from "@tanstack/react-query"
import placeApi from "../apis/place"

export const useGetPlaceFavorites = () => {
    const query = useQuery(["getPlaceFavorites"], placeApi.getListPlaceFavorites);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}