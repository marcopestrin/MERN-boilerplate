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

const EnableUser = ({ confirmEnable }) => {

    const { closeModal, enableUserModal } = useContext(ModalContext);

    return (
        <Dialog
            open={enableUserModal}
            maxWidth="sm"
            fullWidth
            onClose={closeModal}
        >
            <DialogTitle>
                Sei sicuro di voler attivare l'utente manualmente?
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
                                    onClick={confirmEnable}
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

export default EnableUser