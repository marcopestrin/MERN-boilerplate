import { put } from "redux-saga/effects";
import { getUsersList, editUser, disableUser, enableUser, removeUser } from "@redux/requests/users";
import * as actions from "@redux/actions";

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

export function* editUserRequest({ payload }) {
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

export function* enableUserRequest({ payload }) {
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
export function* disableUserRequest({ payload }) {
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
export function* removeUserRequest({ payload }) {
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