import * as actions from "@redux/actions";
import { cleanLocalStorage } from "@redux/helpers";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case actions.REGISTRATION_REQUEST:
            clonedState = {
                ...clonedState,
                newUser: null
            };
            break;

        case actions.REGISTRATION_SUCCESS:
            clonedState = {
                ...clonedState,
                newUser: {
                    success: true
                }
            };
            break;

        case actions.RECOVERY_PASSWORD_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: true
            };
            break;
                          
        case actions.REGISTRATION_FAILURE:
            clonedState = {
                ...clonedState,
                newUser: null,
            };
            break;

        case actions.LOGIN_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: true,
                logoutRedirect: false,
                logged: true,
                newUser: null
            };
            const { userActive, refreshToken, accessToken, userRole, userId } = payload;
            const role = userRole === 1 ? "ADMIN" : "USER";
            localStorage.setItem('role', role);
            localStorage.setItem('active', userActive);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            break;
    
        case actions.GET_USERS_LIST_FAILURE:
            break;

        case actions.TOKEN_EXPIRED:
        case actions.LOGOUT_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: false,
                logoutRedirect: true,
                logged: false
            };
            cleanLocalStorage()
            break;
              
        case actions.LOGOUT_FAILURE:
            clonedState = {
                logoutRedirect: false
            };
            break;
                          
        case actions.LOGIN_FAILURE:
            clonedState = {
                loginRedirect: false
            };
            break;

        default:
            break;
    }
    return clonedState;
};