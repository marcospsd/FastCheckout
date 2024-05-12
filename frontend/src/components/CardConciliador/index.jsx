import { IconButton } from '@mui/material';
import React from 'react'
import { CardConteiner, StatusCard } from './styles'
import FeedIcon from '@mui/icons-material/Feed';
import InputAdornment from '@mui/material/InputAdornment';
import { CPFReplace, ValorDinheiro } from '../Functions/functions'


const CardConciliador = ({data, optionsModal, setDatamodal }) => {

    const open = () => {
        setDatamodal(data)
        optionsModal(true)
        
    }
    const color = () => {
        if (data.nsu && data.img) {
            return "green"
        }
        if (!data.nsu && !data.img) {
            return "red"
        }
        if ((!data.nsu && data.img) || (data.nsu && !data.img)) {
            return "gold"
        }
    }

    const nameStatus = () => {
        if (data.nsu && data.img) {
            return "Conciliado"
        }
        if (!data.nsu && !data.img ) {
            return "Não Conciliado"
        }
        if (!data.nsu && data.img || data.nsu && !data.img) {
            return "Parcialmente"
        }
    }
    return (
        <CardConteiner color='whitesmoke' onClick={() => open()}>
            <InputAdornment id="edititem">
                <FeedIcon id="feedicon"/>
            </InputAdornment>
            <div className="row">
                <div className="col" id='valor'>
                <label><strong>Ordem: </strong>{data.key}</label>
                    </div>
                <div className="col" id='status'>
                    <label><strong>ID:</strong>{data.id}</label>
                </div>
            </div>
            <div className="row">
                <div className="col" id='valor'>
                <label><strong>Valor: </strong>{ValorDinheiro(data.valor)}</label>
                    </div>
                <div className="col" id='status'>
                    <label><strong>Status: <StatusCard color={color()}>{nameStatus()}</StatusCard></strong></label>
                </div>
            </div>
        </CardConteiner>
    )
}

export default CardConciliador;