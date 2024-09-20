import React, { useContext, useMemo, useState } from 'react';
import { AuthContext } from './authcontext'
import { useMMKVObject } from 'react-native-mmkv/lib/commonjs/hooks';
import { storage } from '../Functions/storage';

export const CreateVendaContext = React.createContext()


export const ContextVenda = ({ nstate, children }) => {
    const [ user ] = useMMKVObject("FC@USER", storage)

    const [ state, setState ] = useState(nstate ? nstate : {
            ordem: null,
            cpf: "",
            dadoscliente: {},
            vendedor: user.id,
            status: "P",
            corpovenda: [],
            formavenda: []
    })
    
    const memorizedState = useMemo(() => state, [state])

    const initState = () => setState({
        ordem: null,
        cpf: "",
        dadoscliente: {},
        vendedor: user.id,
        status: "P",
        corpovenda: [],
        formavenda: []
    })


    return (
        <CreateVendaContext.Provider value={{ state: memorizedState, setState, initState, user }}>
            { children }
        </CreateVendaContext.Provider>
    )
}
