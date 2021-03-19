import React, { useState } from "react";
import { FormControl, TextField, Grid, Button } from '@material-ui/core';
import "./styles.scss";
const RecoveryPassword = () => {

    const [ email, setEmail ] = useState("");

    const recoveryPasswordRequest = () => {

    };

    return (
        <FormControl
            fullWidth
            margin="normal"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
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
                        onChange={recoveryPasswordRequest}
                    >
                        Recupera password
                    </Button>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default RecoveryPassword