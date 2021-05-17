export const getListErrors = (state) => {
    const errorList = [];
    if (Object.keys(state.auth).includes("error")) {
        errorList.push(state.auth.error);
    }
    if (Object.keys(state.users).includes("error")) {
        errorList.push(state.users.error);
    }
    return errorList;
}