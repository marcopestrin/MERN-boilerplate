import React from "react";
import { Redirect, Route } from "react-router-dom";

function isAuthenticate(){
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null || accessToken === "") {
        return false;
    }
    return true;
};

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
}) => {
    return (
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
}

