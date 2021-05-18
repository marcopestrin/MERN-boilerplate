import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth } from "@redux/selectors";

const ForceRedirect = () => {
    const { loginRedirect, logoutRedirect, newUser } = useSelector(selectorAuth);
    // valutare se in futuro farlo con il props children e wrappare tutto all'interno
    return (
        <>
            { logoutRedirect && <Redirect to="/login" /> }
            { loginRedirect && <Redirect to="/dashboard" /> }
            { newUser?.success && <Redirect to="/login" /> }
        </>
    )
};

export default ForceRedirect;