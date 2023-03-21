import React, { useState } from 'react'
import { FlatList, Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../Services/api'
import { formatDinheiro } from '../../Functions/format'

const SearchProducts = ({ visible, setVisible, AddItem}) => {
    const [product, setProduct] = useState("")
    const [result, setResult ] = useState([])


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
        AddItem(data)
        setResult([])
        setProduct("")
        setVisible(!visible)

    }

    const CardView = ({data}) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => AdicionarItem(data)}>
                <View>
                    <Text style={styles.text}>{data.codigo + " - " + data.descricao}</Text>
                    <Text style={styles.text}>{"PROMO: R$ " + formatDinheiro(data.valor_unitpro)}</Text>
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
                        style={{ backgroundColor: 'rgba(197, 47, 51, 1)',}}
                        color={"white"}
                        
                    />
                    <FlatList 
                             style={{ marginTop: 6, marginBottom: 3}}
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
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        padding: 10

    },
    text : {
        fontSize: 17,
        fontWeight: 'bold'
    }
})