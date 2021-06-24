import { getListErrors, getMessages, getNotifyMessage } from "./helpers";
export const selectorAuth = (state) => state.auth;
export const selectorUsers = (state) => state.users;
export const selectorErrors = (state) => getListErrors(state);
export const selectorNotify = (state) => getNotifyMessage(state);