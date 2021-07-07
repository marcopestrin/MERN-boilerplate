import React, { useState } from "react";
import { FormControl, TextField, Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import validation from "@validator";
import recoveryPasswordSchema from "@validator/recoveryPassword";
import { RECOVERY_PASSWORD_REQUEST } from "@redux/actions";

const RecoveryPassword = () => {

    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword] = useState("");
    const [ validForm, setValidForm ] = useState(false);
    const { id, resetToken, username } = useParams();
    const dispatch = useDispatch();

    const confirmNewPassword = () => {
        dispatch({
            type: RECOVERY_PASSWORD_REQUEST,
            payload: {
                resetToken,
                password
            }
        });
    };

    const validateForm = () => {
        const payload = { password, repeatPassword };
        const result = validation(recoveryPasswordSchema, payload);
        const valid = !result.error;
        setValidForm(valid);
    };
    
    return (
        <FormControl
            fullWidth
            margin="normal"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>{username}</Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Inserisci la nuova password"
                        type="password"
                        onKeyUp={validateForm}
                        color="primary"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        label="Ripeti la nuova password"
                        type="password"
                        color="primary"
                        onKeyUp={validateForm}
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
                        onClick={confirmNewPassword}
                        disabled={validForm === false}
                    >
                        Conferma la nuova password
                    </Button>
                </Grid>

            </Grid>

        </FormControl>
    )
}


export default RecoveryPassword