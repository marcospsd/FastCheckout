import React, { useState } from 'react'
import { FlatList, Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../Services/api'
import { formatDinheiro } from '../../Functions/format'

const SearchProducts = ({ visible, setVisible, AddItem}) => {
    const [product, setProduct] = useState("")
    const [result, setResult ] = useState([])
    const [id, setId] = useState(100000)


    const SearchItem = (item) => {
        if (item.length >= 4) {
            api.get(`/produtos/produto/${item}`)
            .then((res) => {
                setResult(res.data)
            })
        }
    }

    const Close = () => {
        setResult([])
        setProduct("")
        setVisible(!visible)
    }


    const AdicionarItem = (data) => {
        const x = {
            codpro: data.codigo,
            descripro: data.descricao,
            valor_unitsis: data.valor_unitsis,
            valor_unitpro: data.valor_unitpro,
            quantidade: 1,
            id: id
        }
        AddItem(x)
        setId(id+1)
        setResult([])
        setProduct("")
        setVisible(!visible)

    }

    const CardView = ({data}) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => AdicionarItem(data)}>
                <View>
                    <Text style={styles.text}>{data.codigo + " - " + data.descricao}</Text>
                    <Text style={styles.text}>{"R$ " + formatDinheiro(data.valor_unitpro)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Modal visible={visible} onDismiss={Close} style={{flex:1, padding: 20}}>
            <View style={{ flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#c52f33'}}>
                    <TouchableOpacity
                        style={{ marginLeft:10 }}
                        onPress={Close}
                        >
                        <Ionicons name="arrow-back" size={34} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 9, margin: 20}}>
                    <Searchbar 
                        value={product}
                        onChangeText={(text) => {
                            setProduct(text)
                            SearchItem(text)
                        }}
                    />
                    <FlatList 
                             style={{ marginBottom: 3}}
                             data={result}
                             keyExtractor={( item ) => String(item.codigo)}
                             showsVerticalScrollIndicator={false}
                             renderItem={ ({ item }) => <CardView data={item}/>}
                             ListEmptyComponent={<View style={{alignItems: 'center', marginTop: 10}}><Text style={{ fontSize: 20 }}>Carrinho Vazio ...</Text></View>}
                            />

                </View>

            </View>
            
        </Modal>
    )
}

export default SearchProducts;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 3  

    },
    text : {
        fontSize: 16,
        fontWeight: 'bold'
    }
})