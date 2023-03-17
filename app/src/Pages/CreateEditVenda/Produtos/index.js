import React, { useContext, } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import FAButton from '../../../Components/FAButton'
import CardProducts from '../../../Components/CardProducts'


const Produtos = ({}) => {
    const { state, setState } = useContext(CreateVendaContext)


    return ( 
        <View style={{flex: 1}}>
            <FlatList
                 style={styles.bottomBar}
                 data={state.corpovenda}
                 keyExtractor={( item ) => String(item.ordem)}
                 showsVerticalScrollIndicator={false}
                 renderItem={ ({ item }) => <CardProducts data={item}/>}
                 ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Carrinho Vazio ...</Text></View>}
            />
            <FAButton style={{ bottom: 80, right: 60 }}/>
        </View>
    )
}

export default Produtos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    flatlist: {
        flex: 1
    },
    bottomBar: {
        marginBottom: 3
    }
})