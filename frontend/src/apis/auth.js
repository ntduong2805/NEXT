import { removeItem } from '../utils/authentication'
import http from '../utils/http'

const authApi = {
    login: async (email, password) =>
        http.post('auth/login', {
            email,
            password,
        }),
    register: async (email, username, password) =>
        http.post('auth/register', {
            email,
            username,
            password,
        }),
    
    profile: async () => 
        http.post('auth/profile', {
            
        }),
    getFavorites: async (data) =>
        http.post('auth/get-favorites', {
            userId: data
        }),
    actionFavorites: async (userId, listingId) => 
        http.post('auth/action-favorite', {
            userId,
            listingId
        }),
    logout: async () => {
        removeItem()
    }
}

export default authApi
