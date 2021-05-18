import * as actions from "@redux/actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case actions.REGISTRATION_REQUEST:
            clonedState = {
                ...clonedState,
                newUser: null
            }
            break

        case actions.REGISTRATION_SUCCESS:
            clonedState = {
                ...clonedState,
                newUser: {
                    //...payload
                    success: true
                }
            };
            delete clonedState.error;
            break;
                          
        case actions.REGISTRATION_FAILURE:
            clonedState = {
                ...clonedState,
                newUser: null,
                error: payload.error,
            };
            break;

        case actions.RESET_PASSWORD_SUCCESS:
            delete clonedState.error;
            break;
            
        case actions.RESET_PASSWORD_FAILURE:
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
        case actions.LOGOUT_SUCCESS:
            clonedState = {
                ...clonedState,
                loginRedirect: false,
                logoutRedirect: true,
                logged: false
            };
            localStorage.removeItem("role");
            localStorage.removeItem("active");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            delete clonedState.error;
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