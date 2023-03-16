import React, { useState, useContext } from "react";
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../../contexts/auth'
import { Container, ContainerLogin, Helper } from './styles'
import AlertText from '../../components/Alerts'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoDNZ from '../../assets/logodiniz.png'
import LogoFast from '../../assets/FastCheckout.png'
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Loading from '../../components/Loading'


const schema = yup.object({
    username: yup.string().required("Usuário não informado"),
    password: yup.string().required("Senha não informada")
})


const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const { control, handleSubmit ,formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "", password: ""
        }
    })
    const [viewpass, setViewPass] = useState(false);
    const [blockbutton, setBlockButton] = useState(false)
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    
    const Entrar = async (data) => {
        setBlockButton(true)
        const x = await login(data)
        if (x?.non_field_errors){
            setAlert({
                open: true,
                texto: x.non_field_errors[0],
                tipoalert: 'warning'
            })
            setBlockButton(false)
        } else {
            setAlert({
                open: true,
                texto: JSON.stringify(x),
                tipoalert: 'warning'
            })
        }

        setBlockButton(false)
    };


    return (

        <Container>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open })} />
            <img src={ LogoDNZ } id="imgLogoDNZ"/>
            <form className="form" onSubmit={handleSubmit(Entrar)}>
                <ContainerLogin>
                    <img src={ LogoFast } id="imgLogoDNZ"/><br/>
                    <Controller
                            name="username"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                        <TextField fullWidth label="Usuario" autoComplete='off' variant="outlined" type="text" name="username" id="username" value={value} onChange={onChange}
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
                        <TextField fullWidth label="Senha" autoComplete='off' variant="outlined"  type={viewpass ? 'text' : 'password'} name="password" id="password" value={value} onChange={onChange}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <IconButton onClick={() => setViewPass(!viewpass)}>
                                            {viewpass ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    )
                                    }}/>)}/> { errors.password ? <Helper>{errors.password.message}</Helper> : null} <br/>
                    <Button variant="contained" type="submit" id="entrar" onClick={handleSubmit((data) => Entrar(data))} disabled={blockbutton}>{blockbutton ?  <Loading/> : 'Entrar'}</Button>
                </ContainerLogin>
            </form>
        </Container>
    )
};

export default LoginPage;