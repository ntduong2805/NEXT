
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

export const useGetUser = () => {
  const token = getToken();

  return useQuery(["getUser"], authApi.profile, {
    enabled: token !== null && parseJwt(token)?.exp * 1000 > Date.now(),
    cacheTime: token ? 24 * 60 * 60 * 1000 : 0,
    staleTime: 60 * 60 * 1000, // 60 phút
    onError: () => {
      removeItem();
    },
  });
};

export const useAuth = () => {
  const navigate = useNavigate();
  const token = getToken();

  if (token === null) {
    // Token không tồn tại
    return {
      isAuthenticated: false,
      data: null,
      isAdmin: false,
    };
  }

  const decodedJwt = parseJwt(token);

  if (decodedJwt?.exp * 1000 < Date.now()) {
    // Token hết hạn
    removeItem();
    navigate("/");
    return {
      isAuthenticated: false,
      data: null,
      isAdmin: false,
    };
  }

  const query = useGetUser();

  return {
    isAuthenticated: true,
    ...query,
    data: query.data?.data?.data,
    isAdmin: query.data?.data?.data?.role === "admin",
  };
};


export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginMutation = useMutation(
    (payload) => authApi.login(payload.email, payload.password),
    {
      onSuccess: (response) => {
        setToken(response.data.data.token);
        navigate(location.state?.from || "/");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
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
      navigate("/");
    },
  });
  const { mutate } = mutateLogout;
  return mutate;
};
export const useRegister = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const registerMutation = useMutation(
    (payload) => authApi.register(payload),
    {
      onSuccess: (response) => {
        toast.success("Registration successful");
        registerModal.onClose()
        loginModal.onOpen();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "An error occurred during registration.");
      },
    }
  );

  return registerMutation;
};
