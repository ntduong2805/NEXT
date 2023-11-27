import http from '../utils/http'

const placeApi = {
    createPlace: async (data) => 
        http.post("/place/create", {
            title: data.title,
            address: data.address,
            description: data.description,
            price: data.price,
            category: data.category,
            location: data.location,
            guestCount: data.guestCount,
            roomCount: data.roomCount,
            bathroomCount: data.bathroomCount,
            imageSrc: data.imageSrc
        }),
    getListPlace: async () =>
        http.post("/place/get-list",{

        }),
    getPlace: async ({ queryKey }) => 
        http.post("/place/get", {
            placeId: queryKey[1]
        }),
    getListPlaceFavorites: async () =>
        http.post("/place/get-list-favorites", {

        }),
    getListPlaceByOwner: async () =>
        http.post("/place/get-list-owner",{

        }),
    deletePlace: async ({placeId}) =>
        http.post("/place/delete",{
            placeId
        }),
    getPlaceByCategory: async ({ queryKey }) =>
        http.post("/place/category", {
            category: queryKey[1]
        })
    
}
export default placeApi