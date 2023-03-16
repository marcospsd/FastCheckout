import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import EditUser from '../EditUser';


const ListUsers = ({ data, setEditUser, edituser ,mutate}) => {
    const [dataedituser, setDataEditUser] = useState({})

    return (
        <TableContainer component={Paper} sx={{ width: '90%', marginBottom: 3}}>
            { edituser ? <EditUser dadosuser={dataedituser} setDadosUser={setDataEditUser} open={edituser} setOpen={setEditUser} mutate={mutate}/> : null}
        <Table size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Codigo</TableCell>
                <TableCell align="right"> </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{row.tipouser}</TableCell>
                    <TableCell align="right">{row.codvend}</TableCell>
                    <TableCell align="right"><IconButton size="small" onClick={() => { 
                        setDataEditUser(row)
                        setEditUser(!edituser)
                        }}><EditIcon/></IconButton></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>

    )
}

export default ListUsers