import React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Grid
} from "@material-ui/core";

const EditUser = ({
    open,
    handleClose,
    confirmEdit
}) => {

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
        >
            <DialogTitle>
                Modifica l'utente
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
                                    onClick={confirmEdit}
                                    variant="contained"
                                    color="primary"
                                >Salva</Button>
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
        </Dialog>


    )
}

export default EditUser