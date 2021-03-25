import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectorAuth } from "../../redux/selectors";

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const auth = useSelector(selectorAuth);
    return (
        <Route
            { ...rest }
            render={(props) => {
                auth.logged
                ? <Component {...props} />
                : <Redirect push to="/login" />
            }}
        />
    )
};

export default PrivateRoute;