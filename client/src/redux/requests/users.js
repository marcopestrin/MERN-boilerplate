import fetcher, { getEndpointList } from "./helpers";
import http from "./index";

export const getUsersList = async() => {
    const { user } = await getEndpointList();
    const { data, error } = await fetcher({
        url: user.getAllUsers,
        method: "GET"
    });
    if (error) {
        return {
            success: false,
            error
        }
    }
    return {
        data,
        success: true
    };
}

export const editUser = async(payload) => {
    const { user } = await getEndpointList();
    // const { data, error } = await fetcher({
    //     url: user.update,
    //     method: "POST",
    //     params: {
    //         id: payload.userId
    //     },
    //     body: payload
    // });
    // if (error) {
    //     return {
    //         success: false,
    //         error
    //     }
    // }
    // return {
    //     data,
    //     success: true
    // };
    http.post(user.update, payload, {
        params: { id: payload.id }
    })

}