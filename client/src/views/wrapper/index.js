import React  from "react";
import { Container, Grid, Button } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    Link
} from "react-router-dom";
import { useSelector } from "react-redux";


import Login from "../login";
import SignUp from "../signup";
import ResetPassword from "../resetPassword";
import Logout from "../logout";
import "./styles.scss";
import { selectorAuth } from "../../redux/selectors";
import PrivateRoute from "../../hooks/privateRoute";
import Dashboard from "../../components/dashboard";


const Wrapper = () => {
    const profile = useSelector(selectorAuth);

    console.log("profile", profile)

    return (
        <Container maxWidth="md" className="wrapper-container">
            <Grid container spacing={2}>
                <Grid item container xs={12} spacing={2}>
                    <BrowserRouter>
                            <Route
                                path="/login"
                                component={Login}
                            >
                            </Route>
                            <Route
                                path="/signUp"
                                component={SignUp}
                            >
                            </Route>
                            <Route
                                path="/resetPassword"
                                component={ResetPassword}
                            >
                            </Route>
                            <PrivateRoute
                                exec
                                path="/dashboard"
                                component={Dashboard}
                                profile={profile}
                            />
                            {/* <Route path="/">
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                    >
                                        <Link to="/signUp">Registrati</Link>   
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                    >
                                        <Link to="/login">Accedi alla piattaforma</Link>   
                                    </Button>
                                </Grid>
                            </Route> */}
                    </BrowserRouter>
                </Grid>
            </Grid>
        </Container>
    )
};


export default Wrapper;