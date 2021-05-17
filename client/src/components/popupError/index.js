import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

import { selectorErrors } from "@redux/selectors";

const PopupError = () => {

    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState([]);
    const errors = useSelector(selectorErrors);

    const handleClose = () => setOpen(false);

    const getMessages = () => message.map(message => message);

    useEffect(() => {
        if (Array.isArray(errors) && errors.length > 0) {
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
                severity="error"
            >
                { getMessages()}
            </MuiAlert>
        </Snackbar>
    )
}

export default PopupError;