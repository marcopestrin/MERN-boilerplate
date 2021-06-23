export const getListErrors = (state) => {
    const errorList = [];
    const { auth, users } = state;
    if (auth){
        if (Object.keys(auth).includes("error")) {
            errorList.push(auth.error);
        }
    }
    if (users) {
        if (Object.keys(users).includes("error")) {
            errorList.push(users.error);
        }
    }
    return errorList;
}