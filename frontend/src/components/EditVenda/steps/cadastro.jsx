import React, {useState} from 'react'
import { ContainerCreate, Coluna } from '../styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';
import { api } from '../../../services/api';
import { cpf as CPFValidated } from 'cpf-cnpj-validator';
import AlertText from '../../Alerts'




const CadastroStep = ({ step, setStep, setData, data }) => {
    const [alert, setAlert] = useState({ open: false, texto: "", tipoalert: "error" })
    const [cpf, setCpf] = useState(data.cpf)
    const [nome, setNome] = useState(data.dadoscliente.nome)
    const [telefone, setTelefone] = useState(data.dadoscliente.telefone)
    const [email, setEmail] = useState(data.dadoscliente.email)
    const [userbanco, setUserBanco] = useState(data.cpf ? true : false)
    const [blockbutton, setBlockButton] = useState(false)
    const state = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email
    }


    const BuscarCPF = () => {
            if ( cpf.length !== 11) {
                return setAlert({...alert, open: true, texto: "CPF Incompleto, favor verificar"})
            } else {
                api.get(`/cliente/cliente/${cpf}/`)
                .then((res) => {
                    setNome(res.data.nome)
                    setEmail(res.data.email)
                    setTelefone(res.data.telefone)
                    setUserBanco(true)
                
                })
                .catch((error) => {
                    setUserBanco(false)
                    return;
                })
            }
    
        }


    return (
        <ContainerCreate>
                <AlertText data={alert} close={() => setAlert({...alert, open: !alert})} />
                <h1>Cadastro Cliente</h1>

                <InputMask
                    mask="999.999.999-99"
                    onBlur={() => {
                        if (CPFValidated.isValid(cpf) == false) return setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"})
                        else return BuscarCPF()
                    }}
                    onChange={(e) => setCpf((e.target.value).replace(/[^0-9]/g, ''))}
                    value={cpf}
                    maskChar=" "
                    name="cpf"
                    >
                    { () => <TextField
                                id="text-field-cpf" 
                                label="CPF" 
                                variant="outlined"
                                autoComplete='off'
                                name="cpf"
                                type="tel"
                                required
                            
                                /> }
                </InputMask>
                <TextField
                    id="text-field-cpf" 
                    label="Nome Completo" 
                    name="nome"
                    variant="outlined"
                    autoComplete='off'
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                    required
                />

                <TextField 
                    id="text-field-email" 
                    label="E-Mail" 
                    variant="outlined"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete='off'
                    value={email}
                />  

                <InputMask
                    mask="(99) 99999-9999"
                    onChange={ (e) => setTelefone((e.target.value).replace(/[^0-9]/g, '')) }
                    value={telefone}
                    maskChar=" "
                    name="telefone"
                    >
                    { () => <TextField
                                id="text-field-telefone" 
                                label="Telefone" 
                                variant="outlined"
                                autoComplete='off'
                                name="telefone"   
                                type="tel"           
                                /> }
                </InputMask>
                <br/>
                <Coluna>
                    <Button
                    
                    onClick={() => {
                        setBlockButton(true)
                        if( CPFValidated.isValid(cpf) == true){
                                setStep(step+1)
                                setData({...data, cpf: cpf, dadoscliente: {
                                    nome: nome,
                                    telefone: telefone,
                                    email: email,
                                    cpf: cpf
                                }})
                                setUserBanco(false)
                        } else return setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"}) 
                        setBlockButton(false)
                        
                    }}
                    disabled={blockbutton}>Avançar</Button>
                </Coluna>
        </ContainerCreate>
    )
}

export default CadastroStep;