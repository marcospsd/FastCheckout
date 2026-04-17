import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { NameStatus, CPFReplaceLGPD as CPFReplace, formatDinheiro } from '../../Functions/format'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ButtonDelete from "../ButtonDelete";


export const ListDisplay = ({ data, navigation, DeleteItem }) => {

    const Delete = () => {
        Alert.alert(
            "ATENÇÃO !",
            "você tem certeza que deseja deletar esse item ?, \nEssa operação não pode ser desfeita.",
            [
                {text: 'Sim', onPress: () => DeleteItem(data.ordem) },
                {text: 'Cancelar', style: 'cancel', color: 'red'}
            ],
            { cancelable: false }
            )
    }

    const OptionDelete = () => {
        if (data.status == "P") {
            return <ButtonDelete onPress={Delete}/>
        } else {
            return ;
        }
    }

    return (
        <GestureHandlerRootView >
            <Swipeable 
                renderRightActions={OptionDelete}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ViewVenda', { data: data})} >
                    <Card style={styles.card}>
                        <Card.Content style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', width: '100%'}}>
                                <View style={styles.contentrow}>
                                    <Text style={styles.textprimary}>Ordem: </Text>
                                    <Text style={styles.textsecundary}>{ data.ordem }</Text> 
                                </View>
                                <View style={styles.contentrow}>
                                    <Text style={styles.textprimary}>Nome: </Text>
                                    <Text style={styles.textsecundary}>{ data.dadoscliente.nome.substring(0, 22) }</Text> 
                                </View>
                                <View style={styles.contentrow}>
                                    <Text style={styles.textprimary}>CPF: </Text>
                                    <Text style={styles.textsecundary}>{ CPFReplace(data.cpf) }</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.contentrow}>
                                        <Text style={styles.textprimary}>Valor: </Text>
                                        <Text style={styles.textsecundary}>R$ {formatDinheiro(data.total_venda) }</Text>
                                    </View>
                                    <View style={styles.contentrow}>
                                        <Text style={styles.textprimary}>Status: </Text>
                                        <Text style={data.status == "F" ? styles.colored : data.status == "P" ? styles.colorgreen : null}>{ NameStatus(data.status) }</Text>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity> 
            </Swipeable>
        </GestureHandlerRootView>
    )
}

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
    textprimary: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textsecundary: {
        fontSize: 16,
    },
    colored: {
        fontWeight: 'bold',
        color: 'red'
    },
    colorgreen: {
        fontWeight: 'bold',
        color: 'green'
    },


})