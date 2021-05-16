import { getListErrors } from "./helpers";
export const selectorAuth = (state) => state.auth;
export const selectorUser = (state) => state.user;
export const selectorErrors = (state) => getListErrors(state);