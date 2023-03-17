import React, { useState } from 'react';


export const CreateVendaContext = React.createContext()


const NewState = {
    ordem: null,
    cpf: "",
    dadoscliente: {},
    total_venda: "",
    vendedor: "",
    status: "",
    corpovenda: [
        {
            id: 1,
            codpro: "1175157",
            descripro: "OC RBRAN TESTE TESTE TESTE",
            valor_unitpro: 250,
            valor_unitsis: 250,
            quantidade: 1
        }
    ],
    formavenda: []
}



export const ContextVenda = ({ nstate, children }) => {
    const [ state, setState ] = useState(nstate ? nstate : NewState)

    const initState = () => setState(NewState)

    return (
        <CreateVendaContext.Provider value={{ state, setState, initState }}>
            { children }
        </CreateVendaContext.Provider>
    )
}
