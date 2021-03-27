
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import auth from "./reducers/auth";
import users from "./reducers/users";
import {
  LOGIN_REQUEST,
  REGISTRATION_REQUEST,
  LOGOUT_REQUEST,
  RESET_PASSWORD_REQUEST,
  GET_USERS_LIST_REQUEST
} from "./actions";
import {
  loginRequest,
  registrationRequest,
  logoutRequest,
  resetPasswordRequest,
  getUsersListRequest
} from "./saga";

export const configureStore = () => {

  const isExtensionInstalled = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const isDevMode = process.env.NODE_ENV !== "production";
  const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;

  let store;
  const middlewareSaga = createSagaMiddleware();
  const initialState = {
    auth: {
      logged: false,
      loginRedirect: false,
      logoutRedirect: false,
    }
  };

  const reducers = combineReducers({
    auth,
    users,
  });

  if (isDevMode && isChrome && isExtensionInstalled) {
    // queste condizioni fanno riferimento alla dev-tools-bar di redux
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(middlewareSaga),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
  } else {
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(middlewareSaga))
    );

  }

  middlewareSaga.run(rootSaga);
  return store;
}

function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(REGISTRATION_REQUEST, registrationRequest);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordRequest);
  yield takeLatest(GET_USERS_LIST_REQUEST, getUsersListRequest);
}