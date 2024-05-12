import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectFormaPag = ({state, setState}) => {
    return (
        <FormControl>
          <Select
            size='small'
            value={state.forma}
            onChange={(e) => setState({...state, forma: e.target.value})}
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
            <MenuItem value='DH'>Dinheiro</MenuItem>
            <MenuItem value='CC'>C. Crédito</MenuItem>
            <MenuItem value='CD'>C. Débito</MenuItem>
            <MenuItem value='DP'>PIX</MenuItem>
            <MenuItem value='FO'>Folha Pag.</MenuItem>
            <MenuItem value='VE'>Voucher EX</MenuItem>
          </Select>
        </FormControl>
    )
}

export default SelectFormaPag;