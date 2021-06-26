const initialState = {
    auth: {
        logged: false,
        loginRedirect: false,
        logoutRedirect: false,
        newUser: null,
    },
    users: {
        list: {},
    },
    notification: {
        list: []
    }
};

export default initialState