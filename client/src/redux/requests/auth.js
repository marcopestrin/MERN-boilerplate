import { getEndpointList } from "./helpers";
import http from "./index";

export const login = async({ payload }) => {
    const { auth } = await getEndpointList();
    const data = await http.post(auth.login, {
        username: payload?.username,
        password: payload?.password
    });
    if (data && data.success) {
        return { 
            data,
            success: true,
            message: ""
        }
    }
    return {
        message: "Wrong credentials",
        data: null,
        success: false
    }
};

export const registration = async({ payload }) => {
    const { user } = await getEndpointList();
    const { username, password, email } = payload;
    return await http.post(user.registration, {
        username,
        password,
        email
    });
};

export const resetPassword = async({ payload }) => {
    const { auth } = await getEndpointList();
    const { email } = payload;
    return await http.post(auth.resetPassword, { email });
}

export const logout = async(refreshToken) => {
    const { auth } = await getEndpointList();
    return await http.post(auth.logout, { refreshToken })
}