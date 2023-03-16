import React, { useContext, useState } from 'react'
import {ContainerCreate, Bloco, Coluna} from '../styles'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';
import FormControl from '@mui/material/FormControl';
import { AuthContext } from '../../../contexts/auth'
import CardFormPag from '../../CardFormaPag'
import AlertText from '../../Alerts'

const FormpagStep = ({ setStep, step, setData, data}) => {
    const [ alert, setAlert] = useState({open: false, texto: "", tipoalert: 'warning'})
    const { user } = useContext(AuthContext)
    const [ forma, setForma] = useState("DH")
    const [ parcela, setParcela] = useState(1)
    const [ valor, setValor ] = useState(0)
    const [ key, setKey ] = useState(1)
    const quantidadevendas = data.corpovenda ? data.corpovenda.map(x => x).length : 0
    const total_venda = data.corpovenda ? data.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const saldo = data.corpovenda ? (data.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (data.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0


    const AddForma = () => {
        if (valor > 0 ){
            setData({...data, formavenda: [...data.formavenda, {
                forma: forma,
                parcelas: parcela,
                valor: valor,
                id: key
            }]})
            setKey(key+1)
            setForma("DH")
            setParcela(1)
            setValor(0)
         } else { 
            setAlert({...alert, open: true, texto: "Valor não pode ser ZERO ou NEGATIVO."})
         }
    }

    const DeleteForma = (id) => {
        const x = data.formavenda.filter((res) => res.id !== id)
        setData({...data, formavenda: x})
    }

    return (
        <ContainerCreate>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
            <h1>Formas de Pagamento</h1>
            <Coluna>
                <Bloco>
                    <p><b>Quant.</b></p>
                    <p>{quantidadevendas}</p>
                </Bloco>
                <Bloco>
                    <p><b>Valor</b></p>
                    <p>{parseInt(total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                </Bloco>
                <Bloco>
                    <p><b>Saldo</b></p>
                    <p>{parseInt(saldo).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                </Bloco>
            </Coluna>
            <hr/>
            <FormControl fullWidth>
                <InputLabel id="forma1">Forma de Pagamento</InputLabel>
                <Select
                size="small"
                labelId="forma1"
                id="demo-simple-select"
                value={forma}
                onChange={(e) => {
                    setForma(e.target.value)

                }}
                label="Forma de Pagamento"
                >
                    <MenuItem value="DH">Dinheiro</MenuItem>
                    <MenuItem value="CC">Cartão de Crédito</MenuItem>
                    <MenuItem value="CD">Cartão de Débito</MenuItem>
                    <MenuItem value="DP">PIX</MenuItem>
                    <MenuItem value="FO">Folha de Pagamento</MenuItem>
                    <MenuItem value="VE">Voucher Exagerado</MenuItem>
                </Select>
            </FormControl>
                <Coluna>
                    <FormControl fullWidth>
                        <InputLabel id="Label1">Parcelas</InputLabel>
                        <Select
                        disabled={forma == 'CC' || forma == 'FO' ? false : true}
                        labelId="Label1"
                        id="demo-simple-select"
                        value={parcela}
                        label= "Parcelas"
                        size="small"
                        onChange={(e) => {
                            setParcela(e.target.value)
                        
                        }}
                        >
                            <MenuItem value="1">1</MenuItem>
                            { total_venda >= 300 && forma === 'CC' || forma === 'FO' || user.tipouser === 'C' ?  <MenuItem value="2">2</MenuItem> : null}
                            { total_venda >= 600 && forma === 'CC' || forma === 'FO' || user.tipouser === 'C' ? <MenuItem value="3">3</MenuItem> : null}
                            { total_venda >= 800 && forma === 'CC' || forma === 'FO' || user.tipouser === 'C' ? <MenuItem value="4">4</MenuItem> : null}
                            { total_venda >= 1000 && forma === 'CC' || forma === 'FO' || user.tipouser === 'C' ? <MenuItem value="5">5</MenuItem> : null}
                            { total_venda >= 1200 && forma === 'CC' || forma === 'FO' || user.tipouser === 'C' ? <MenuItem value="6">6</MenuItem> : null}
                            { total_venda >= 1400 && forma === 'CC' || user.tipouser === 'C' ? <MenuItem value="7">7</MenuItem> : null}
                            { total_venda >= 1600 && forma === 'CC' || user.tipouser === 'C' ? <MenuItem value="8">8</MenuItem> : null}
                            { total_venda >= 1800 && forma === 'CC' || user.tipouser === 'C' ? <MenuItem value="9">9</MenuItem> : null}
                            { total_venda >= 2000 && forma === 'CC' || user.tipouser === 'C' ? <MenuItem value="10">10</MenuItem> : null}
                        </Select>
                    </FormControl>
                    <TextField id="dump" size="small" label="Valor" type="number" onChange={(e) => setValor(e.target.value)} value={valor} fullWidth/>
                    <IconButton onClick={() => AddForma()}>
                        <AddCardIcon/>
                    </IconButton>
                </Coluna>
                <CardFormPag data={data.formavenda} DeleteForma={DeleteForma}/>
                <hr/>
                <Coluna>
                    <Button onClick={() => setStep(step-1)}>Voltar</Button>
                    <Button onClick={() => {
                        if (saldo == 0) {
                            setStep(step+1)
                            setData({...data, total_venda: total_venda})
                        } else {
                            setAlert({...alert, open: true, texto: "Métodos de pagamento Incorretos, o saldo deve está zerado !"})
                        }
                    }}>Avançar</Button>
                </Coluna>
        </ContainerCreate>
    )
}

export default FormpagStep