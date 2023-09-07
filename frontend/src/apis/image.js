import http from '../utils/http'

const imageApi = {
    uploadByUrl: async (url) =>
        http.post("/image/upload-by-url", {
            url
        }),
    uploadImage: async (data) =>
        http.post("/image/upload-image", data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
}
export default imageApi