import * as actions from "../actions";

export default function users(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case actions.GET_USERS_LIST_SUCCESS:
            clonedState = {
                ...clonedState,
                list: {
                    ...payload
                }
            };
            break;
                          
        case actions.GET_USERS_LIST_FAILURE:
            clonedState = {
                ...clonedState,
                error: payload.error,
            };
            break;

        default:
            break;
    }
    return clonedState;
};