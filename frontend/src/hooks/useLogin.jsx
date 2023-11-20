import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogin = () => {
    const queryClient = useQueryClient();

    const login = useMutation(
        (data) => authApi.login({
            email: data.email,
            password: data.password
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200) {
                    queryClient.invalidateQueries("getReservationByUser");
                    toast.success("Login successful");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    );

    return {
        ...login
    };
}