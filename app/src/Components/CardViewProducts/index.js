import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { formatDinheiro } from '../../Functions/format'


const CardView = ({data, AdicionarItem}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => AdicionarItem(data)}>
            <View>
                <Text style={styles.text}>{data.codigo + " - " + data.descricao}</Text>
                <Text style={styles.text}>{"PROMO: R$ " + formatDinheiro(data.valor_unitpro)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardView


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