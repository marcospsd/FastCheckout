import React from 'react'
import { SafeAreaView  } from 'react-native'
import { FlatListDisplay } from '../../../Components/FlatListDisplay'
import { TopBarHome } from '../../../Components/TopBarHome'
import { data } from '../../../Functions/test'

const FinalizadosView = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1}}>
            <TopBarHome />
            <FlatListDisplay data={data} navigation={navigation}/>
        </SafeAreaView>
    )
}

export default FinalizadosView;


