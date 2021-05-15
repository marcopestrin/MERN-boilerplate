import { getEndpointList } from "./helpers";
import http from "./index";

export const getUsersList = async() => {
    const { user } = await getEndpointList();
    const result = await http.get(user.getAllUsers);
    return {
        data: result.data,
        success: true
    }
}

export const editUser = async(payload) => {
    const { user } = await getEndpointList();
    const data = await http.post(user.update, payload, {
        params: { id: payload.id }
    })
    return {
        data,
        success: true
    }

}