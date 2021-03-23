import { put } from "redux-saga/effects";

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS
} from "./actions";
import { login, registration } from "./requests/auth";

export function* loginRequest(payload) {
    try {
        const res = yield login(payload);
        const { refreshToken, accessToken, success } = res;
        if (success) {
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            yield put({
                type: LOGIN_SUCCESS,
            })
        } else {
            throw res;
        }
    } catch (error) {
        yield put({
            type: LOGIN_FAILURE,
            payload: { error }
        })
    }
}

export function* registrationRequest(payload) {
    try {
        const res = yield registration(payload);
        if (res.success) {
            yield put({
                type: REGISTRATION_SUCCESS,
                payload: res
            })
        }
    } catch (error) {
        yield put({
            type: REGISTRATION_FAILURE,
            payload: { error }
        })
    }
}

export function* logoutRequest() {
    try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        yield put({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        yield put({
            type: LOGOUT_FAILURE,
            payload: { error }
        })
    }
}