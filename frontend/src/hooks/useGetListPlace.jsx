import { useQuery } from "@tanstack/react-query"
import placeApi from "../apis/place"

export const useGetListPlace = () => {
    const query = useQuery(["getListPlace"], placeApi.getListPlace);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}