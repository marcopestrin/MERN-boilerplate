import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticate } from "../../utils/helpers";

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            { ...rest }
            render={props => {
                return (
                    isAuthenticate()
                    ? <Component {...props} />
                    : <Redirect to="/login" />
                )
            }}
        />
    )
}


export const PublicRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        { ...rest }
        render={props => {
            return (
                isAuthenticate()
                ? <Redirect to="/dashboard" />
                : <Component {...props} />
            )
        }}
    />
)



