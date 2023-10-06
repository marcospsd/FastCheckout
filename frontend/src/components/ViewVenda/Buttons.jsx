import React, { useContext } from 'react'
import ComprovanteVenda from '../../reports/venda';
import { AuthContext } from '../../contexts/auth' 
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../services/api'
import { useSWRConfig } from 'swr'

const ListButtons = ({ data, acaodeletar, retornarcompra, setOpen, setEditModal }) => {
    const { user, printRede } = useContext(AuthContext)
    const { mutate } = useSWRConfig()


    const AprovarCompra = async (venda) => {
        await api.patch(`/vendas/patchvenda/${venda.ordem}/`, { status: 'F' })
        .then((res) => {
            if (printRede !== true ) {ComprovanteVenda(venda)}
            mutate('/vendas/venda/') 
        })}
    
    const RetornaCompra = async (venda) => {
        await api.patch(`/vendas/patchvenda/${venda.ordem}/`, { status: 'P' })
        mutate('/vendas/vendafinalizada/')}

    const DeleteCompra = async (venda) => {
      await api.delete(`/vendas/venda/${venda.ordem}/`)
      mutate('/vendas/venda/')
    }
  


    switch (data.status) {
        case "P":
        return (
          <>
          <IconButton onClick={() => setEditModal(true)}><EditIcon/></IconButton>
          

               {user.tipouser === 'C' || user.tipouser === 'A' ? <IconButton onClick={ async () => {
                  AprovarCompra(data)
                  setOpen(false)
                }}><FactCheckIcon/></IconButton> : null}
  

          <IconButton onClick={() => {
            if(window.confirm("Deseja excluir essa venda ?")) {
              setOpen(false)
              DeleteCompra(data)
            }
              }} id='delete'><DeleteIcon/></IconButton>

          <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>
          </>
        )
        
        
       
        case "F":
          return (
            <>
            {user.tipouser === 'C' || user.tipouser === 'A'? <IconButton onClick={() => {
                  setOpen(false)
                  RetornaCompra(data)}
                  }><SettingsBackupRestoreIcon /></IconButton> : null }


            <IconButton onClick={() => {
              setOpen(false) 
              if ( printRede == true ) {
                api.post('/print/venda/', {ordem : data.ordem})
              } else {
                ComprovanteVenda(data)
              }
            }}><PrintIcon/></IconButton>

            <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>

            </>
          
          ) 
          
      }
}

export default ListButtons