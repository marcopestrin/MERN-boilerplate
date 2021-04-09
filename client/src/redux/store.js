
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import initialState from "./initialState";
import reducers from "./reducers";
import rootSaga from "./rootSaga";

export const configureStore = () => {

    const isExtensionInstalled = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const isDevMode = process.env.NODE_ENV !== "production";
    const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;

    let store;
    const middlewareSaga = createSagaMiddleware();


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