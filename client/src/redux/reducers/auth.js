import * as actions from "@redux/actions";

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const errorList = clonedState?.notify?.errors;
    const infoList = clonedState?.notify?.info;
    const { type, payload } = action;
    switch (type) {

        case actions.REGISTRATION_REQUEST:
            clonedState = {
                ...clonedState,
                newUser: null
            }
            break;

        case actions.REGISTRATION_SUCCESS:
            infoList.push("User Created");
            clonedState = {
                ...clonedState,
                notify: {
                    ...clonedState.notify,
                    info: infoList
                },
                newUser: {
                    //...payload
                    success: true
                }
            };
            delete clonedState.error;
            break;
                          
        case actions.REGISTRATION_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                ...clonedState,
                newUser: null,
                notify: {
                    ...clonedState.notify,
                    error: errorList,
                }
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
            errorList.push(payload.error);
            clonedState = {
                logoutRedirect: false,
                notify: {
                    ...clonedState.notify,
                    errors: errorList,
                }
            };
            break;
                          
        case actions.LOGIN_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                loginRedirect: false,
                notify: {
                    ...clonedState.notify,
                    errors: errorList,
                }
            };
            break;

        default:
            break;
    }
    return clonedState;
};