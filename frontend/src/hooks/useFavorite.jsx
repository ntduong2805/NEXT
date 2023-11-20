import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginMoal";
import authApi from "../apis/auth";

const useFavorite = ({ placeId, currentUser }) => {
  const loginModal = useLoginModal();

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const response = await authApi.actionFavorites(currentUser.userId, placeId)
        if (response?.data?.codeStatus == 200) {
            toast.success("Successfully updated favorites");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, placeId, loginModal]
  );

  return {
    toggleFavorite,
  };
};

export default useFavorite;
