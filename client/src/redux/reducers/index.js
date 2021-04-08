import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
const reducers = combineReducers({
    auth,
    users,
});
export default reducers;