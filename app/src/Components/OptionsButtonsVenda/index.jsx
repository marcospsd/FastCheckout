import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Container } from './style'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ComprovanteVenda} from '../../Reports/viewvenda';

const OptionsButtonsVenda = ({ venda }) => {


    return (
        <Container>
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => ComprovanteVenda(venda)}>
                <MaterialIcons name="print" size={40} color="black" />
                <Text style={styles.textButton}>Imprimir</Text>
            </TouchableOpacity>
            { venda.status == "F" ? 
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <MaterialCommunityIcons name="arrow-u-left-bottom-bold" size={40} color="black" />
                <Text style={styles.textButton}>Orçamento</Text>
            </TouchableOpacity>: null }
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <MaterialIcons name="security" size={40} color="black" />
                <Text style={styles.textButton}>LGPD</Text>
            </TouchableOpacity>
            
            { venda.status == "P" ? 
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <FontAwesome name="edit" size={40} color="black" />
                <Text style={styles.textButton}>Editar</Text>
            </TouchableOpacity> : null }
        </Container>
        )

}

export default OptionsButtonsVenda

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        borderRadius: 50,
        backgroundColor: 'rgba(217, 217, 217, 0.3)',
        opacity: 0.8
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold',
    }
})