import React, { useState, useRef, useEffect } from 'react'
import { Modal, FlatList, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native'
import { ActivityIndicator, Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../Services/api'
import { formatDinheiro } from '../../Functions/format'

const SearchProducts = ({ visible, setVisible, AddItem}) => {
    const [product, setProduct] = useState("")
    const [result, setResult ] = useState([])
    const SearchRef = useRef(null)

    const SearchItem = (item) => {
        setProduct(item)
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

        <Modal visible={visible} onShow={() => SearchRef.current.focus()} onDismiss={Close} style={{ padding: 20}} >
                <View style={{height: 60, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#c52f33'}}>
                    <TouchableOpacity
                        style={{ marginLeft:10 }}
                        onPress={Close}
                       
                        >
                        <Ionicons name="arrow-back" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginEnd: 10, color: 'white'}}>Adicionar Produto</Text>
                </View>
                <View 
                style={{ margin: 20}}
                    >
                    <Searchbar 
                        value={product}
                        onChangeText={(text) => SearchItem(text)}
                        style={{ backgroundColor: 'rgba(197, 47, 51, 1)' }}
                        color={"white"}
                        iconColor={"white"}
                        ref={SearchRef}
                      
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