import React from "react";
import { Typography } from "@material-ui/core";
import "./styles.scss";

const Title = ({ titlePage }) => {

    return (
        <Typography
            color="primary"
            display="block"
            variant="h5"
            className="titlePage"
        >
            { titlePage }
        </Typography>
    )
}

export default Title