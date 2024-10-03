import React, { useState, useContext } from 'react'
import { View, Text, FlatList} from 'react-native'
import { Searchbar } from 'react-native-paper'
import { api } from '../../Services/api'
import { CreateVendaContext } from '../../Context/createvendacontext';
import shortid from 'shortid'
import CardView from '../CardViewProducts'
import { TopBar } from '../TopBar';


const SearchProducts = ({navigation, route}) => {
    const { state, setState } = useContext(CreateVendaContext)
    const [product, setProduct] = useState("")
    const [result, setResult ] = useState([])


    const SearchItem = (item) => {
        setProduct(item)
        if (item.length >= 4) {
            api.get(`/produtos/produto/${item}`)
            .then((res) => {
                setResult(res.data)
            })
        }
    }

    const AdicionarItem = (data) => {
        const x = {
            codpro: data.codigo,
            descripro: data.descricao,
            valor_unitsis: parseInt(data.valor_unitsis),
            valor_unitpro: parseInt(data.valor_unitpro),
            quantidade: 1,
            id: data.id ? data.id : shortid.generate()
        }
        setState({...state, corpovenda: [...state.corpovenda, x]})
        setResult([])
        setProduct("")
        navigation.goBack()
    }


    return (
            <View style={{ flex:1}} >
                    <TopBar PageName={route.name} navigation={navigation} title={"Buscar Produto"} goBack={() => navigation.goBack()}/>
                    <View style={{ padding: 15}}>
                    <Searchbar 
                        value={product}
                        onChangeText={(text) => SearchItem(text)}
                        style={{ backgroundColor: 'rgba(197, 47, 51, 1)', marginTop: 15 }}
                        color={"white"}
                        iconColor={"white"}
                        autoFocus={false}
                        />
                    <FlatList 
                        style={{ marginTop: 6, marginBottom: 3}}
                        data={result}
                        keyExtractor={( item ) => String(item.codigo)}
                        showsVerticalScrollIndicator={false}
                        renderItem={ ({ item }) => <CardView AdicionarItem={AdicionarItem} data={item}/>}
                        ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Lista Vazia ...</Text></View>}
                        />
                    </View>
              </View>
    )
}

export default SearchProducts;

