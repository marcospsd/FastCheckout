import React from 'react'
import CardBestSeller from '../../../components/CardBestSeller'
import { useAxios } from '../../../services/api'


const Estoque = () => {
    const { data, mutate } = useAxios("/produtos/saidaprodutos/")


    return (
        <>
        <hr/>
        { data ? data.map((res) => (
            <CardBestSeller data={res} mutate={mutate}/>
        )) : null }
        </>
    )
}

export default Estoque;