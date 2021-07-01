import React, { useContext } from "react";
import { ModalContext } from "./index";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Grid
} from "@material-ui/core";

const DisableUser = ({ confirmDisable }) => {

    const { closeModal, disableUserModal } = useContext(ModalContext);

    return (
        <Dialog
            open={disableUserModal}
            maxWidth="sm"
            fullWidth
            onClose={closeModal}
        >
            <DialogTitle>
                Sei sicuro di voler disattivare l'utente?
            </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
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
                                    onClick={confirmDisable}
                                    variant="contained"
                                    color="primary"
                                >Conferma</Button>
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
        </Dialog>
    )
}

export default DisableUser