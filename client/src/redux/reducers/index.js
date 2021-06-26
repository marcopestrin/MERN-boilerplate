import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import notification from "./notification";

const reducers = combineReducers({
    auth,
    users,
    notification
});
export default reducers;