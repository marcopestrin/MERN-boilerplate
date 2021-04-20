import React, { memo, useEffect } from "react"
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { GET_USERS_LIST_REQUEST } from "@redux/actions";
import { selectorUsers } from "@redux/selectors"
import Logout from "@components/logout";
import UserTable from "@components/userTable";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(selectorUsers);
    const role = localStorage.getItem("role")

    const getAllUsers = () => {
        dispatch({
            type: GET_USERS_LIST_REQUEST
        });
    };

    useEffect(getAllUsers, []);

    return (
        <>
            { role && <Typography variant="body2"> Sei loggato come { role } </Typography> }
            <UserTable
                users={list}
            />
            <Logout />
        </>
    )
}

export default memo(Dashboard);