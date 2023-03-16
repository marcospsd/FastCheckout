import React, {useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { api } from '../../services/api'
import QrReader from 'modern-react-qr-reader'
import { Relative } from './styles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const LeitorBarCode = ({openvideo, setOpenVideo, setDescriPro, setCodPro, setValorPro, setValorSis}) => {

    const Aplicar = (pesquisa) => {
        if (pesquisa) {
            api.get(`/produtos/produto/${pesquisa}/`)
            .then((res) => {
                    setCodPro(res.data.codigo)
                    setDescriPro(res.data.descricao)
                    setValorPro(res.data.valor_unitpro)
                    setValorSis(res.data.valor_unitsis) 
                    setOpenVideo(false)})
            .catch((err) => {
                window.alert("Produto não encontrado.")
            })
    }
    }


    return (
        <Modal
        open={openvideo}
        onClose={() => setOpenVideo(!openvideo)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-video-itens'
            >
            <Relative>
                <IconButton onClick={() => setOpenVideo(!openvideo)}>
                    <CloseIcon/>
                </IconButton>
            </Relative>
            <br/>
            <QrReader
                facingMode={"environment"}
                onScan={(result) => {
                    if (result) return Aplicar(result);                 
                }}
                resolution={600}
                />
            </Box>
        </Modal>    
        
    
    )
}

export default LeitorBarCode;