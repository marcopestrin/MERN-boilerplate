import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
    component: Component,
    profile,
    ...rest
}) => (
    <Route
        { ...rest }
        render={props => {
            return (
                profile.logged
                ? <Component {...props} />
                : <Redirect to="/login" />
            )
        }}
    />
)


export default PrivateRoute;