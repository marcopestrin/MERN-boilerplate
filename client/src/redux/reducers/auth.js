import * as actions from "../actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case actions.REGISTRATION_SUCCESS:
            clonedState = {
                ...clonedState,
                newUser: {
                    ...payload
                }
            };
            break;
                          
        case actions.REGISTRATION_FAILURE:
            clonedState = {
                ...clonedState,
                error: payload.error,
            };
            break;

        case actions.RESET_PASSWORD_SUCCESS:
            break;
            
        case actions.RESET_PASSWORD_FAILURE:
            break;

        case actions.LOGIN_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: true,
                logoutRedirect: false,
                logged: true
            };
            break;

        case actions.LOGOUT_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: false,
                logoutRedirect: true,
                logged: false
            };
            break;
              
        case actions.LOGOUT_FAILURE:
            clonedState = {
                logoutRedirect: false,
                error: payload.error,
            };
            break;
                          
        case actions.LOGIN_FAILURE:
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