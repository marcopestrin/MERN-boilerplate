import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Grid, Button } from '@material-ui/core';
import { LOGIN_REQUEST } from "@redux/actions";
import validation from "@validator";
import signUpSchema from "@validator/login";
import "./styles.scss";
import MenuAuth from "@components/menuAuth";
import Title from "@components/title";

const Login = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ validForm, setValidForm ] = useState(false);
    const dispatch = useDispatch();

    const loginRequest = () => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username,
                password
            }
        });
    };

    const validateForm = () => {
        const payload = { username, password };
        const result = validation(signUpSchema, payload);
        const valid = !result.error;
        setValidForm(valid)
    }

    return (
        <>
            <Title titlePage="Login" />
            <FormControl
                fullWidth
                margin="normal"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Username"
                            type="input"
                            color="primary"
                            fullWidth
                            onKeyUp={validateForm}
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
                            onKeyUp={validateForm}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={loginRequest}
                            disabled={validForm === false}
                        >
                            Accedi alla piattaforma
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MenuAuth /> 
                    </Grid>

                </Grid>

            </FormControl>
        </>
    )
}

export default Login