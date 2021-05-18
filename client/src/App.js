import React from "react";
import { Container, Grid } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import Login from "@views/login";
import SignUp from "@views/signup";
import ResetPassword from "@views/resetPassword";
import "./styles.scss";
import { PrivateRoute, PublicRoute } from "./hooks/routes";
import Dashboard from "@components/dashboard";
import PopupError from "@components/popupError";
import ForceRedirect from "@components/forceRedirect";

const App = () => {
    return (
        <>
            <PopupError />
            <Container maxWidth="md" className="wrapper-container">
                <Grid container spacing={2}>
                    <BrowserRouter>
                        <ForceRedirect />
                        <PublicRoute
                            exec
                            path="/login"
                            component={Login}
                        >
                        </PublicRoute>
                        <PublicRoute
                            exec
                            path="/signUp"
                            component={SignUp}
                        >
                        </PublicRoute>
                        <PublicRoute
                            exec
                            path="/resetPassword"
                            component={ResetPassword}
                        >
                        </PublicRoute>
                        <PrivateRoute
                            exec
                            path="/dashboard"
                            component={Dashboard}
                        />
                    </BrowserRouter>
                </Grid>
            </Container>
        </>
    )
};

export default App;