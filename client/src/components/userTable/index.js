import React, { useState, createContext } from "react";
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
    Explore,
    Edit,
    Check,
    Close,
    DeleteForever
} from "@material-ui/icons";
import "./styles.scss";
import DisableUser from "./disableUser";
import EnableUser from "./enableUser";
import EditUser from "./editUser";
import RemoveUser from "./removeUser";
import {
    EDIT_USER_REQUEST,
    DISABLE_USER_REQUEST,
    ENABLE_USER_REQUEST,
    REMOVE_USER_REQUEST
 } from "@redux/actions"

export const ModalContext = createContext(null);

const UserTable = ({ users }) => {

    const [ disableUserModal, setDisableUserModal ] = useState(false);
    const [ enableUserModal, setEnableUserModal ] = useState(false);
    const [ editUserModal, setEditUserModal ] = useState(false);
    const [ removeUserModal, setRemoveUserModal ] = useState(false);
    const [ userRef, setUserRef ] = useState({});

    const dispatch = useDispatch();

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const isAdmin = role === "ADMIN";

    const disableUser = (user) => {
        setUserRef(user);
        setDisableUserModal(true);
    };

    const enableUser = (user) => {
        setUserRef(user);
        setEnableUserModal(true);
    };

    const removeUser = (user) => {
        setUserRef(user);
        setRemoveUserModal(true)
    };
    
    const editUser = (user) => {
        setUserRef(user);
        setEditUserModal(true);
    };

    const closeModal = () => {
        setDisableUserModal(false);
        setEditUserModal(false);
        setRemoveUserModal(false);
        setEnableUserModal(false);
        setUserRef({});
    };

    const confirmDisable = () => {
        dispatch({
            type: DISABLE_USER_REQUEST,
            payload: userRef
        });
        setDisableUserModal(false);
        closeModal();
    };

    const confirmEnable = () => {
        dispatch({
            type: ENABLE_USER_REQUEST,
            payload: userRef
        });
        setDisableUserModal(false);
        closeModal();
    };

    const confirmDelete = () => {
        dispatch({
            type: REMOVE_USER_REQUEST,
            payload: userRef
        });
        setRemoveUserModal(false);
        closeModal();
    }

    const confirmEdit = (payload) => {
        dispatch({
            type: EDIT_USER_REQUEST,
            payload
        });
        setEditUserModal(false);
        closeModal();
    };

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
                                            { isAdmin && (userId !== id) &&
                                                <>
                                                    { active ?
                                                        <Tooltip title="Disabilita Utente">
                                                            <ExploreOff
                                                                onClick={() => disableUser(id)}
                                                                className="icon"
                                                            />
                                                        </Tooltip>
                                                    :
                                                        <Tooltip title="Abilita Utente">
                                                            <Explore
                                                                className="icon"
                                                                onClick={() => enableUser(id)}
                                                            />
                                                        </Tooltip>
                                                    }
                                                    <Tooltip title="Elimina utente">
                                                        <DeleteForever
                                                            onClick={() => removeUser(id)}
                                                            className="icon"
                                                        />
                                                    </Tooltip>
                                                </>
                                            }
                                            {(isAdmin || (userId === id)) &&
                                                <>
                                                    <Tooltip title="Modifica Utente">
                                                        <Edit
                                                            onClick={() => editUser(user)}
                                                            className="icon"
                                                        />
                                                    </Tooltip>
                                                </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <ModalContext.Provider value={{ confirmDisable, confirmEnable, confirmDelete, confirmEdit, closeModal, disableUserModal, enableUserModal, removeUserModal, editUserModal }}>
                        <DisableUser />
                        <EnableUser />
                        <RemoveUser />
                        <EditUser root={isAdmin} data={userRef} />
                    </ModalContext.Provider>
                </>
            )}
        </TableContainer>
    )
}

export default UserTable;