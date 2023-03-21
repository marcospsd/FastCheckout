import React, { useState } from 'react';


export const CreateVendaContext = React.createContext()


const NewState = {
    ordem: null,
    cpf: "",
    dadoscliente: {},
    total_venda: "",
    vendedor: "",
    status: "",
    corpovenda: [],
    formavenda: [
        {
            "forma": "CC",
            "parcelas": 1,
            "valor": "299",
            "id": 1
        },
        {
            "forma": "CC",
            "parcelas": 1,
            "valor": "299",
            "id": 2
        },
        {
            "forma": "CC",
            "parcelas": 1,
            "valor": "299",
            "id": 3
        }
    ]
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
