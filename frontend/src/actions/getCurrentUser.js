import authApi from "../apis/auth";
import { getToken, getUser, removeItem } from "../utils/authentication";

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};
export default async function getCurrentUser() {
    const token = getToken();
    let user = getUser();
    
    if (token) {
        const decodedJwt = parseJwt(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
            removeItem();
			return null;
		}
        if (user === null) {
            const response = await authApi.profile();
            if (response?.data.codeStatus == 200) {
                user = response?.data?.data.user; 
            }
        }
    }
	return user;
}