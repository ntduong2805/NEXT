import http from "../utils/http";

const reviewApi = {
  create: async (data) =>
    http.post("/review/create", {
      placeId: data.placeId,
      reservationId: data.reservationId,
      rating: data.rating,
      content: data.content
    }),
  getReviewByUserCreate: async (data) =>
    http.post("/review/get-review-by-user-create", {
      placeId: data.placeId,
      reservationId: data.reservationId,
    }),
  getReviewByPlace: async ({queryKey}) => 
    http.post("/review/get-reviews-by-place", {
        placeId: queryKey[1]
    })
}

export default reviewApi;
