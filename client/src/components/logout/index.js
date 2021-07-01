import React from "react";
import { useDispatch } from "react-redux";
import { FormControl, Grid, Button } from "@material-ui/core";
import { LOGOUT_REQUEST } from "@redux/actions";
import "./styles.scss";

const Logout = () => {

    const dispatch = useDispatch();

    const logoutRequest = () => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    };

    return (
        <FormControl
            fullWidth
            margin="normal"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={logoutRequest}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default Logout