import React  from "react";
import { Container, Grid, } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import Login from "../login";
import SignUp from "../signup";
import ResetPassword from "../resetPassword";
import "./styles.scss";
import { PrivateRoute, PublicRoute } from "../../hooks/routes";
import Dashboard from "../../components/dashboard";


const Wrapper = () => {

    return (
        <Container maxWidth="md" className="wrapper-container">
            <Grid container spacing={2}>
                <Grid item container xs={12} spacing={2}>
                    <BrowserRouter>
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
            </Grid>
        </Container>
    )
};


export default Wrapper;