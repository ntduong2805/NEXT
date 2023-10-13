
import http from '../utils/http'

const reservationApi = {
    getReservationByListingId: async (data) =>
        http.post("/reservation/listing", {
            listingId: data
        }),
    getReservationByUserId: async (data) =>
        http.post("/reservation/user", {
            userId: data
        }),
    reservation: async (reservation) =>
        http.post("/reservation/create", {
            userId: reservation.userId,
            listingId: reservation.listingId,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice: reservation.totalPrice
        })
    
}
export default reservationApi