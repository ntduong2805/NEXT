import { removeItem } from '../utils/authentication'
import http from '../utils/http'

const authApi = {
    login: async (email, password) =>
        http.post('auth/login', {
            email,
            password,
        }),
    register: async (email, username, password, phoneNumber) =>
        http.post('auth/register', {
            email,
            username,
            password,
            phoneNumber
        }),
    userProps: async (email, username, phoneNumber, address ) =>
        http.post("auth//pofile-props", {
            email,
            username,
            phoneNumber,
            address
        }),
    profile: async () => 
        http.post('auth/profile', {
            
        }),
    getFavorites: async ({ queryKey }) =>
        http.post('auth/get-favorites', {
            userId: queryKey[1]
        }),
    actionFavorites: async (userId, placeId) => 
        http.post('auth/action-favorite', {
            userId,
            placeId
        }),
    getUserById: async ({ queryKey }) =>
        http.post('auth/get-user', {
            userId: queryKey[1]
        }),
    logout: async () => {
        removeItem()
        },
    sendOTP: async () => {
        http.post('auth/send-otp'
        )},
    verifyOTP: async ({otpCode}) => 
        http.post('auth/verify-otp', {
            otpCode: otpCode
        }),
    uploadAvatar: async({avatar}) =>
        http.post('auth/upload-avatar', {
            avatar: avatar
        })
}

export default authApi
