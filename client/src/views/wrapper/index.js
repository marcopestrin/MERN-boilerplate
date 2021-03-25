import React  from "react";
import { Container, Grid, Button } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../login";
import SignUp from "../signup";
import ResetPassword from "../resetPassword";
import Logout from "../logout";
import "./styles.scss";
import { selectorAuth } from "../../redux/selectors";
import PrivateRoute from "../../components/privateRoute";
import Dashboard from "../../components/dashboard";


const Wrapper = () => {
    const auth = useSelector(selectorAuth);
    console.log(auth.logged);

    return (
        <Router>
            <Container maxWidth="md" className="wrapper-container">
                <Grid container spacing={2}>
                    <Grid item container xs={12} spacing={2}>
                        <PrivateRoute
                            exec
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <Switch>
                            <Route path="/login">
                                <Login />
                                <Logout />
                            </Route>
                            <Route path="/signUp">
                                <SignUp />
                            </Route>
                            <Route path="/resetPassword">
                                <ResetPassword />
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