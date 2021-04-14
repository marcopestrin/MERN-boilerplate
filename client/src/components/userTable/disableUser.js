import React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Grid
} from "@material-ui/core";

const DisableUser = ({
    open,
    handleClose,
    confirmDisable
}) => {

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
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
                                    onClick={handleClose}
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