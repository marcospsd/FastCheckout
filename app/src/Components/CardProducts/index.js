import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { formatDinheiro } from '../../Functions/format'
import { FontAwesome5 } from '@expo/vector-icons';
import { Grid} from 'react-native-easy-grid'


const CardProducts = ({ data, setOpen, setProduto, DeleteItem}) => {

    const DeleteItemAlert = (data) => {
        Alert.alert(
            'ATENÇÃO',
            'Deseja deletar esse item ?', 
            [
                {text: 'Deletar', onPress: () => DeleteItem(data)},
                {text: 'Cancelar', style: 'cancel', color: 'red'}
            ],
            { cancelable: false }
            )
    }


    return (
            <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={() => {
                        setProduto(data)
                        setOpen(true)
                    }} 
                    onLongPress={() => DeleteItemAlert(data)}>
                <Card style={[styles.card]}>
                    <Card.Content style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.iconsview}>
                            <View style={{ padding: 15, borderRadius: 100, backgroundColor: 'rgba(201, 201, 201, 0.5)', marginRight: 10 }}>
                                <FontAwesome5 name="glasses" size={30} color="black" />
                            </View>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'column', width: '100%'}}>
                            <View style={[styles.contentrow, { flexWrap: "wrap"}]}>
                                <Text style={styles.textprimary}>Codigo: </Text>
                                <Text style={styles.textsecundary}>{ data.codpro }</Text> 
                            </View>
                            <View style={styles.contentrow}>
                                <Text style={styles.textprimary}>Descrição: </Text>
                                <Grid style={{ flex: 1, flexWrap: 'wrap'}}>
                                    <Text style={styles.textsecundary} numberOfLines={2}>{ data.descripro }</Text> 
                                </Grid>
                            </View>
                            <View style={styles.contentrow}>
                                <Text style={styles.textprimary}>Valor: </Text>
                                <Text style={styles.textsecundary}>R$ {formatDinheiro(data.valor_unitpro)}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.contentrow}>
                                    <Text style={styles.textprimary}>Desconto: </Text>
                                    <Text style={styles.textsecundary}>{Math.round( (1-(parseInt(data.valor_unitpro)/parseInt(data.valor_unitsis) ) )*100 )} %</Text>
                                </View>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
    )
}

export default CardProducts;


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: 3,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 3  
        
    },
    contentrow: {
        flex: 1,
        flexDirection: 'row',
       

    },
    iconsview: {
        flex: 1.2, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    textprimary: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textsecundary: {
        fontSize: 16,
    },

})