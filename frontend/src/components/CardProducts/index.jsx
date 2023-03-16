import React from 'react'
import { Container, Row, Column, DeleteButton } from './styles'
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CardProducts = ({ data, DeleteCard  }) => {


    return (
        <Container>
            <DeleteButton>
                <IconButton onClick={() => DeleteCard(data.id)}>
                    <DeleteIcon/>
                </IconButton>
            </DeleteButton>
            <Column>
                <p><b>Codigo:</b></p>

                <p>{data.codpro}</p>
            </Column>
            <Column>
                <p><b>Descrição:</b></p>

                <p>{data.descripro}</p>
            </Column>
            <Column>            
                <Row>
                    <p><b>Valor:</b></p>

                    <p>{data.valor_unitpro}</p>
                </Row>
                <Row>
                    <p><b>Desconto:</b></p>

                    <p>{Math.round(((data.valor_unitpro / data.valor_unitsis) - 1) * -100)} %</p>
                </Row>
            </Column>
        </Container>
    )
}

export default CardProducts