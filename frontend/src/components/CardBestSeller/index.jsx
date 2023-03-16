import React from 'react';
import { CardCont } from './styles';
import { api } from '../../services/api'


const CardBestSeller = ({ data, mutate }) => {

    const Entregar = (id) => {
        if (window.confirm("Deseja realizar a entrega desse produto ?")){
            api.patch(`/produtos/saidaprodutos/${id}/`, { visualizado: !data.visualizado })
            .then((res) => {
                mutate()
            })
            .catch((err) => {
                window.alert("Algo deu errado ...")
            })
            }
        }

    return (
        <CardCont onClick={() => Entregar(data.id)}>
            <p><b>Ordem: </b>{data.venda}</p>
            <p><b>Descrição: </b>{data.descri}</p>
        </CardCont>
    )
}

export default CardBestSeller