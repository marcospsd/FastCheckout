import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const ModalView = ({children, modal, setModal}) => {

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
                {children}
            </Box>
        </Modal>
    )

}

export default ModalView