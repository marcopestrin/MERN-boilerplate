
import Logout from "../logout";
import { useDispatch } from "react-redux";
import { GET_USERS_LIST_REQUEST } from "../../redux/actions";
import { useEffect } from "react";

const Dashboard = () => {
    const dispatch = useDispatch();

    const getAllUsers = () => {
        dispatch({
            type: GET_USERS_LIST_REQUEST
        });
    };

    useEffect(getAllUsers, [getAllUsers])

    return (
        <>
            <p>example</p>
            <p>qui dentrooo</p>
            <Logout />
        </>
    )
}

export default Dashboard;