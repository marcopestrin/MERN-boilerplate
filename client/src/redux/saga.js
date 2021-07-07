import { put } from "redux-saga/effects";

import * as actions from "./actions";
import { login, registration, recoveryPassword, logout, changePassword } from "./requests/auth";
import { getUsersList, editUser, disableUser, enableUser, removeUser } from "./requests/users";

export function* changePasswordRequest({ payload}) {
    try {
        const res = yield changePassword(payload);
        if (res.success) {
            yield put({
                type: actions.CHANGE_PASSWORD_SUCCESS
            });
        }
    } catch (error) {
        yield put({
            type: actions.CHANGE_PASSWORD_FAILURE
        });
    }
};

export function* getUsersListRequest() {
    try {
        const res = yield getUsersList();
        if (res.tokenError) {
            yield put({
                type: actions.TOKEN_EXPIRED
            });
        }
        if (res.success) {
            yield put({
                type: actions.GET_USERS_LIST_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        yield put({
            type: actions.GET_USERS_LIST_FAILURE,
            payload: { error }
        })
    }
};

export function* loginRequest(payload) {
    try {
        const res = yield login(payload);
        if (res.success) {
            yield put({
                type: actions.LOGIN_SUCCESS,
                payload: res.data
            });
            return;
        }
        throw res.message;
    } catch (error) {
        yield put({
            type: actions.LOGIN_FAILURE,
            payload: { error }
        })
    }
};

export function* registrationRequest(payload) {
    try {
        const res = yield registration(payload);
        if (res.success) {
            yield put({
                type: actions.REGISTRATION_SUCCESS
            })
            return;
        }
        throw res.message;
    } catch (error) {
        yield put({
            type: actions.REGISTRATION_FAILURE,
            payload: { error }
        })
    }
};

export function* logoutRequest() {
    try {
        const res = yield logout(localStorage.getItem("refreshToken"));
        if (res.success) {
            yield put({
                type: actions.LOGOUT_SUCCESS
            });
        }
    } catch (error) {
        yield put({
            type: actions.LOGOUT_FAILURE,
            payload: { error }
        })
    }
};

export function* recoveryPasswordRequest(payload) {
    try {
        const res = yield recoveryPassword(payload);
        if (res.success) {
            yield put({
                type: actions.RECOVERY_PASSWORD_SUCCESS
            });
            return;
        }
        throw res.message;
    } catch (error) {
        yield put({
            type: actions.RECOVERY_PASSWORD_FAILURE,
            payload: { error }
        })
    }
};

export function* editUserRequest({payload}) {
    try {
        const res = yield editUser(payload);
        if (res.tokenError) {
            yield put({
                type: actions.TOKEN_EXPIRED
            });
            return;
        }
        if (res.success) {
            yield put({
                type: actions.EDIT_USER_SUCCESS
            })
            yield put({
                type: actions.GET_USERS_LIST_REQUEST
            });
            return;
        }
        throw res.message;
    } catch(error) {
        yield put({
            type: actions.EDIT_USER_FAILURE,
            payload: { error }
        })
    }
};

export function* enableUserRequest(payload) {
    try {
        const res = yield enableUser(payload);
        if (res.tokenError) {
            yield put({
                type: actions.TOKEN_EXPIRED
            });
            return;
        }
        if (res.success) {
            yield put({
                type: actions.ENABLE_USER_SUCCESS
            });
            yield put({
                type: actions.GET_USERS_LIST_REQUEST
            });
        }
    } catch(error) {
        yield put({
            type: actions.ENABLE_USER_FAILURE,
            payload: { error }
        });
    }
}; 
export function* disableUserRequest(payload) {
    try {
        const res = yield disableUser(payload);
        if (res.tokenError) {
            yield put({
                type: actions.TOKEN_EXPIRED
            });
            return;
        }
        if (res.success) {
            yield put({
                type: actions.DISABLE_USER_SUCCESS
            });
            yield put({
                type: actions.GET_USERS_LIST_REQUEST
            });
        }
    } catch(error) {
        yield put({
            type: actions.DISABLE_USER_FAILURE,
            payload: { error }
        });
    }
};
export function* removeUserRequest(payload) {
    try {
        const res = yield removeUser(payload);
        if (res.tokenError) {
            yield put({
                type: actions.TOKEN_EXPIRED
            });
            return;
        }
        if (res.success) {
            yield put({
                type: actions.REMOVE_USER_SUCCESS
            });
            yield put({
                type: actions.GET_USERS_LIST_REQUEST
            });
        }
    } catch(error) {
        yield put({
            type: actions.REMOVE_USER_FAILURE,
            payload: { error }
        });
    }
};