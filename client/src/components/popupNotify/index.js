import React, { useState, useEffect, memo } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

import { selectorNotify } from "@redux/selectors";
import { getSeverity } from "./helpers";

const PopupNotify = () => {

    const [ open, setOpen ] = useState(false);
    const [ textMessage, setTextMessage ] = useState(null);
    const [ severity, setSeverity ] = useState(null);
    const notify = useSelector(selectorNotify);

    const handleClose = () => setOpen(false);

    const notifyClosed = () => {
        setOpen(false);
        setTextMessage(null);
        setSeverity(null);
    }

    useEffect(() => {
        const { list } = notify;
        if (Array.isArray(list) && list.length > 0) {
            const lastNotify = list.pop();
            setSeverity(getSeverity(lastNotify.type));
            setTextMessage(lastNotify.message);
            setOpen(true);
        }
    }, [ notify ])

    return (
        <Snackbar
            open={open}
            onExited={notifyClosed}
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
                { textMessage }
            </MuiAlert>
        </Snackbar>
    )
}

export default memo(PopupNotify);