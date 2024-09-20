import React, { useCallback, useState } from 'react'
import { SafeAreaView,} from 'react-native'
import { FlatListDisplay } from '../../../Components/FlatListDisplay'
import { TopBarHome } from '../../../Components/TopBarHome'
import { useAxios, api } from '../../../Services/api'
import LoadingComponent from '../../../Components/LoadingComponent'
import { Input, InputField } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'


const FinalizadosView = ({ navigation }) => {
    const { data, mutate } = useAxios('/vendas/vendafinalizada/')
    const [search, setSearch] = useState("")

    const DeleteItem = (item) => {
        const newData = data.filter((x) => x.id !== item)
        api.delete(`/vendas/vendafinalizada/${item}/`)
        .then((res) => {
            mutate(newData)
        })
    }

    newData = data ? data.filter((venda) => {
            if (search == "") {
                return venda
            } else if (venda.ordem.toString().includes(search)) {
                return venda
            } else if ((venda.dadoscliente.nome.toLowerCase().includes(search.toLowerCase()))) {
                return venda
            } else if ((venda.dadoscliente.cpf.includes(search))) {
                return venda
            }}) : []

    // useFocusEffect(useCallback(() => {
    //     mutate()
    // }, []))
            
    return (
        <SafeAreaView style={{ flex: 1}}>
            <TopBarHome navigation={navigation}/>
            <Input
                variant='outline'
                size="md"
                marginHorizontal={10}
                marginVertical={2}
                >
                <InputField 
                    placeholder='Filtre por CPF | Nome | Ordem'
                    onChangeText={(text) => setSearch(text)} 
                    value={search}/>
            </Input>
           { data ? <FlatListDisplay data={newData} navigation={navigation} DeleteItem={DeleteItem} mutate={mutate}/> : <LoadingComponent background="white" color="black"/> }
        </SafeAreaView>
    )
}


export default FinalizadosView;


