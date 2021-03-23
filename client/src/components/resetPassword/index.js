import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Grid, Button } from '@material-ui/core';
import "./styles.scss";

import { RESET_PASSWORD_REQUEST } from "../../redux/actions";

const ResetPassword = () => {

    const [ email, setEmail ] = useState("");

    const dispatch = useDispatch();

    const resetPasswordRequest = () => {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
            payload: {
                email
            }
        });
    };

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