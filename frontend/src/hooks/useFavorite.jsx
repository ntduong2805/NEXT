import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginMoal";
import authApi from "../apis/auth";

const useFavorite = ({ listingId, currentUser }) => {
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(async () => {
    if (currentUser) {
        const list =
        (await authApi.getFavorites(currentUser.id))?.data?.data || [];
        return list;
    }
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const response = await authApi.actionFavorites(currentUser.id, listingId)
        console.log(response?.data?.codeStatus)
        if (response?.data?.codeStatus == 200) {
            toast.success("Successfully updated favorites");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
