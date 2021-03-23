import { getEndpointList, request } from "./helpers";
export const login = async({payload}) => {

    const { auth } = await getEndpointList();
    
    return await request({
        url: auth.login,
        method: "POST",
        payload: {
            username: payload?.username,
            password: payload?.password
        }
    });
};

export const registration = async(payload) => {
    return {
        response: "ok!"
    }
};