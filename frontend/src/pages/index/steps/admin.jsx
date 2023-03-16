import React, { useState } from 'react'
import { useAxios } from '../../../services/api';
import { Coluna2, ContainerDados } from '../styles';
import {Button} from '@mui/material'
import ListUsers from '../../../components/ListUsers'
import CreateUser from '../../../components/CreateUser'
import AlterVenda from '../../../components/AlterVenda';
import CreateProd from '../../../components/CriarProd';

const Admin = () => {
    const { data, mutate } = useAxios('/auth/user/')
    const [ createuser, setCreateUser] = useState(false)
    const [ edituser, setEditUser ] = useState(false)
    const [ altervenda, setAlterVenda ] = useState(false)
    const [ createprod, setCreateProd] = useState(false)

    if (!data) {
        return <p>Carregando...</p>
    }



    return (
        <ContainerDados>
            <br/>
            <p>Administração</p>
            <Coluna2>
                    <Button sx={{ backgroundColor: 'white', color:  '#c52f33' }} onClick={() => setCreateUser(!createuser)}>Criar Usuário</Button>
                    <Button sx={{ backgroundColor: 'white', color:  '#c52f33' }} onClick={() => setAlterVenda(!altervenda)}>Trocar Venda</Button>
                    <Button sx={{ backgroundColor: 'white', color:  '#c52f33' }} onClick={() => setCreateProd(!createprod)}>Cadastrar Produto</Button>
            </Coluna2>
            <br/>
            { createuser ? <CreateUser open={createuser} setOpen={setCreateUser} mutate={mutate}/> : null}
            { altervenda ? <AlterVenda open={altervenda} setOpen={setAlterVenda} users={data}/> : null}
            { createprod ? <CreateProd open={createprod} setOpen={setCreateProd}/> : null}
            <ListUsers data={data} setEditUser={setEditUser} edituser={edituser} mutate={mutate}/>
        </ContainerDados>
    )
}


export default Admin;