import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { EDIT_USER_REQUEST } from "@redux/actions"

const UserTable = ({ users }) => {

    const [ disableUserModal, setDisableUserModal ] = useState(false);
    const [ editUserModal, setEditUserModal ] = useState(false);
    const [ userRef, setUserRef ] = useState({});

    const dispatch = useDispatch();

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const isAdmin = role === "ADMIN";

    const disableUser = () => {
        setDisableUserModal(true);
    };
    
    const editUser = (user) => {
        setUserRef(user);
        setEditUserModal(true);
    };

    const closeModal = () => {
        setDisableUserModal(false);
        setEditUserModal(false);
        setUserRef({});
    };

    const confirmDisable = () => {
        setDisableUserModal(false);
        closeModal();
    }

    const confirmEdit = (payload) => {
        dispatch({
            type: EDIT_USER_REQUEST,
            payload: {
                ...payload,
                userId
            }
            
        });
        setEditUserModal(false);
        closeModal();
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
                            { users.map((user, index) => {
                                const { email, active, role, username, timeRegistration, id } = user;
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
                                            { isAdmin &&
                                                <Tooltip title="Disabilita Utente">
                                                    <ExploreOff
                                                        onClick={disableUser}
                                                        className="icon"
                                                    />
                                                </Tooltip>
                                            }
                                            {(isAdmin || (userId === id)) &&
                                                <Tooltip title="Modifica Utente">
                                                    <Edit
                                                        onClick={() => editUser(user)}
                                                        className="icon"
                                                    />
                                                </Tooltip>
                                            }
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
                        root={isAdmin}
                        data={userRef}
                        handleClose={closeModal}
                    />
                </>
            )}
        </TableContainer>
    )
}

export default UserTable;