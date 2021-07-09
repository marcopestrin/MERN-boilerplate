import { put } from "redux-saga/effects";
import { login, registration, recoveryPassword, logout, changePassword } from "@redux/requests/auth";
import * as actions from "@redux/actions";

export function* loginRequest({ payload }) {
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

export function* registrationRequest({ payload }) {
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

export function* recoveryPasswordRequest({ payload }) {
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

export function* changePasswordRequest({ payload }) {
    try {
        const res = yield changePassword(payload);
        if (res.success) {
            yield put({
                type: actions.CHANGE_PASSWORD_SUCCESS
            });
            return;
        }
    } catch (error) {
        yield put({
            type: actions.CHANGE_PASSWORD_FAILURE
        });
    }
};