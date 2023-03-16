import React from 'react'
import { useAxios } from '../../services/api'
import { Container } from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ValorDinheiro } from '../Functions/functions';

const ListTopProducts = ({ date, }) => {
    const { data, mutate } = useAxios('/vendas/resumoprodutos/')
        
    if (!data) {
        return <p>Carregando ...</p>
    }

    const NewData = data.filter((x) => x.data == date)

    if (!NewData) {
        return <p>Carregando ...</p>
    }

    return (
            <TableContainer component={Paper} sx={{ width: '90%', marginBottom: 3}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Grupo</TableCell>
                        <TableCell align="right">Qtd Vendida</TableCell>
                        <TableCell align="right">Total Vendido</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {NewData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.Grupo}
                            </TableCell>
                            <TableCell align="right">{row.qtd_vendido}</TableCell>
                            <TableCell align="right">{ValorDinheiro(row.total)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default ListTopProducts