export const getListErrors = (state) => {
    const { auth, users } = state;
    const errorList = [];
    if (auth && Object.keys(auth).includes("error")) {
        errorList.push(auth.error);
    }
    if (users && Object.keys(users).includes("error")) {
        errorList.push(users.error);
    }
    return errorList;
}