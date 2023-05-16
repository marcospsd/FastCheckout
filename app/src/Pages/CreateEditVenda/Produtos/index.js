import React, { useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import FAButton from '../../../Components/FAButton'
import CardProducts from '../../../Components/CardProducts'


const Produtos = ({navigation}) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ open, setOpen ] = useState(false)

    const onPressAddItem = () => {
        return navigation.navigate('SearchProduct')
    }

    const onPressBarCode = () => {
        return navigation.navigate('BarCode')
    }

    const DeleteItem = (data) => {
        const NewState = state.corpovenda.filter((x) => x.id !== data.id)
        setState({...state, corpovenda: NewState})
    }


    console.log(state)
    return ( 
        <View style={{flex: 1}}>
            <FlatList
                 style={styles.bottomBar}
                 data={state.corpovenda}
                 keyExtractor={( item ) => String(item.id)}
                 showsVerticalScrollIndicator={false}
                 renderItem={ ({ item }) => <CardProducts data={item} navigation={navigation} DeleteItem={DeleteItem}/>}
                 ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Carrinho Vazio ...</Text></View>}
            />
            <FAButton style={{ bottom: 80, right: 60 }} open={open} setOpen={setOpen} onPressBarCode={onPressBarCode} onPressAddItem={onPressAddItem}/>
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