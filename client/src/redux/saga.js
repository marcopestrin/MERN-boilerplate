import { put } from "redux-saga/effects";

import * as actions from "./actions";
import { login, registration, resetPassword, logout } from "./requests/auth";
import { getUsersList } from "./requests/users";

export function* getUsersListRequest() {
    try {
        const res = yield getUsersList();
        if (res.success) {
            yield put({
                type: actions.GET_USERS_LIST_SUCCESS,
                payload: res.data
            })
        } else {
            throw res.error
        }
    } catch (error) {
        yield put({
            type: actions.GET_USERS_LIST_FAILURE,
            payload: { error }
        })
    }

}

export function* loginRequest(payload) {
    try {
        const res = yield login(payload);
        const { refreshToken, accessToken, success } = res;
        if (success) {
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            yield put({
                type: actions.LOGIN_SUCCESS,
            })
        } else {
            throw res;
        }
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
                type: actions.REGISTRATION_SUCCESS,
                payload: res
            })
        }
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
            })
        }
    } catch (error) {
        yield put({
            type: actions.LOGOUT_FAILURE,
            payload: { error }
        })
    }
};

export function* resetPasswordRequest(payload) {
    try {
        yield resetPassword(payload);
        yield put({
            type: actions.RESET_PASSWORD_SUCCESS
        })
    } catch (error) {
        yield put({
            type: actions.RESET_PASSWORD_FAILURE,
            payload: { error }
        })
    }
};