import React from 'react'
import { SafeAreaView,} from 'react-native'
import { FlatListDisplay } from '../../../Components/FlatListDisplay'
import { TopBarHome } from '../../../Components/TopBarHome'
import { data } from '../../../Functions/test'
import { useAxios } from '../../../Services/api'
import LoadingComponent from '../../../Components/LoadingComponent'



const PendentesView = ({ navigation }) => {
    const { data } = useAxios('/vendas/venda/')

    if (!data) return (<LoadingComponent background="white" color="white"/>)


    return (
        <SafeAreaView style={{ flex: 1}}>
            <TopBarHome/>
            <FlatListDisplay data={data} navigation={navigation}/>
        </SafeAreaView>
    )
}

export default PendentesView;

