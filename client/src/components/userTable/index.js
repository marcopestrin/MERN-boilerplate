import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import {
    ExploreOff,
    Edit,
    Check,
    Close
} from "@material-ui/icons";
import "./styles.scss";
import DisableUser from "./disableUser";
import EditUser from "./editUser";

const UserTable = ({
    users
}) => {

    const [ disableUserModal, setDisableUserModal ] = useState(false);
    const [ editUserModal, setEditUserModal ] = useState(false);

    const disableUser = () => {
        setDisableUserModal(true);
    };
    const editUser = () => {
        setEditUserModal(true);
    };

    const closeModal = () => {
        setDisableUserModal(false);
        setEditUserModal(false);
    };

    const confirmDisable = () => {
        console.log("disable!");
        setDisableUserModal(false);
    }

    const confirmEdit = () => {
        console.log("edit!");
        setEditUserModal(false);
    }

    return (
        <TableContainer>
            { users && (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Ruolo</TableCell>
                                <TableCell>Attivo</TableCell>
                                <TableCell>Data di registrazione</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { users.map(({
                                email,
                                active,
                                role,
                                username,
                                timeRegistration
                            }, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{ username }</TableCell>
                                        <TableCell>{ email }</TableCell>
                                        <TableCell>{ role === 1 ? "Admin" : "User" }</TableCell>
                                        <TableCell>
                                            { active ? <Check className="iconTrue" /> : <Close className="iconFalse" /> }
                                        </TableCell>
                                        <TableCell>{ timeRegistration }</TableCell>
                                        <TableCell className="optionCell">
                                            <Tooltip title="Disabilita Utente">
                                                <ExploreOff
                                                    onClick={disableUser}
                                                    className="icon"
                                                />
                                            </Tooltip>
                                            <Tooltip title="Modifica Utente">
                                                <Edit
                                                    onClick={editUser}
                                                    className="icon"
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <DisableUser
                        confirmDisable={confirmDisable}
                        open={disableUserModal}
                        handleClose={closeModal}
                    />

                    <EditUser
                        confirmEdit={confirmEdit}
                        open={editUserModal}
                        handleClose={closeModal}
                    />
                </>
            )}
        </TableContainer>
    )
}

export default UserTable;