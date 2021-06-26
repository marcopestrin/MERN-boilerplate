import { getEndpointList, request } from "./helpers";
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

    return await request({
        url: user.registration,
        method: "POST",
        payload: {
            username,
            password,
            email
        }
    });
};

export const resetPassword = async({ payload }) => {

    const { auth } = await getEndpointList();
    const { email } = payload;

    const result = await http.post(auth.resetPassword, {
        email
    });
    if (result.success) {
        return {
            success: true,
            result
        };
    }
    return {
        error: result.error?.data?.message,
        success: false,
        result
    };
}

export const logout = async(refreshToken) => {
    const { auth } = await getEndpointList();
    
    return await request({
        url: auth.logout,
        method: "POST",
        payload: {
            refreshToken
        }
    })
}