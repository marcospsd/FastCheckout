import React, {useState} from 'react'
import { Tittle, Helper, Container } from './styles'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material'
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputMask from 'react-input-mask';
import AlertText from '../Alerts'
import {api} from '../../services/api'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material'


const schema = yup.object({
    tipouser: yup.string().required("Tipo de Usuario não informada"),
    codvend: yup.string().required("Código do vendedor não informada")
})


const EditUser = ({ open, setOpen, mutate, dadosuser }) => {
    
    const { control, handleSubmit ,formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: dadosuser
    })

    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    
    const Atualizar = (data) => {
        api.patch(`/auth/attuser/${dadosuser.id}/`, data)
        .then((res) => {
            mutate()
            setOpen(!open)
            setAlert({...alert, open: true, texto: "Alterado com Sucesso !", tipoalert: "success"})
        }).catch((err) => {
            setAlert({...alert, open:true, texto: JSON.stringify(err.response.data), tipoalert: "warning"})
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
            <Tittle>
                Criar Usuário
            </Tittle>
            <IconButton id="close" onClick={() => setOpen(!open)}><CloseIcon/></IconButton>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})}/>
            <Container className="form" onSubmit={handleSubmit(Atualizar)}>
                    <TextField fullWidth label="Usuario" autoComplete='off' variant="outlined" type="text" name="username" id="username" value={dadosuser.username}
                            size="small"
                            disabled /> <br/>
                    <TextField fullWidth label="Senha" autoComplete='off' variant="outlined" type="text" name="Nome Completo" id="first_name" value={dadosuser.first_name}
                            size="small"
                            disabled
                            /> <br/>
                    <Controller
                            name="codvend"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <InputMask
                                mask="999999"
                                onChange={onChange}
                                value={value}
                                maskChar=" "
                                name="telefone"
                                >{ () => <TextField
                                    id="text-field-telefone" 
                                    label="Codigo do Vendedor" 
                                    variant="outlined"
                                    autoComplete='off'
                                    name="telefone"   
                                    type="tel"     
                                    size="small" 
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                        ),
                                    }}     
                                    /> }
                            </InputMask> )}/> { errors.codvend ? <Helper>{errors.codvend.message}</Helper> : null} <br/>
                    <Controller
                            name="tipouser"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth>
                                <InputLabel id="forma1">Forma de Pagamento</InputLabel>
                                <Select
                                size="small"
                                labelId="forma1"
                                id="demo-simple-select"
                                value={value ? value : "V"}
                                onChange={onChange}
                                label="Forma de Pagamento"
                                >
                                    <MenuItem value="V">Vendedor</MenuItem>
                                    <MenuItem value="C">Caixa</MenuItem>
                                    <MenuItem value="E">Estoque</MenuItem>
                                    <MenuItem value="A">Administrador</MenuItem>
                                </Select>
                            </FormControl>)}/> { errors.tipouser ? <Helper>{errors.tipouser.message}</Helper> : null} <br/>
                    <Button onClick={handleSubmit((data) => Atualizar(data))}>Atualizar</Button>
            </Container>
            </Box>
        </Modal>


        )
}

export default EditUser