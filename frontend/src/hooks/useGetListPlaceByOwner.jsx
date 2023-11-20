import { useQuery } from "@tanstack/react-query"
import placeApi from "../apis/place"

export const useGetListPlaceByOwner = () => {
    const query = useQuery(["getListPlaceByOwner", status], placeApi.getListPlaceByOwner);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}