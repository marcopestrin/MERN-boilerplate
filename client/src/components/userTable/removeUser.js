import React, { useContext } from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Grid
} from "@material-ui/core";
import { ModalContext } from "./index";

const RemoveUser = ({ confirmDelete }) => {

    const { closeModal, removeUserModal } = useContext(ModalContext);

    return (
        <Dialog
            open={removeUserModal}
            maxWidth="sm"
            fullWidth
            onClose={closeModal}
        >
            <DialogTitle>
                Sei sicuro di voler eliminare definitivamente l'utente?
            </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    onClick={closeModal}
                                    variant="contained"
                                >Mantieni</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    onClick={confirmDelete}
                                    variant="contained"
                                    color="primary"
                                >Elimina</Button>
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
        </Dialog>


    )
}

export default RemoveUser