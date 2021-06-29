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

export const removeUser = async(payload) => {

    console.log("1111", payload);
    return {
        success: true
    }

}

export const enableUser = async(payload) => {

    console.log("2222", payload);
    return {
        success: true
    }
}

export const disableUser = async(payload) => {

    console.log("333", payload);
    return {
        success: true
    }
}

