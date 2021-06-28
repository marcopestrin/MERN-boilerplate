import { getEndpointList } from "./helpers";
import http from "./index";

export const getUsersList = async() => {
    const { user } = await getEndpointList();
    return await http.get(user.getAllUsers);
}

export const editUser = async(payload) => {
    const { user } = await getEndpointList();
    const data = await http.post(user.update, payload, {
        params: { id: payload.id }
    });
    return {
        data,
        success: true
    }

}