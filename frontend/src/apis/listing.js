import http from '../utils/http'

const listingApi = {
    createListing: async (data) => 
        http.post("/listing/create", {
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
    getList: async () =>
        http.post("/listing/get-list",{

        }),
    getListing: async (data) =>
        http.post("/listing/get", {
            listingId: data
        })
    
}
export default listingApi