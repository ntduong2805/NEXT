import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "../apis/auth";
import toast from "react-hot-toast";


export const useSendOTP = () => {
    const sendOTPMutation = useMutation(
        () => authApi.sendOTP(),
        {
            onSuccess: (response) => {
                toast.success("OTP send successfully");
            },
            onError: (error) => {
                toast.error("OTP send failed");
            }
        }
    )
    return {
        ...sendOTPMutation
    }
}

export const useVerifyOTP = () => {
    const verifyOTPMutation = useMutation(
        (data) => authApi.verifyOTP({
            otpCode: data
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200){
                    toast.success("Successfully ");
                } else {
                    const { message } = response.data;
                    console.log(message);
                    
                }
            },
        }
    )
    return {
        ...verifyOTPMutation
    }
}