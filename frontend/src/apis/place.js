import http from '../utils/http'

const placeApi = {
    addPlace: async (placeData) => 
        http.post("/place/create", {
            title: placeData.title,
            address: placeData.address,
            addedImages: placeData.addedImages,
            description: placeData.description,
            pecks: placeData.pecks,
            extraInfo: placeData.extraInfo,
            checkIn: placeData.checkIn,
            checkOut: placeData.checkOut,
            maxGuest: placeData.maxGuest,
            price: placeData.price
            
        })
}
export default placeApi