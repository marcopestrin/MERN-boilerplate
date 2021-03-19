import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from "../login";
import SignUp from "../signup";
import RecoveryPassword from "../recoveryPassword";

import "./styles.scss";

const Wrapper = () => {
    return (
        <Router>
            <Container maxWidth="md" className="wrapper-container">
                <Grid container spacing={2}>
                    <Grid item container xs={12} spacing={2}>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/signUp">
                                <SignUp />
                            </Route>
                            <Route path="/recoveryPassword">
                                <RecoveryPassword />
                            </Route>
                            <Route path="/">
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
                                
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </Router>
    )
};


export default Wrapper;