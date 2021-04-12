import React, { memo, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { GET_USERS_LIST_REQUEST } from "../../redux/actions";
import Logout from "../logout";
import UserTable from "../userTable";
import { selectorUsers } from "../../redux/selectors"

const Dashboard = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(selectorUsers);

    const getAllUsers = () => {
        dispatch({
            type: GET_USERS_LIST_REQUEST
        });
    };

    useEffect(getAllUsers, []);

    return (
        <>
            <UserTable
                users={list}
            />
            <Logout />
        </>
    )
}

export default memo(Dashboard);