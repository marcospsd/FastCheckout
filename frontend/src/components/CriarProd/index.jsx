import React, {useEffect, useState} from 'react'
import { Tittle, Helper, Container, Row } from './styles'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material'
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlertText from '../Alerts'
import {api} from '../../services/api'
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';

const schema = yup.object({
    codigo: yup.string().required("Código do produto obrigatório"),
    descricao: yup.string().required("Descrição do produto não informado"),
    grupo: yup.string().required("Grupo não informado"),
    valor_unitsis: yup.number().required("Valor do sistema não informado"),
    valor_unitpro: yup.number().required("Valor promocional não informado"),
    reposicao: yup.boolean()
})

const ValoresDefault = {
    codigo: '', descricao: '', valor_unitpro: '', valor_unitsis: '', grupo: '', reposicao: false
}

const CreateProd = ({ open, setOpen }) => {
    const { control, handleSubmit , reset ,formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: ValoresDefault
    })
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    const [blockbutton, setBlockButton] = useState(false)
    
    const Criar = (data) => {
        setBlockButton(true)
        api.post(`/produtos/produto/`, data)
        .then((res) => {
            setAlert({...alert, open: true, texto: "Cadastrado com Sucesso !", tipoalert: "success"})
            reset()
        }).catch((err) => {
            setAlert({...alert, open:true, texto: JSON.stringify(err.response.data), tipoalert: "warning"})
        }).finally((res) => {
            setBlockButton(false)

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
            <IconButton id="close" onClick={() => setOpen(!open)}><CloseIcon/></IconButton>
            <Tittle>
                Criar Produto
            </Tittle>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})}/>
            <Container className="form" onSubmit={handleSubmit(Criar)}>
                    <Controller
                            name="codigo"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Código" autoComplete='off' variant="outlined" type="text" name="codigo" id="codigo" value={value} onChange={onChange}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.codigo ? <Helper>{errors.codigo.message}</Helper> : null} <br/>
                    <Controller
                            name="descricao"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Descrição" autoComplete='off' variant="outlined" type="text" name="descricao" id="descricao" value={value} onChange={onChange}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.descricao ? <Helper>{errors.descricao.message}</Helper> : null} <br/>
                    <Controller
                            name="grupo"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Grupo" autoComplete='off' variant="outlined" type="text" name="grupo" id="grupo" value={value} onChange={onChange}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.grupo ? <Helper>{errors.grupo.message}</Helper> : null} <br/>
                    <Row>

                        <Controller
                                name="valor_unitsis"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                            <TextField fullWidth label="Valor do Sistema" autoComplete='off' variant="outlined" type="number" name="valor_unitsis" id="valor_unitsis" value={value} onChange={onChange}
                                    size="small"        
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <label>R$</label>
                                        </InputAdornment>
                                        ),
                                    }}/>)}/> { errors.valor_unitsis ? <Helper>{errors.valor_unitsis.message}</Helper> : null} <br/>
                        
                        <Controller
                                name="valor_unitpro"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                            <TextField fullWidth label="Valor Promoção" autoComplete='off' variant="outlined" type="number" name="valor_unitpro" id="valor_unitpro" value={value} onChange={onChange}
                                    size="small"        
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <label>R$</label>
                                        </InputAdornment>
                                        ),
                                    }}/>)}/> { errors.valor_unitpro ? <Helper>{errors.valor_unitpro.message}</Helper> : null} <br/>
                    </Row>
                    <Row>
                        <label><b>Reposição: </b></label>
                        <label>Não</label>
                        <Controller
                                    name="reposicao"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Switch checked={value} onChange={onChange}/>
                                            
                                        )}/>

                        <label>Sim</label>
                    </Row><br/>
                    <Button onClick={handleSubmit((data) => Criar(data))} disabled={blockbutton} sx={{ color: '#c52f33'}}>Criar</Button>
            </Container>
            </Box>
        </Modal>


        )
}

export default CreateProd;