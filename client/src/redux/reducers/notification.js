import * as actions from "@redux/actions";

export default function notification(prevState = {}, { type, payload }){
    const list = [];
    let obj = null;

    switch (type) {

        case actions.EDIT_USER_SUCCESS:
            obj = {
                message: "Updated user",
                type: 1
            };
            break;

        case actions.EDIT_USER_FAILURE:
            obj = {
                message: "error",
                type: 2
            };
            break;

        case actions.REGISTRATION_SUCCESS:
            obj = {
                message: "User created",
                type: 1
            };
            break;

        case actions.REGISTRATION_FAILURE:
            obj = {
                message: payload.error,
                type: 2
            };
            break;

        case actions.RESET_PASSWORD_SUCCESS:
            obj = {
                message: "Check you inbox",
                type: 1
            };
            break;

        case actions.RESET_PASSWORD_FAILURE:
            obj = {
                message: payload.error,
                type: 2
            };
            break;

        case actions.LOGIN_SUCCESS:
            obj = {
                message: "Login successful",
                type: 1
            };
            break;

        case actions.LOGIN_FAILURE:
            obj = {
                message: payload.error,
                type: 2
            };
            break;

        case actions.LOGOUT_SUCCESS:
            obj = {
                message: "Logout successful",
                type: 1
            };
            break;

        case actions.LOGOUT_FAILURE:
            obj = {
                message: payload.error,
                type: 2
            };
            break;

        case actions.GET_USERS_LIST_FAILURE:
            obj = {
                message: payload.error,
                type: 2
            };
            break
        
        default:
            break;
    }
    if (obj !== null) {
        list.push(obj);
    }
    return { list };
};