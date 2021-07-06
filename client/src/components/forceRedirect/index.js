import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth } from "@redux/selectors";

const ForceRedirect = ({ children }) => {
    const { loginRedirect, logoutRedirect, newUser } = useSelector(selectorAuth);
    return (
        <>
            { logoutRedirect && <Redirect to="/login" /> }
            { loginRedirect && <Redirect to="/dashboard" /> }
            { newUser?.success && <Redirect to="/login" /> }
            { children }
        </>
    )
};

export default ForceRedirect;