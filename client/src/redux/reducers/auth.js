import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE
} from "../actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case REGISTRATION_SUCCESS:
            clonedState = {
                ...clonedState,
                newUser: payload.response
            };
            break;
                          
        case REGISTRATION_FAILURE:
            clonedState = {
                error: payload.error,
                isLoading: false
            };
            break;

        case LOGIN_SUCCESS:
            const { refreshToken, accessToken } = payload;
            clonedState = {
                ...clonedState,
                accessToken,
                refreshToken
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