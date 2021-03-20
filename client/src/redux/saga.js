import { put } from "redux-saga/effects";

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
import { login } from "./requests/auth";

export function* loginRequest(payload) {
    try {
        const res = yield login(payload);
        yield put({
            type: LOGIN_SUCCESS,
            payload: res
        })
    } catch (error) {
        yield put({
            type: LOGIN_FAILURE,
            payload: { error }
        })
    }
}