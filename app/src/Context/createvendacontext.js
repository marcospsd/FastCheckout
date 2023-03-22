import React, { useContext, useState } from 'react';
import { AuthContext } from './authcontext'

export const CreateVendaContext = React.createContext()


export const ContextVenda = ({ nstate, children }) => {
    const { user } = useContext(AuthContext)
    const [ state, setState ] = useState(nstate ? nstate : {
            ordem: null,
            cpf: "",
            dadoscliente: {},
            vendedor: user.id,
            status: "P",
            corpovenda: [],
            formavenda: []
    })

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
        <CreateVendaContext.Provider value={{ state, setState, initState, user }}>
            { children }
        </CreateVendaContext.Provider>
    )
}
