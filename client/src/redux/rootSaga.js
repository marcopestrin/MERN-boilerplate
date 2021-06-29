import { takeLatest } from "redux-saga/effects";

import {
    LOGIN_REQUEST,
    REGISTRATION_REQUEST,
    LOGOUT_REQUEST,
    RESET_PASSWORD_REQUEST,
    GET_USERS_LIST_REQUEST,
    EDIT_USER_REQUEST,
    REMOVE_USER_REQUEST,
    DISABLE_USER_REQUEST,
    ENABLE_USER_REQUEST
  } from "./actions";
  import {
    loginRequest,
    registrationRequest,
    logoutRequest,
    resetPasswordRequest,
    getUsersListRequest,
    editUserRequest,
    removeUserRequest,
    disableUserRequest,
    enableUserRequest
  } from "./saga";

function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(REGISTRATION_REQUEST, registrationRequest);
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordRequest);
    yield takeLatest(GET_USERS_LIST_REQUEST, getUsersListRequest);
    yield takeLatest(EDIT_USER_REQUEST, editUserRequest);
    yield takeLatest(REMOVE_USER_REQUEST, removeUserRequest);
    yield takeLatest(DISABLE_USER_REQUEST, disableUserRequest);
    yield takeLatest(ENABLE_USER_REQUEST, enableUserRequest);
}
export default rootSaga