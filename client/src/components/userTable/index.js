import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

const UserTable = ({
    users
}) => {

    return (
        <TableContainer>
            { users && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ruolo</TableCell>
                            <TableCell>Attivo</TableCell>
                            <TableCell>Data di registrazione</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { users.map(({
                            email,
                            active,
                            role,
                            username,
                            timeRegistration
                        }) => {
                            return (
                                <TableRow>
                                    <TableCell>{ username }</TableCell>
                                    <TableCell>{ email }</TableCell>
                                    <TableCell>{ role === 1 ? "Admin" : "User" }</TableCell>
                                    <TableCell>{ active ? "si" : "no" }</TableCell>
                                    <TableCell>{ timeRegistration }</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    )
}

export default UserTable;