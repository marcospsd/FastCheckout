import React, { useState } from 'react';
import { NameForma, ValorDinheiro } from '../Functions/functions'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Tittle, FormaPagamento, Coluna, Linha, Absolute} from './styles'
import { Button, TextField } from '@mui/material';
import SelectBandeira from '../SelectBandeiras';
import SelectFormPag from '../SelectFormPag'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { api } from '../../services/api';
import AlertText from '../Alerts';



const ViewConciliador = ({ data, modal, setModal, mutate, setAtualizarVenda}) => {
    const [ newData, setNewData ] = useState(data)
    const [ img, setImg] = useState(null)
    const [ disabled, setDisabled] = useState(false)
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})

    const AtualizarConciliacao = () => {
        setDisabled(true)
        const formData = new FormData()
        if (newData.nsu && newData.nsu !== data.nsu) formData.append('nsu', newData.nsu)
        if (newData.autorizacao && newData.autorizacao !== data.autorizacao) formData.append('autorizacao', newData.autorizacao)
        if (newData.bandeira && newData.bandeira !== data.bandeira) formData.append('bandeira', newData.bandeira)
        if (newData.forma && newData.forma !== data.forma) formData.append('forma', newData.forma)
        if (newData.parcelas && newData.parcelas !== data.parcelas) formData.append('parcelas', newData.parcelas)
        if (newData.valor && newData.valor !== data.valor) formData.append('valor', newData.valor)
        if (img) formData.append("img", img)
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
        api.patch(`/vendas/formavenda/${data.id}/`, formData, config)
        .then((res) => {
            mutate()
            setModal(false)
        })
        .catch((err) => {
            console.log(err.response)
            setAlert({...alert, texto: JSON.stringify(err.response.data), open: true})
        })
        .finally((fin) => {
            setDisabled(false)
        })
    }

    const handleButtonClick = () => {
        // Abrir o link em uma nova guia
        window.open(newData.img, '_blank', 'noopener,noreferrer');
    };


    return (
        <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-create-venda'
            >
                <Absolute>
                    <IconButton onClick={() => setModal(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Absolute>
                <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open })} />
                <Tittle>
                    <p><strong>CONCILIAR</strong></p>
                </Tittle>
        
                <FormaPagamento>
                    <p><strong>FORMA DE PAGAMENTO</strong></p>
                    <table>
                        <tbody>
                        <tr id='formatitle'>
                            <td><b>Formas de Pag.</b></td>
                            <td><b>Parcelas</b></td>
                            <td><b>Valor</b></td>
                        </tr>
                        <tr>
                            <td>                            
                                <SelectFormPag 
                                    state={newData} 
                                    setState={setNewData}/>
                            </td>
                            <td>
                                <TextField
                                    sx={{ width: 100}}
                                    inputProps={{
                                        style: { color: 'white'}
                                    }}
                                    type='number'
                                    size="small"
                                    value={newData.parcelas}
                                    onChange={(e) => setNewData({...newData, parcelas: e.target.value})}
                                    />
                            </td>
                            {/* <td>
                                <TextField
                                    inputProps={{
                                        style: { color: 'white'}
                                    }}
                                    type="number"
                                    size="small"
                                    value={newData.valor}
                                    onChange={(e) => setNewData({...newData, valor: e.target.value})}
                                    />
                            </td>
                            <td className='formaconteudo' >{NameForma(data.forma)}</td>
                            <td className='formaconteudo' >{data.parcelas}</td> */}
                            <td className='formaconteudo' >{ValorDinheiro(data.valor)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                </FormaPagamento>
                <br/>
                <FormaPagamento>
                    <Coluna>
                        <Linha>
                            <label>NSU</label>
                            <TextField 
                                variant="outlined"
                                size="small"
                                value={newData.nsu}
                                onChange={(e) => setNewData({...newData, nsu: e.target.value})}
                                />
                        </Linha>
                        <Linha>
                            <label>Autorização</label>
                            <TextField 
                                variant="outlined"
                                size="small"
                                value={newData.autorizacao}
                                onChange={(e) => setNewData({...newData, autorizacao: e.target.value})}
                                />
                        </Linha>
                        <Linha
                            >
                            <label>Bandeira</label>
                            <SelectBandeira state={newData} setState={setNewData}/>
                        </Linha>
                        <Linha
                            >
                            <label>Imagem</label>
                            <Linha
                                >
                                 {
                                        img && <ThumbUpIcon />
                                    }
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    hidden
                                    onChange={e => {
                                    setImg(e.target.files[0]); // Ação após escolher arquivo
                                    }}
                                />
                                <label htmlFor="icon-button-file">

                                    <IconButton 
                                        htmlFor="icon-button-file"
                                        sx={{ color: 'white'}}
                                        aria-label="upload picture" 
                                        component="span" // Essencial para que funcione como parte do label
                                        size="large"
                                        >
                                            <PhotoCameraIcon />
                                        </IconButton>
                                </label>
                                <IconButton 
                                    sx={{ color: 'white'}}
                                    aria-label="delete1" 
                                    size="large" 
                                    onClick={handleButtonClick}
                                    disabled={data.img ? false : true}
                                    >
                                    <InsertPhotoIcon/>
                                </IconButton> 
                            </Linha>
                            
                        </Linha>

                    </Coluna>
                    <Button 
                        sx={{ color: 'white'}}
                        variant="outliner"
                        onClick={AtualizarConciliacao}
                        disabled={disabled}
                        >
                        {disabled ? 'Enviando ...' : "Enviar"}
                    </Button>
                </FormaPagamento>
                    <br/>
             </Box>
        </Modal>
    
        )
}

export default ViewConciliador