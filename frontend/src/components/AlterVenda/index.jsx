import React, {useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Container, Tittle, Coluna, Card} from './styles'
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField } from '@mui/material'
import { api } from '../../services/api';
import AlertText from '../Alerts';
import Autocomplete from '@mui/material/Autocomplete';


const AlterVenda = ({ open, setOpen, users, }) => {
    const [ dadosvenda, setDadosVendas] = useState(null)
    const [ alert, setAlert ] = useState({open: false, texto: "", tipoalert: "warning"})
    const [ ordem, setOrdem ] = useState("")
    const [ newvend, setNewVend] = useState("")

    const BuscarProduct = () => {
        api.get(`/vendas/vendafinalizada/${ordem}/`)
        .then((res) => {
            setDadosVendas(res.data)
        })
        .catch((err) => {
            setAlert({...alert, open: true, texto: 'Ordem não localizada'})
            setDadosVendas(null)
        })
    }

    const Atualizar = () => {
        api.patch(`/vendas/patchvenda/${ordem}/`, { vendedor: newvend})
        .then((res) => {
            setAlert({...alert, open: true, texto: "Alterado com sucesso !", tipoalert: 'success'})
            BuscarProduct()
        })
        .catch((err) => {
            setAlert({...alert, open: true, texto: JSON.stringify(err.result.data), tipoalert: 'warning'})
        })
    }

    
    return (
        <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-create-venda'
                sx={{ position: 'relative'}}
            >
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})}/>
            <IconButton id="close" onClick={() => setOpen(!open)}><CloseIcon/></IconButton>
            <Container>
                <Tittle>Alterar Vendedor de uma Venda</Tittle>
                <br/>
                <Coluna>
                    <TextField variant="outlined" label="Número da Ordem" size="small" value={ordem} onChange={(e) => setOrdem(e.target.value)}/>
                    <br/>
                    <Button sx={{ color: '#c52f33' }} onClick={() => BuscarProduct()}>Procurar</Button>              
                </Coluna>
                <br/>
                { dadosvenda ? 
                    <>
                        <Card>
                            <p><b>Ordem: </b>{dadosvenda.ordem}</p>
                            <p><b>Nome: </b>{dadosvenda.dadoscliente.nome}</p>
                            <p><b>CPF: </b>{dadosvenda.cpf}</p>
                            <p><b>Valor Total: </b>{dadosvenda.total_venda}</p>
                            <p><b>Vendedor Atual: </b>{dadosvenda.vendedorname.first_name} || {dadosvenda.vendedorname.codvend}</p>
                        </Card>
                        <br/>
                        <Coluna>
                            <Autocomplete
                                sx={{ width : '60%'}}
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                getOptionLabel={(resultados) => `${resultados.first_name} - ${resultados.codvend}`}
                                onChange = {(resultado, newResultado) => {
                                    if (newResultado) {
                                        setNewVend(newResultado.id)
                                    }
                                }}
                                options={users}
                                renderInput={(params) => <TextField {...params} label="Pesquise o Novo Usuario"/>}
                                />
                            <Button sx={{ color: '#c52f33' }} onClick={() => Atualizar()}>Atualizar</Button>
                        </Coluna>
                    
                    </>
                    : null}
                    <br/>
            </Container>
            </Box>
        </Modal>
    )
}

export default AlterVenda;