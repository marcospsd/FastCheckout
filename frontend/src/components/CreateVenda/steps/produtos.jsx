import React, {useState} from 'react'
import { ContainerCreate, Coluna } from '../styles';
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CardProducts from '../../CardProducts'
import PercentIcon from '@mui/icons-material/Percent';
import { api } from '../../../services/api'
import AlertText from '../../Alerts'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LeitorBarCode from '../../BarCode';


const ProdutoStep = ({ step, setStep, setData, data }) => {
    const [alert, setAlert] = useState({ open: false, texto: "", tipoalert: "error" })
    const [codigo, setCodigo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valorsis, setValorSis] = useState("")
    const [valorpro, setValorPro] = useState("")
    const [porcdesc, setPorcDesc] = useState("")
    const [pesquisa, setPesquisa] = useState("")
    const [resultado, setResultado] = useState([])
    const [key, setKey] = useState(1)
    const [ keyautcomplete, setKeyAutocomplete] = useState(false)
    const [ scannerModal, setScannerModal] = useState(false)


    const DesctoValue = (id) => {
        if (id !== "") {
        try {
            const porcento = id/100
            const produto = 1-porcento
            setValorPro(Math.round((valorsis*produto)))
        } catch { 
            setPorcDesc(0)
            setValorPro(0)}
        } else { 
            setValorPro(0) 
        }
    }

    const ValuetoDesc = (id) => {
        if (id !== "") {
            try {
            const porcento = (1 - (valorpro / valorsis )) * 100
            setPorcDesc(Math.round(porcento))
            } catch {
            setValorPro(0)
            setPorcDesc(0)
        }
        } else { setValorPro(0)}
    }


    const Pesquisar = async (pesquisa) => {
        setPesquisa(pesquisa)
        if (pesquisa !== "") {
            if (pesquisa.length >= 4){
                api.get(`/produtos/produto/${pesquisa}`)
                .then((res) => {
                    if (Array.isArray(res.data)){
                        setResultado(res.data) 
                    } else {
                        setResultado([])
                    }   
                })
            }
        }
        return;
    }

    const AddCard = () => {
        if (codigo != ""){
            setData({...data, corpovenda: [...data.corpovenda, { 
                id: key,
                codpro: codigo,
                descripro: descricao,
                valor_unitsis: valorsis,
                valor_unitpro: valorpro,
                quantidade: 1,
            }]})
            setKey(key+1)
            setCodigo("")
            setDescricao("")
            setValorPro("")
            setValorSis("")
            setPorcDesc("")
            setResultado([])
            setKeyAutocomplete(!keyautcomplete)
        }
    }

    const DeleteCard = (id) => {
        const x = data.corpovenda.filter((res) => res.id !== id)
        setData({...data, corpovenda: x})
    }

    return (
        <ContainerCreate>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
           <h1>Produtos</h1>
           <Coluna>
            <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        key={keyautcomplete}
                        getOptionLabel={(resultados) => `${resultados.codigo} - ${resultados.descricao}`}
                        onChange = {(resultado, newResultado) => {
                            if (newResultado) {
                                const result = ((newResultado.valor_unitpro / newResultado.valor_unitsis) - 1) * -100
                                setCodigo(newResultado.codigo)
                                setDescricao(newResultado.descricao)
                                setValorSis(newResultado.valor_unitsis)
                                setValorPro(newResultado.valor_unitpro)
                                setPorcDesc(Math.round(result))
                                setKeyAutocomplete(true)
                    
                            }
                            else { setPesquisa("") }
                            
                        }}
                        
                        options={resultado}
                        renderInput={(params) => <TextField {...params} label="Pesquise pela Descrição do Produto" onChange={(e) => Pesquisar(e.target.value)} value={pesquisa}/>}
                        />
            <IconButton onClick={() => setScannerModal(!scannerModal)}>
                <CameraAltIcon/>
            </IconButton>
            {scannerModal ? <LeitorBarCode openvideo={scannerModal} setOpenVideo={setScannerModal} setCodPro={setCodigo} setDescriPro={setDescricao} setValorPro={setValorPro} setValorSis={setValorSis}/> : null}
           </Coluna>
            <TextField label='Descricao' value={descricao} disabled size="small"/>
            <Coluna>
                <TextField label='Codigo' value={codigo} disabled size="small" /><br/>
                <TextField label='Valor Sistema' value={Math.round(valorsis, 0)} disabled size="small" />
            </Coluna>
            <Coluna>
                <TextField label='Desconto' value={porcdesc} size="small" onChange={(e) => setPorcDesc(e.target.value)}
                    onBlur={ () => DesctoValue(porcdesc)}
                    InputProps={{
                        endAdornment: (
                                <PercentIcon />
                        )}}/>
                <TextField label='Valor Promoção' value={Math.round(valorpro, 0)} onChange={(e) => setValorPro(e.target.value)} size="small" onBlur={ () => ValuetoDesc(valorpro)}/>
            </Coluna>
            <Button onClick={() => AddCard()}>Adicionar</Button>
            <hr/>
            <br/>
            {data.corpovenda.length > 0 ? 
                data.corpovenda.map((data) => (
                    <CardProducts data={data} DeleteCard={DeleteCard} key={data.id} />))
                : <label>Não possui produtos adicionados...</label>}
            <hr/>
            <Coluna>
                <Button onClick={() => setStep(step-1)}>Voltar</Button>
                <Button onClick={() => {
                    if (data.corpovenda.length !== 0) {
                        setStep(step+1)
                    } else {
                        setAlert({...alert, open:true, texto: 'Não pode seguir sem escolher um produto.'})
                    }
                }}>Avançar</Button>
            </Coluna>
        
        </ContainerCreate>
    )
        
}

export default ProdutoStep