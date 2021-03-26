import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "../actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case REGISTRATION_SUCCESS:
            clonedState = {
                ...clonedState,
                newUser: {
                    ...payload
                }
            };
            break;
                          
        case REGISTRATION_FAILURE:
            clonedState = {
                ...clonedState,
                error: payload.error,
            };
            break;

        case RESET_PASSWORD_SUCCESS:
            break;
            
        case RESET_PASSWORD_FAILURE:
            break;

        case LOGIN_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: true,
                logoutRedirect: false,
                logged: true
            };
            break;

        case LOGOUT_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: false,
                logoutRedirect: true,
                logged: false
            };
            break;
              
        case LOGOUT_FAILURE:
            clonedState = {
                logoutRedirect: false,
                error: payload.error,
            };
            break;
                          
        case LOGIN_FAILURE:
            clonedState = {
                loginRedirect: false,
                error: payload.error,
            };
            break;

        default:
            break;
    }
    return clonedState;
};