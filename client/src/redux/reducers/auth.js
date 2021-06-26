import * as actions from "@redux/actions";

const notify = {
    errors: [],
    info: []
};

export default function auth(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const errorList = clonedState?.notify?.errors;
    const infoList = clonedState?.notify?.info;
    const { type, payload } = action;
    switch (type) {

        case actions.REGISTRATION_REQUEST:
            clonedState = {
                ...clonedState,
                newUser: null,
                notify
            };
            break;

        case actions.REGISTRATION_SUCCESS:
            infoList.push("User Created");
            clonedState = {
                ...clonedState,
                notify: {
                    errors: [],
                    info: infoList
                },
                newUser: {
                    //...payload
                    success: true
                }
            };
            break;
                          
        case actions.REGISTRATION_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                ...clonedState,
                newUser: null,
                notify: {
                    info: [],
                    errors: errorList,
                }
            };
            break;

        case actions.RESET_PASSWORD_REQUEST:
            clonedState = {
                ...clonedState,
                notify
            };
            break;

        case actions.RESET_PASSWORD_SUCCESS:
            infoList.push("Check your box");
            clonedState = {
                ...clonedState,
                notify: {
                    errors: [],
                    info: infoList
                },

            };
            break;
            
        case actions.RESET_PASSWORD_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                ...clonedState,
                notify: {
                    info: [],
                    errors: errorList,
                }
            };
            break;

        case actions.LOGIN_REQUEST:
            clonedState = {
                ...clonedState,
                notify
            };
            break;

        case actions.LOGIN_SUCCESS:
            infoList.push("Login successful");
            clonedState = {
                ...clonedState,
                loginRedirect: true,
                logoutRedirect: false,
                logged: true,
                newUser: null,
                notify: {
                    info: infoList,
                    errors: []
                }
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

        case actions.LOGOUT_SUCCESS:
            infoList.push("Logout successful");
            clonedState = {
                ...clonedState,
                loginRedirect: false,
                logoutRedirect: true,
                logged: false,
                notify: {
                    info: infoList,
                    errors: []
                }
            };
            localStorage.removeItem("role");
            localStorage.removeItem("active");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            break;
              
        case actions.LOGOUT_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                logoutRedirect: false,
                notify: {
                    errors: errorList,
                    info: []
                }
            };
            break;
                          
        case actions.LOGIN_FAILURE:
            errorList.push(payload.error);
            clonedState = {
                loginRedirect: false,
                notify: {
                    errors: errorList,
                    info: []
                }
            };
            break;

        default:
            break;
    }
    return clonedState;
};