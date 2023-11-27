import { getToken, removeItem, setToken } from "../utils/authentication";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "../apis/auth";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import useRegisterModal from "./useRegisterModal";

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const key = "getUser";

export const useGetUser = () => {
  return useQuery([key], authApi.profile, {
    enabled: getToken() !== null,
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 1 day
    staleTime: 24 * 60 * 60 * 1000, // 60 minutes
    onError: () => {
      removeItem();
    },
  });
};

export const useAuth = () => {
  const query = useGetUser();

  return {
    isAuthenticated: getToken() !== null,
    ...query,
    data: query.data?.data?.data,
    isAdmin: false,
  };
};

export const useLogin = () => {
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const loginMutation = useMutation(
    (payload) => authApi.login(payload.email, payload.password),
    {
      onSuccess: (response) => {
        if (response?.data?.codeStatus === 200) {
          toast.success("Login successful");
          loginModal.onClose();
          queryClient.invalidateQueries("getUser");
          navigate(location.state?.from || "/");
        } else {
          const message = response?.data?.message;
          console.log(message);
          toast.error(message);
        }
      },
    }
  );

  return loginMutation;
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutateLogout = useMutation(authApi.logout, {
    onSuccess: () => {
      removeItem();
      queryClient.resetQueries();
      toast.success("Logout successful");
      navigate(location.state?.from || "/");
    },
  });

  const { mutate } = mutateLogout;

  // You can use getUserQuery.data to access user information if needed

  return mutate;
};
export const useRegister = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const registerMutation = useMutation(
    (payload) =>
      authApi.register(
        payload.email,
        payload.username,
        payload.phoneNumber,
        payload.password
      ),
    {
      onSuccess: (response) => {
        if (response?.data?.codeStatus === 200) {
          toast.success("Registration successful");
          navigate(location.state?.from || "/");
          registerModal.onClose();
          loginModal.onOpen();
        } else {
          const message = response?.data?.message;
          console.log(message);
          toast.error(message);
        }
      },
    }
  );

  return registerMutation;
};

export const useUserProps = () => {
  const queryClient = useQueryClient();
  const userPops = useMutation((payload) => authApi.userProps(payload), {
    onSuccess: (response) => {
      toast.success("Update Successfully");
      queryClient.invalidateQueries("getUser");
    },
    onError: (response) => {
      console.log(response);
      toast.error(
        response?.data?.message || "An error occurred during update."
      );
    },
  });
  return userPops;
};

export const useGetUserById = (userId) => {
  const query = useQuery(["getUserById", userId], authApi.getUserById);
  return {
      ...query,
      data: query?.data?.data?.data
  };
}

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
                  const message = response?.data?.message;
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

export const useSendOTP = () => {
  const sendOTPMutation = useMutation(
      () => authApi.sendOTP(),
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
              if (response?.data?.codeStatus === 200 && response?.data?.data === true){
                  toast.success("Successfully verified OTP");
              } else {
                  toast.error("OTP code is incorrect");
              }
          },
      }
  )
  return {
      ...verifyOTPMutation
  }
}
