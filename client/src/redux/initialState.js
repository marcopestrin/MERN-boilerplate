const initialState = {
    auth: {
        logged: false,
        loginRedirect: false,
        logoutRedirect: false,
        newUser: null,
        notify: {
            errors: [],
            info: []  
        }
    },
    users: {
        list: {},
        notify: {
            errors: [],
            info: []  
        }
    },

};

export default initialState