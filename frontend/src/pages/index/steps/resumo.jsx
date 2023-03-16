import React, { useContext } from 'react'
import {AuthContext} from '../../../contexts/auth'
import { useAxios } from '../../../services/api'
import { Coluna2, ContainerDados, Bloco } from '../styles'
import { ValorDinheiro } from '../../../components/Functions/functions'
import LoadingPage from '../../../components/Loading'
import ListTopProducts from '../../../components/ListTopProducts'
import ResumoFormasPag from '../../../components/ResumoFormasPag'

const Resumo = () => {
    const { user } = useContext(AuthContext)
    const vendas = useAxios('/vendas/resumovendas/')

    if (!vendas) {
        return <LoadingPage />
    }

    
    return (
        <>
        {vendas.data ? vendas.data.map((res) => (
            <ContainerDados key={res.create_at}>
                <p><b>Data: {res.create_at}</b></p>
                <Coluna2>
                    <Bloco>
                        <p><b>Quantidade de Vendas</b></p>
                        <p>{res.qtd_venda}</p>
                    </Bloco>
                    <Bloco>
                        <p><b>Faturamento Total</b></p>
                        <p>{ValorDinheiro(res.total_vendas)}</p>
                    </Bloco>
                </Coluna2>
                <br/>
                { user.tipouser == 'C' ? <ResumoFormasPag/> : null}
                <p><b>Top Produtos</b></p>
                <ListTopProducts date={res.create_at} />
            </ContainerDados>
        )) : null }
        </>
    )
}

export default Resumo;