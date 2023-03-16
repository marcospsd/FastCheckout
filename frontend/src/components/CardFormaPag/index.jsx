import { IconButton } from '@mui/material'
import React from 'react'
import { Container, Relative, Row } from './styles'
import DeleteIcon from '@mui/icons-material/Delete';
import { NameForma } from '../Functions/functions';

const CardFormaPag = ({ data, DeleteForma}) => {


    return (
        <Container>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Forma Pag.</strong></td>
                        <td><strong>Parc.</strong></td>
                        <td><strong>Valor</strong></td>
                        <td><strong>Delete</strong></td>
                    </tr>
                { data.map((forma) => (
                    <tr key={forma.id}>
                        <td className='formaconteudo' >{NameForma(forma.forma)}</td>
                        <td className='formaconteudo' >{forma.parcelas}</td>
                        <td className='formaconteudo' >{parseInt(forma.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                        <td className='formaconteudo'><IconButton id='delete' onClick={() => DeleteForma(forma.id)}><DeleteIcon/></IconButton></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default CardFormaPag