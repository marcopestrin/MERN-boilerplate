import { getListErrors } from "./helpers";
export const selectorAuth = (state) => state.auth;
export const selectorUsers = (state) => state.users;
export const selectorErrors = (state) => getListErrors(state);