import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Grid, Button, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import "./styles.scss";
import { RECOVERY_PASSWORD_REQUEST } from "@redux/actions";
import validation from "@validator";
import recoveryPasswordSchema from "@validator/recoveryPassword";

const RecoveryPassword = () => {

    const [ email, setEmail ] = useState("");
    const [ validForm, setValidForm ] = useState(false);

    const dispatch = useDispatch();

    const recoveryPasswordRequest = () => {
        dispatch({
            type: RECOVERY_PASSWORD_REQUEST,
            payload: {
                email
            }
        });
    };

    const validateForm = () => {
        const payload = { email };
        const result = validation(recoveryPasswordSchema, payload);
        const valid = !result.error;
        setValidForm(valid)
    }

    return (
        <FormControl
            fullWidth
            margin="normal"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="email"
                        type="input"
                        onKeyUp={validateForm}
                        color="primary"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled={validForm === false}
                        onClick={recoveryPasswordRequest}
                    >
                        Recupera password
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="primary"
                        className="hypertext"
                    >
                        <Link to="/signUp">Registra un nuovo account</Link>   
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="primary"
                        className="hypertext"
                    >
                        <Link to="/login">Accedi alla piattaforma</Link>   
                    </Typography>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default RecoveryPassword