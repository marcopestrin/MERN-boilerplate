import * as actions from "@redux/actions";

export default function users(prevState = {}, action){
    let clonedState = JSON.parse(JSON.stringify(prevState));
    const { type, payload } = action;
    switch (type) {

        case actions.GET_USERS_LIST_SUCCESS:
            clonedState = {
                ...clonedState,
                list: payload,
                loginRedirect: false
            };
            break;

        default:
            break;
    }
    return clonedState;
};