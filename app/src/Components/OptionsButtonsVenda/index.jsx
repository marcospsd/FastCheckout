import React, { useContext, useRef, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import {AuthContext} from '../../Context/authcontext'
import { Container } from './style'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ComprovanteVenda} from '../../Reports/viewvenda';
import { FontAwesome5 } from '@expo/vector-icons';
import { api } from '../../Services/api';
import { useSWRConfig } from 'swr'
import { ReportQrCode } from '../../Reports/ReportQrCode';


const OptionsButtonsVenda = ({ venda, navigation }) => {
    const { printer } = useContext(AuthContext)
    const { mutate } = useSWRConfig()
    const [ disabled, setDisabled] = useState(false)
 
    const AprovarCompra = () => {
        setDisabled(true)
        const x = api.patch(`/vendas/patchvenda/${venda.ordem}/`, { status : "F"})
        .then((r) => {
            if (printer !== true) {
                ComprovanteVenda(r.data)
            } 
            mutate('/vendas/venda/')
            navigation.goBack()
        })
        .catch((r) => "Algo deu errado !")
        .finally((r) => setDisabled(false))
    }

    const OrçamentoBack = () => {
        setDisabled(true)
        const x = api.patch(`/vendas/patchvenda/${venda.ordem}/`, { status : "P"})
        .then((r) => {
            mutate('/vendas/vendafinalizada/')
            navigation.goBack()
        })
        .catch((r) => "Algo deu errado !")
        .finally((r) => setDisabled(false))
    }   

    const EditVenda = () => {
        return navigation.navigate('CreateEditVenda', { data: venda})
    }

    const QrCodeGenerate = async () => {
        setDisabled(true)
        await ReportQrCode(venda)
        setDisabled(false)
    }

    const ReImprimir = async () => {
        if(printer == true){
            api.post('/print/venda/', {"ordem": venda.ordem})
        } else {
            ComprovanteVenda(venda)
        }
    }

    return (
        <Container>
            { venda.status == "P" ? 
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={AprovarCompra} disabled={disabled}>
                <FontAwesome5 name="check-circle" size={40} color="black" />
                <Text style={styles.textButton}>Aprovar</Text>
            </TouchableOpacity> : null }
            { venda.status == "F" ?
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={ReImprimir} disabled={disabled}>
                <MaterialIcons name="print" size={40} color="black" />
                <Text style={styles.textButton}>Imprimir</Text>
            </TouchableOpacity> : null }
            { venda.status == "F" ? 
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={OrçamentoBack} disabled={disabled}>
                <MaterialCommunityIcons name="arrow-u-left-bottom-bold" size={40} color="black" />
                <Text style={styles.textButton}>Orçamento</Text>
            </TouchableOpacity>: null }
            <TouchableOpacity style={styles.button} activeOpacity={0.5} disabled={disabled} onPress={QrCodeGenerate}>
                <MaterialCommunityIcons name="qrcode" size={40} color="black" />
                <Text style={styles.textButton}>CashBack</Text>
            </TouchableOpacity>
            
            { venda.status == "P" ? 
            <TouchableOpacity style={styles.button} activeOpacity={0.5} disabled={disabled} onPress={EditVenda}>
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