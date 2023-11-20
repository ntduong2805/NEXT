import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "../apis/auth";
import toast from "react-hot-toast";


export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    const uploadAvatarMutation = useMutation(
        (data) => authApi.uploadAvatar({
            avatar: data
        }),
        {
            onSuccess: (response) => {
                
                if (response?.data?.codeStatus === 200) {
                    toast.success("Uploaded successfully");
                    queryClient.invalidateQueries("getUser");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    toast.error(message);
                }
            },
        }
    )
    return {
        ...uploadAvatarMutation
    }
}

