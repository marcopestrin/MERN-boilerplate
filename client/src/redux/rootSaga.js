import { takeLatest } from "redux-saga/effects";

import {
    LOGIN_REQUEST,
    REGISTRATION_REQUEST,
    LOGOUT_REQUEST,
    RECOVERY_PASSWORD_REQUEST,
    GET_USERS_LIST_REQUEST,
    EDIT_USER_REQUEST,
    REMOVE_USER_REQUEST,
    DISABLE_USER_REQUEST,
    ENABLE_USER_REQUEST,
    CHANGE_PASSWORD_REQUEST
  } from "./actions";
  import {
    loginRequest,
    registrationRequest,
    logoutRequest,
    recoveryPasswordRequest,
    changePasswordRequest
  } from "./controllers/auth";
  import {
    getUsersListRequest,
    editUserRequest,
    removeUserRequest,
    disableUserRequest,
    enableUserRequest,
  } from "./controllers/users";

function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(REGISTRATION_REQUEST, registrationRequest);
    yield takeLatest(RECOVERY_PASSWORD_REQUEST, recoveryPasswordRequest);
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordRequest);
    yield takeLatest(GET_USERS_LIST_REQUEST, getUsersListRequest);
    yield takeLatest(EDIT_USER_REQUEST, editUserRequest);
    yield takeLatest(REMOVE_USER_REQUEST, removeUserRequest);
    yield takeLatest(DISABLE_USER_REQUEST, disableUserRequest);
    yield takeLatest(ENABLE_USER_REQUEST, enableUserRequest);
}
export default rootSaga