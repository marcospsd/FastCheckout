import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBandeira = ({state, setState}) => {
    return (
        <FormControl>
          <Select
            size='small'
            value={state.bandeira ? state.bandeira : "NÃO INFORMADO" }
            onChange={(e) => setState({...state, bandeira: e.target.value})}
            sx={{ color: 'white'}}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 200,  // Máximo altura da lista suspensa
                        width: 250,      // Largura da lista suspensa
                    },
                },
            }}
          >
            <MenuItem value='VISA CREDITO'>VISA CREDITO</MenuItem>
            <MenuItem value='VISA DEBITO'>VISA DEBITO</MenuItem>
            <MenuItem value='MASTERCARD CREDITO'>MASTERCARD CREDITO</MenuItem>
            <MenuItem value='MAESTRO DEBITO'>MAESTRO DEBITO</MenuItem>
            <MenuItem value='HIPERCARD CREDITO'>HIPERCARD CREDITO</MenuItem>
            <MenuItem value='DINNERS CREDITO'>DINNERS CREDITO</MenuItem>
            <MenuItem value='ELO CREDITO'>ELO CREDITO</MenuItem>
            <MenuItem value='ELO DEBITO'>ELO DEBITO</MenuItem>
            <MenuItem value='AMERICAN EXPRESS CREDITO'>AMERICAN EXPRESS CREDITO</MenuItem>
            <MenuItem value='BANESCARD CREDITO'>BANESCARD CREDITO</MenuItem>
            <MenuItem value='BANESCARD DEBITO'>BANESCARD DEBITO</MenuItem>
            <MenuItem value='CABAL CREDITO'>CABAL CREDITO</MenuItem>
            <MenuItem value='CABAL DEBITO'>CABAL DEBITO</MenuItem>
            <MenuItem value='CREDSYSTEM CREDITO'>CREDSYSTEM CREDITO</MenuItem>
            <MenuItem value='DACASA CREDITO'>DACASA CREDITO</MenuItem>
            <MenuItem value='PICPAY CREDITO'>PICPAY CREDITO</MenuItem>
            <MenuItem value='REDESHOP CREDITO'>REDESHOP CREDITO</MenuItem>
            <MenuItem value='SOROCARD CREDITO'>SOROCARD CREDITO</MenuItem>
            <MenuItem value='NÃO INFORMADO'>NÃO INFORMADO</MenuItem>
          </Select>
        </FormControl>

    )
}

export default SelectBandeira;