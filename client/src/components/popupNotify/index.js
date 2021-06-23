import React, { useState, useEffect, memo } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

import { selectorErrors, selectorAuth } from "@redux/selectors";
import { getSeverity } from "./helpers";

const PopupNotify = () => {

    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState([]);
    const errors = useSelector(selectorErrors);
    const { newUser } = useSelector(selectorAuth);
    const [ severity, setSeverity ] = useState("");

    const handleClose = () => setOpen(false);

    const getSeverityName = (color) => {
        JSON.stringify(setSeverity(getSeverity(color)));
    }

    const getMessages = () => message.map(m => m.message);

    useEffect(() => {
        if (newUser?.success) {
            getSeverityName(1);
            setOpen(true);
            setMessage("Utente creato");
        }
    }, [ newUser ]);

    useEffect(() => {
        if (Array.isArray(errors) && errors.length > 0) {
            getSeverityName(2);
            setOpen(true);
            setMessage(errors);
        } else {
            setOpen(false);
            setMessage([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ errors ]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
                vertical:'top',
                horizontal:'center'
            }}
        >
            <MuiAlert
                onClose={handleClose}
                severity={severity}
            >
                { getMessages()}
            </MuiAlert>
        </Snackbar>
    )
}

export default memo(PopupNotify);