import { getEndpointList, request } from "./helpers";

export const getUsersList = async() => {
    const { user } = await getEndpointList();

    return await request({
        url: user.getAllUsers,
        method: "GET"
    });
}