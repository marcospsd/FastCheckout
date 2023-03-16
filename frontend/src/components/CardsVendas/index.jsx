import { IconButton } from '@mui/material';
import React from 'react'
import { CardConteiner, StatusCard } from './styles'
import FeedIcon from '@mui/icons-material/Feed';
import InputAdornment from '@mui/material/InputAdornment';
import { CPFReplace, ValorDinheiro } from '../Functions/functions'


const CardVenda = ({data, optionsModal, setDatamodal }) => {
   
    const open = () => {
        setDatamodal(data)
        optionsModal(true)
        
    }

    return (
        <CardConteiner color='whitesmoke' onClick={() => open()}>
            <InputAdornment id="edititem">
                <FeedIcon id="feedicon"/>
            </InputAdornment>
            <p><strong>Ordem: </strong>{data.ordem}</p>
            <p><strong>CPF: </strong>{CPFReplace(data.cpf)}</p>
            <p><strong>Nome: </strong>{data.dadoscliente.nome}</p>
            <div className="row">
                <div className="col" id='valor'>
                <label><strong>Valor: </strong>{ValorDinheiro(data.total_venda)}</label>
                    </div>
                <div className="col" id='status'>
                    <label><strong>Status: <StatusCard color={data.status == "P" ? 'red' : 'green'}>{data.status == 'P' ? 'Pendente' : 'Finalizado'}</StatusCard></strong></label>
                </div>
            </div>
        </CardConteiner>
    )
}

export default CardVenda;