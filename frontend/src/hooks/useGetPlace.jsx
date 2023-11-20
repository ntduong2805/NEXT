import { useQuery } from "@tanstack/react-query";
import placeApi from "../apis/place";

export const useGetPlace = (placeId) => {
    const query = useQuery(["getPlace", placeId], placeApi.getPlace);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}
