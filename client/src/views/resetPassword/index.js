import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Grid, Button } from '@material-ui/core';
import "./styles.scss";
import MenuAuth from "@components/menuAuth";
import { CHANGE_PASSWORD_REQUEST } from "@redux/actions";
import validation from "@validator";
import resetPasswordSchema from "@validator/resetPassword";
import Title from "@components/title";

const ResetPassword = () => {

    const [ email, setEmail ] = useState("");
    const [ validForm, setValidForm ] = useState(false);

    const dispatch = useDispatch();

    const resetPasswordRequest = () => {
        dispatch({
            type: CHANGE_PASSWORD_REQUEST,
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
        <>
            <Title titlePage="Recupera la password" />
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
                    <Grid item xs={12} sm={12} md={6}>
                        <MenuAuth />
                    </Grid>
                </Grid>

            </FormControl>
        </>
    )
}

export default ResetPassword