import React, { useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import FAButton from '../../../Components/FAButton'
import CardProducts from '../../../Components/CardProducts'
import ModalEditProducts from '../../../Components/ModalEditProduct'
import { Provider } from 'react-native-paper'
import SearchProducts from '../../../Components/SearchProducts'
import BarCodeView from '../../../Components/BarCode'


const Produtos = ({}) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ open, setOpen ] = useState(false)
    const [ barcode, setBarCode ] = useState(false)
    const [ pageadd, setPageAdd] = useState(false)
    const [ produto, setProduto ] = useState(null)
    const [fabbutton, setFabButton] = useState(false)
    const [ id, setId] = useState(10000)
    const total_venda = state.corpovenda ? state.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0


    const EditID = (item) =>{
        const x = state.corpovenda.filter((res) => res.id !== item.id)
        setState({...state, corpovenda: [...x, item]})
        setProduto(null)
    }

    const DeleteItem = (item) => {
        const x = state.corpovenda.filter((res) => res.id !== item.id)
        setState({...state, corpovenda: x})
    }

    const AddItem = (data) =>{
        const x = {
            codpro: data.codigo,
            descripro: data.descricao,
            valor_unitsis: data.valor_unitsis,
            valor_unitpro: data.valor_unitpro,
            quantidade: 1,
            id: id
        }
        setState({...state, total_venda: total_venda ,corpovenda: [...state.corpovenda, x]})
        setId(id+1)
    }

    const onPressAddItem = () => {
        setPageAdd(!pageadd)
    }

    const onPressBarCode = () => {
        setBarCode(!barcode)
    }
    return ( 
        <View style={{flex: 1}}>
            <Provider>
                <SearchProducts visible={pageadd} setVisible={setPageAdd} AddItem={AddItem}/>
                { open && <ModalEditProducts visible={open} setVisible={setOpen} item={produto} setItem={setProduto} EditItem={EditID}/> }
                <FlatList
                    style={styles.bottomBar}
                    data={state.corpovenda}
                    keyExtractor={( item ) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={ ({ item }) => <CardProducts data={item} setOpen={setOpen} setProduto={setProduto} DeleteItem={DeleteItem}/>}
                    ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Carrinho Vazio ...</Text></View>}
                />
                <FAButton style={{ bottom: 80, right: 60 }} onPressAddItem={onPressAddItem} onPressBarCode={onPressBarCode} open={fabbutton} setOpen={setFabButton}/>
                { barcode && <BarCodeView visible={barcode} setVisible={setBarCode} AddItem={AddItem}/> }
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