import * as actions from "@redux/actions";

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
            const { userActive, refreshToken, accessToken, userRole } = payload;
            const role = userRole === 1 ? "ADMIN" : "USER";
            localStorage.setItem('role', role);
            localStorage.setItem('active', userActive);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
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