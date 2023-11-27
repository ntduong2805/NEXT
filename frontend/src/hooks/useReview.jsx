import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import reviewApi from "../apis/review";
import toast from "react-hot-toast";
import { useState } from "react";

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  const createReviewMutation = useMutation(
    (payload) => reviewApi.create(payload),
    {
      onSuccess: (response) => {
        if (response?.data?.codeStatus === 200) {
          toast.success("Review successful");
          queryClient.invalidateQueries("getReviewByUserCreate")
        } else {
          const message = response?.data?.message;
          console.log(message);
          toast.error(message);
        }
      },
    }
  );

  return createReviewMutation;
};

export const useGetReviewByUserCreate = () => {
    const queryClient = useQueryClient();
    const [data, setData] = useState("")
    const getReviewByUserCreateMutation = useMutation(
        (data) => reviewApi.getReviewByUserCreate({
            data
        }),
        {
            onSuccess: (response) => {
                if (response?.data?.codeStatus === 200){
                    setData(response?.data?.data)
                    toast.success("Review created successfully");
                    queryClient.invalidateQueries("getReservationByUser", {
                        exact: true // Đảm bảo query cần bị tải lại hoàn toàn
                    });
                } else {
                    const message = response?.data?.message;
                    console.log(message);
                    toast.error(message);
                  }
            },
        }
    );
    return {
        ...getReviewByUserCreateMutation,
        data: data
    };
}

export const useGetReviewByPlace = (placeId) => {
    const query = useQuery(["getReviewByPlace", placeId], reviewApi.getReviewByPlace);
    return {
        ...query,
        data: query?.data?.data?.data
    };
}
