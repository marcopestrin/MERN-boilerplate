import React from "react";
import { Container, Grid} from "@material-ui/core";

import Login from "../login";
import SignUp from "../signup";

import "./_styles.scss";

const Wrapper = () => {
    return (
        <Container maxWidth="sm" className="wrapper-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Login />
                </Grid>

                <Grid item xs={12}>
                    <SignUp />
                </Grid>
            </Grid>
        </Container>
    )
};


export default Wrapper;