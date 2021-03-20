import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from "../actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case LOGIN_SUCCESS:
            clonedState = {
                ...clonedState,
                token: payload.token
            };
            break;
              
        case LOGIN_FAILURE:
            clonedState = {
                error: payload.error,
                isLoading: false
            };
            break;

        case LOGOUT_SUCCESS:
            clonedState = {
                ...clonedState,
                token: ""
            };
            break;
              
        case LOGOUT_FAILURE:
            clonedState = {
                error: payload.error,
                isLoading: false
            };
            break;

        default:
            break;
    }
    return clonedState;
};