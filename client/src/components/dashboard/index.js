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
    const role = localStorage.getItem("role");

    const listAvailable = (list) => {
        if (list === undefined || list === null || Object.keys(list).length === 0 || list.length < 1) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        dispatch({
            type: GET_USERS_LIST_REQUEST
        });
    }, []);

    return (
        <>
            { role && <Typography variant="body2"> Sei loggato come { role } </Typography> }
            { listAvailable(list) && <> <UserTable users={list} /><Logout /> </> }
        </>
    )
}

export default memo(Dashboard);