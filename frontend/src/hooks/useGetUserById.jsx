import { useQuery } from "@tanstack/react-query";
import authApi from "../apis/auth";

export const useGetUserById = (userId) => {
    const query = useQuery(["getUserById", userId], authApi.getUserById);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}