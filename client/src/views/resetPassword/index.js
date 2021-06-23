import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Grid, Button } from '@material-ui/core';
import "./styles.scss";

import { RESET_PASSWORD_REQUEST } from "@redux/actions";
import validation from "@validator";
import resetPasswordSchema from "@validator/resetPassword";

const ResetPassword = () => {

    const [ email, setEmail ] = useState("");
    const [ validForm, setValidForm ] = useState(false);

    const dispatch = useDispatch();

    const resetPasswordRequest = () => {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
            payload: {
                email
            }
        });
    };

    const validateForm = () => {
        const payload = { email };
        const result = validation(resetPasswordSchema, payload);
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
                        onClick={resetPasswordRequest}
                    >
                        Recupera password
                    </Button>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default ResetPassword