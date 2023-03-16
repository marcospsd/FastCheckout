import React, {useContext, useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CadastroStep from './steps/cadastro';
import ProdutoStep from './steps/produtos';
import { AuthContext } from '../../contexts/auth'
import FormpagStep from './steps/formapag';
import { IconButton } from '@mui/material';
import { Relative } from './styles' 
import CloseIcon from '@mui/icons-material/Close';
import ResumoStep from './steps/resumo';



const EditVenda = ({ open, setOpen, initState, mutate, setAtualizarVenda }) => {
    const [step, setStep] = useState(0)
    const [data, setData] = useState(initState)


    const CloseData = () => {
        setData(initState)
        setStep(0)
        setOpen(false)
    }


    const StepActual = () => {
        switch(step) {
            case 0:
                return <CadastroStep step={step} setStep={setStep} setData={setData} data={data}/>
            case 1:
                return <ProdutoStep step={step} setStep={setStep} setData={setData} data={data} />
            case 2:
                return <FormpagStep step={step} setStep={setStep} setData={setData} data={data} />
            case 3:
                return <ResumoStep step={step} setStep={setStep} setData={setData} data={data} close={CloseData} setAtualizarVenda={setAtualizarVenda} />
        }
    } 


    return (
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-create-venda'
                sx={{ position: 'relative'}}
            >
                <Relative>
                    <IconButton onClick={() => CloseData()}>
                        <CloseIcon/>
                    </IconButton>
                </Relative>
                {StepActual()}
            </Box>
        </Modal>
    )
} 

export default EditVenda