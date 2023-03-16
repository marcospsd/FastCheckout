import React, {useState} from 'react'
import { Tittle, Helper, Container } from './styles'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material'
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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


const schema = yup.object({
    username: yup.string().required("Usuário não informado"),
    first_name: yup.string().required("Nome do Vendedor não informada"),
    password: yup.string().required("Senha não informada"),
    tipouser: yup.string().required("Tipo de Usuario não informada"),
    codvend: yup.string().required("Código do vendedor não informada")
})


const CreateUser = ({ open, setOpen, mutate }) => {
    const { control, handleSubmit ,formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "", password: "", tipouser: "V", codvend: "", first_name: ""
        }
    })
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    const [blockbutton, setBlockButton] = useState(false)
    
    const Criar = (data) => {
        setBlockButton(true)
        api.post(`/auth/user/`, data)
        .then((res) => {
            mutate()
            setOpen(!open)
            setAlert({...alert, open: true, texto: "Cadastrado com Sucesso !", tipoalert: "success"})
            setBlockButton(false)
        }).catch((err) => {
            setAlert({...alert, open:true, texto: JSON.stringify(err.response.data), tipoalert: "warning"})
            setBlockButton(false)
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
                Criar Usuário
            </Tittle>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})}/>
            <Container className="form" onSubmit={handleSubmit(Criar)}>
                    <Controller
                            name="username"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Usuario" autoComplete='off' variant="outlined" type="text" name="username" id="username" value={value} onChange={onChange}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.username ? <Helper>{errors.username.message}</Helper> : null} <br/>
                    <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Senha" autoComplete='off' variant="outlined" type="text" name="password" id="password" value={value} onChange={onChange}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.password ? <Helper>{errors.password.message}</Helper> : null} <br/>

                    <Controller
                            name="first_name"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Nome do Vendedor" autoComplete='off' variant="outlined" type="text" name="first_name" id="first_name" value={value} onChange={onChange}
                                size="small"        
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}/>)}/> { errors.first_name ? <Helper>{errors.first_name.message}</Helper> : null} <br/>
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
                    <Button onClick={handleSubmit((data) => Criar(data))} disabled={blockbutton}>Enviar</Button>
            </Container>
            </Box>
        </Modal>


        )
}

export default CreateUser