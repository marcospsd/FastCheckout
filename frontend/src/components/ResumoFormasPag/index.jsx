import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import {useAxios} from '../../services/api'
import { NameForma, ValorDinheiro } from '../Functions/functions'
import {Bloco, Container, Coluna} from './styles'
import PrintIcon from '@mui/icons-material/Print';
import FechamentoCaixa from '../../reports/fechamento'
import { AuthContext } from '../../contexts/auth'

const ResumoFormasPag = () => {
    const {user} = useContext(AuthContext)
    const { data, mutate} = useAxios("/vendas/resumocondpag/")

    const Print = () => {
        FechamentoCaixa(data, user)
    }

    return (
        <Container>
            <IconButton id="iconprint" onClick={() => Print()}><PrintIcon sx={{ color: '#fff' }}/></IconButton>
            <p><b>Formas de Pagamento</b></p>
            <br/>
            <Coluna>
            { data ? data.map((res) => (
                <Bloco key={res.id}>
                    <p>{NameForma(res.forma)}</p>
                    <p>{ValorDinheiro(res.total)}</p>
                </Bloco>
            )): null}
            </Coluna>
            <br/>
        </Container>
    )
}

export default ResumoFormasPag;