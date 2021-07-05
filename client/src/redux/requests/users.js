import { getEndpointList } from "./helpers";
import http from "./index";

export const getUsersList = async() => {

    const { user } = await getEndpointList();
    return await http.get(user.getAllUsers);
        
}

export const editUser = async(payload) => {

    const { user } = await getEndpointList();
    return await http.post(user.update, payload, {
        params: { id: payload.id }
    });

}

export const removeUser = async({payload}) => {

    const { user } = await getEndpointList();
    return await http.delete(`${user.delete}?id=${payload}`);

}

export const enableUser = async({payload}) => {

    const { user } = await getEndpointList();
    return await http.put(user.active, {}, {
        params: { id: payload }
    });

}

export const disableUser = async({payload}) => {

    const { user } = await getEndpointList();
    return await http.put(user.disable, {}, {
        params: { id: payload }
    });

}

