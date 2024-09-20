import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export const TopBar = ({PageName, title, goBack }) => {


    const Back = () => {
        if (PageName == 'CreateScreen') {
            Alert.alert(
                'ATENÇÃO',
                'Deseja voltar ? seus dados serão perdidos !', 
                [
                    {text: 'Sair', onPress: () => goBack()},
                    {text: 'Cancel', style: 'cancel', color: 'red'}
                ],
                { cancelable: false }
            )
        } else {
            return goBack()
        }
    }

    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    style={styles.buttonUser}
                    onPress={Back} >
                    <Ionicons name="arrow-back" size={34} color="white" />
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#c52f33',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 25,
        flexDirection: 'row',

    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlignVertical: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonUser: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30/2
    }
})