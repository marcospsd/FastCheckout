import React, { useState } from 'react'
import { useAxios } from '../../../services/api'
import CardVenda from '../../../components/CardsVendas'
import {Coluna} from '../styles'
import { TextField, IconButton, Box } from '@mui/material'
import ViewVenda from '../../../components/ViewVenda'
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';

const Pendentes = ({}) => {
    const { data, mutate } = useAxios("/vendas/venda/")
    const [viewVenda, setViewVenda] = useState(0)
    const [search, setSearch] = useState("")
    const [viewmodal, setViewModal] = useState(false)
    const [datamodal, setDatamodal] = useState(false)


    if (!data) {
        return (
            <Box sx={{width: '90%'}}>
                <Skeleton animation="wave" width={'100%'} height={118}/>
                <Skeleton animation="wave" width={'100%'} height={118}/>
            </Box>
        )
    }


    return (
        <>
            <Coluna>
                <TextField id="searchinput" label="Pesquise pela CPF/Nome" size="small" variant="outlined" value={search} onChange={(e) => {setSearch(e.target.value)}} 
                    sx={{ width: '90%', paddingBottom: '20px'}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }} />
                <IconButton onClick={() => mutate()} id="attbutton">
                        <CachedIcon />
                </IconButton>
            </Coluna>

                    {data && data.filter(
                        (venda) => {
                            if (search == "") {
                                return venda
                            } else if (venda.ordem.toString().includes(search)) {
                                return venda
                            } else if ((venda.dadoscliente.nome.toLowerCase().includes(search.toLowerCase()))) {
                                return venda
                            } else if ((venda.dadoscliente.cpf.includes(search))) {
                                return venda
                            }
                        }
                        ).map((data) => (
                        <CardVenda data={data} key={data.ordem} optionsModal={setViewModal} setDatamodal={setDatamodal}/>
                    ))}

                        
            {viewmodal ? <ViewVenda 
                        modal={viewmodal}
                        setModal={setViewModal}
                        setAtualizarVenda={setDatamodal}
                        data={datamodal}
                        mutate={mutate}
                        />
            : null}
        </>
    )
}

export default Pendentes;