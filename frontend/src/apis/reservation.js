
import http from '../utils/http'

const reservationApi = {
    getReservationByPlaceId: async ({ queryKey }) =>
        http.post("/reservation/place", {
            placeId: queryKey[1]
        }),
    getReservationByUser: async ({ queryKey }) =>
        http.post("/reservation/user", {
            status: queryKey[1]
        }),

    getReservationByOwner: async ({ queryKey }) =>
        http.post("/reservation/owner", {
            status: queryKey[1]
        }),

    createReservation: async (reservation) =>
        http.post("/reservation/create", {
            userId: reservation.userId,
            placeId: reservation.placeId,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            nightCount: reservation.nightCount,
            guestCount: reservation.guestCount,
            totalPrice: reservation.totalPrice
        }),
    cancelReservation: async ({ reservationId }) => 
        http.post("/reservation/cancel",{
            reservationId
        }),
    statusChange: async (data) =>
        http.post("/reservation/status-change", {
            reservationId: data.reservationId,
            status: data.status
        })
    
}
export default reservationApi