import React, { useState } from "react";
import { FormControl, TextField, Typography, Grid, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { REGISTRATION_REQUEST } from "@redux/actions";
import "./styles.scss";
const SignUp = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const dispatch = useDispatch();

    const goToLogin = () => {

    };

    const signUpRequest = () => {
        dispatch({
            type: REGISTRATION_REQUEST,
            payload: {
                username,
                password,
                email
            }
        })
    };
    
    return (
        <FormControl
            fullWidth
            margin="normal"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Email"
                        type="email"
                        color="primary"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Username"
                        type="input"
                        color="primary"
                        fullWidth
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Password"
                        type="password"
                        color="primary"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Ridigita Password"
                        type="password"
                        color="primary"
                        fullWidth
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={signUpRequest}
                    >
                        Registra nuovo utente
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="primary"
                        className="hypertext"
                        onClick={goToLogin}
                    >
                        <Link to="/login">Accedi alla piattaforma</Link>   
                    </Typography>
                </Grid>

            </Grid>

        </FormControl>
    )
}

export default SignUp;