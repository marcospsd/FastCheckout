import React from 'react'
import { SafeAreaView,} from 'react-native'
import { FlatListDisplay } from '../../../Components/FlatListDisplay'
import { TopBarHome } from '../../../Components/TopBarHome'
import { useAxios, api } from '../../../Services/api'
import LoadingComponent from '../../../Components/LoadingComponent'


const FinalizadosView = ({ navigation }) => {

    const { data, mutate } = useAxios('/vendas/vendafinalizada/')

    const DeleteItem = (item) => {
        const newData = data.filter((x) => x.id !== item)
        api.delete(`/vendas/vendafinalizada/${item}/`)
        .then((res) => {
            mutate(newData)
        })
    }


    return (
        <SafeAreaView style={{ flex: 1}}>
            <TopBarHome navigation={navigation}/>
           { data ? <FlatListDisplay data={data} navigation={navigation} DeleteItem={DeleteItem} mutate={mutate}/> : <LoadingComponent background="white" color="black"/> }
        </SafeAreaView>
    )
}


export default FinalizadosView;


