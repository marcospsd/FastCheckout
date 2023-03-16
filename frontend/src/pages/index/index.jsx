import React, { useState, useContext } from 'react';
import Logo from '../../assets/FAST2.png';
import { BigContainer, Container, MenuAddCard } from './styles';
import { AuthContext } from '../../contexts/auth';
import Loading from '../../components/Loading';
import CreateVenda from '../../components/CreateVenda';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Pendentes from './steps/pendentes';
import Finalizados from './steps/finalizados';
import { useSWRConfig } from 'swr';
import Resumo from './steps/resumo';
import { CodUser } from '../../components/Functions/functions';
import Estoque from './steps/estoque';
import Admin from './steps/admin';



const HomePage = () => {
    const { user, logout } = useContext(AuthContext)
    const [ createmodal, setCreateModal ] = useState(false)
    const [ tipovendas, setTipoVendas ] = useState(user.tipouser == 'E' ? 'estoque': user.tipouser == 'A' ? 'resumo' : 'pendentes')
    const { mutate } = useSWRConfig()
    const State = {
        cpf: "",
        dadoscliente: {
            nome: "",
            telefone: "",
            email: "",
        },
        total_venda: "",
        vendedor: user.id,
        vendedorname: {
            first_name: user.first_name,
            codvend: user.codvend,
        },
        status: "P",
        corpovenda: [],
        formavenda: []    
    }
    const [datacreatevenda, setDataCreateVenda] = useState(State)


    if (!user) {
        return <Loading/>
    }


    const dataToggle = () => {
        switch (tipovendas) {
            case 'pendentes':
                return <Pendentes />
            case 'finalizados':
                return <Finalizados />
            case 'resumo':
                return <Resumo />
            case 'estoque':
                return <Estoque />
            case 'admin':
                return <Admin />
        }
    }


    return (
        <BigContainer>
            <Container>
                <IconButton onClick={() => logout()} id="logouticon">
                    <LogoutIcon/>
                </IconButton>
                <img src={Logo}/>
                <MenuAddCard>
                    <p id="nameuser"><b>{ user.first_name ? user?.first_name.toUpperCase().split(' ').slice(0, 1).join(' '): null}</b></p>
                    <IconButton id="addvenda" aria-label="add to shopping cart" size="large" onClick={() => setCreateModal(!createmodal)}>
                        <AddShoppingCartIcon fontSize="inherit"/>
                    </IconButton>
                    <p id='tipolist'><b>{ CodUser(user.tipouser)}</b></p>
                </MenuAddCard>
                { createmodal ? <CreateVenda open={createmodal} setOpen={setCreateModal} data={datacreatevenda} setData={setDataCreateVenda} initState={State} mutate={mutate}/> : null}
                <ToggleButtonGroup
                    value={tipovendas}
                    size="small"
                    exclusive
                    onChange={(e) => setTipoVendas(e.target.value)}
                    aria-label="Platform"
                    >
                     { user.tipouser == 'A' || user.tipouser == 'C' || user.tipouser == 'V' ? <ToggleButton value="pendentes">Pendentes</ToggleButton> : null}
                     { user.tipouser == 'A' || user.tipouser == 'C' || user.tipouser == 'V' ? <ToggleButton value="finalizados">Finalizados</ToggleButton> : null}
                     { user.tipouser == 'A' || user.tipouser == 'C' || user.tipouser == 'V' ? <ToggleButton value="resumo">Resumo</ToggleButton> : null}
                     { user.tipouser == 'E' ? <ToggleButton value="estoque">Estoque</ToggleButton> : null}
                     { user.tipouser == 'A' || user.tipouser == 'E' ? <ToggleButton value="admin">Admin</ToggleButton> : null}
                </ToggleButtonGroup>
                <br/>
                { dataToggle() }
                <br/>
            </Container>

        </BigContainer>
    )
}

export default HomePage
