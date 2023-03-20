import React, { useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import FAButton from '../../../Components/FAButton'
import CardProducts from '../../../Components/CardProducts'
import ModalEditProducts from '../../../Components/ModalEditProduct'
import { Provider } from 'react-native-paper'
import SearchProducts from '../../../Components/SearchProducts'


const Produtos = ({}) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ open, setOpen ] = useState(false)
    const [ pageadd, setPageAdd] = useState(false)
    const [ produto, setProduto ] = useState(null)


    const EditID = (item) =>{
        const x = state.corpovenda.filter((res) => res.id !== item.id)
        setState({...state, corpovenda: [...x, item]})
        setProduto(null)
    }

    const DeleteItem = (item) => {
        const x = state.corpovenda.filter((res) => res.id !== item.id)
        setState({...state, corpovenda: x})
    }

    const AddItem = (item) =>{
        setState({...state, corpovenda: [...state.corpovenda, item]})
    }

    const onPressAddItem = () => {
        setPageAdd(!pageadd)
    }
    return ( 
        <View style={{flex: 1}}>
            <Provider>
                <SearchProducts visible={pageadd} setVisible={setPageAdd} AddItem={AddItem}/>
                <ModalEditProducts visible={open} setVisible={setOpen} item={produto} setItem={setProduto} EditItem={EditID}/>
                <FlatList
                    style={styles.bottomBar}
                    data={state.corpovenda}
                    keyExtractor={( item ) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={ ({ item }) => <CardProducts data={item} setOpen={setOpen} setProduto={setProduto} DeleteItem={DeleteItem}/>}
                    ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Carrinho Vazio ...</Text></View>}
                />
                <FAButton style={{ bottom: 80, right: 60 }} onPressAddItem={onPressAddItem}/>
            </Provider>
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