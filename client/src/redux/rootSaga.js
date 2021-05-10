import { takeLatest } from "redux-saga/effects";

import {
    LOGIN_REQUEST,
    REGISTRATION_REQUEST,
    LOGOUT_REQUEST,
    RESET_PASSWORD_REQUEST,
    GET_USERS_LIST_REQUEST,
    EDIT_USER_REQUEST
  } from "./actions";
  import {
    loginRequest,
    registrationRequest,
    logoutRequest,
    resetPasswordRequest,
    getUsersListRequest,
    editUserRequest
  } from "./saga";

function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(REGISTRATION_REQUEST, registrationRequest);
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordRequest);
    yield takeLatest(GET_USERS_LIST_REQUEST, getUsersListRequest);
    yield takeLatest(EDIT_USER_REQUEST, editUserRequest);
}
export default rootSaga