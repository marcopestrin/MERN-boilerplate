import React, { useState, useEffect, useContext } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    TextField,
    Switch,
    FormControlLabel
} from "@material-ui/core";

import validation from "@validator";
import editUserSchema from "@validator/editUser";
import { ModalContext } from "./index";

const EditUser = ({ data, root }) => {

    const { closeModal, editUserModal, confirmEdit } = useContext(ModalContext);
    const [ changePasswordEnabled, setChangePasswordEnabled ] = useState(false);
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");
    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ admin, setAdmin ] = useState(false);
    const [ validForm, setValidForm ] = useState(false);

    useEffect(() => {
        // validation form 
        const payload = {
            username,
            email,
            admin,
            changePasswordEnabled,
            currentPassword,
            password,
            repeatPassword
        };
        const result = validation(editUserSchema, payload);
        const valid = !result.error;
        setValidForm(valid);
        // validation form
    }, [ username, email, admin, changePasswordEnabled, currentPassword, password, repeatPassword ]);

    const save = () => {
        const payload = {
            email,
            username,
            admin,
            id: data.id,
            ...(password !== "" ? { password, currentPassword } : {})
        };
        confirmEdit(payload);
    };

    const setPreloadData = (data) => {
        if (data.email) {
            setEmail(data.email);
        }
        if (data.username) {
            setUsername(data.username);
        }
        if (data.role) {
            setAdmin(data.role === 1);
        }
    };

    const changeEmail = (event) => setEmail(event.target.value);
    const changeUsername = (event) => setUsername(event.target.value);
    const switchRole = (event) => setAdmin(event.target.checked);
    const changePassword = (event) => setPassword(event.target.value);
    const changeRepeatPassword = (event) => setRepeatPassword(event.target.value);
    const writeCurrentPassword = (event) => setCurrentPassword(event.target.value);
    const enableChangePassword = () => setChangePasswordEnabled(!changePasswordEnabled);

    useEffect(() => setPreloadData(data), [ data ]);

    return (
        <Dialog
            open={editUserModal}
            maxWidth="sm"
            fullWidth
            onClose={closeModal}
        >
            <DialogTitle> Modifica l'utente </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    onChange={changeUsername}
                                    value={username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    onChange={changeEmail}
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Permessi da amministratore"
                                    control={
                                        <Switch
                                            checked={admin}
                                            disabled={!root}
                                            onChange={switchRole}
                                            color="primary"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Cambia password utente"
                                    control={
                                        <Switch
                                            disabled={false}
                                            checked={changePasswordEnabled}
                                            onChange={enableChangePassword}
                                            color="primary"
                                        />
                                    }
                                />
                            </Grid>
                            { changePasswordEnabled &&
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="La tua password"
                                            onChange={writeCurrentPassword}
                                            value={currentPassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="Nuova Password"
                                            onChange={changePassword}
                                            value={password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="Ripeti nuova password"
                                            onChange={changeRepeatPassword}
                                            value={repeatPassword}
                                        />
                                    </Grid>
                                </>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={closeModal}
                                variant="contained"
                            >Annulla</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={save}
                                variant="contained"
                                color="primary"
                                disabled={validForm === false}
                            >Salva</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
        </Dialog>
    )
}

export default EditUser