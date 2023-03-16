import React, { useRef, useState, useContext } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { TextInput, Provider } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { CreateVendaContext } from '../../../Context/createvendacontext'



const Cadastro = () => {
    const { state, setState } = useContext(CreateVendaContext)
    const cpfREF = useRef(null)

    
    console.log(state)
    return ( 
        <View style={{ flex: 1, padding: 10}}>
            <Provider>
                <TextInput 
                    style={styles.textinput}
                    label="CPF"
                    maxLength={14}
                    onChangeText={(text) => setState({...state, cpf: text, dadoscliente: {...state.dadoscliente, cpf: text }})}
                    value={state.cpf}
                    onBlur={() => {
                        if (state.cpf.length == 0) return;
                        if (!cpfREF.current.isValid()) return Alert.alert("ERRO !", "CPF Invalido ou Incompleto !", [ { text: 'OK', style: 'cancel'} ], { cancelable: false })
                    }}
                    render={
                        (props) => (
                            <TextInputMask
                            {...props}
                            type={'cpf'}
                            ref={cpfREF}
                            />)
                        }
                    theme={{ colors: { primary: '#c52f33'}}}
                        />
                <TextInput 
                    style={styles.textinput}
                    label='Nome'
                    onChangeText={(text) => setState({...state, dadoscliente: {...state.dadoscliente, nome: text }})}
                    value={state.dadoscliente.nome}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    theme={{ colors: { primary: '#c52f33'}}}
                    />
                <TextInput
                    style={styles.textinput}
                    label="Telefone"
                    maxLength={15}
                    onChangeText={(text) => setState({...state, dadoscliente: {...state.dadoscliente, telefone: text }})}
                    value={state.dadoscliente.telefone}
                    render = { (props) => (
                        <TextInputMask
                        {...props}

                        type={'cel-phone'}
                        options={{
                            maskType:'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }} /> )
                    } 
                    theme={{ colors: { primary: '#c52f33'}}}
                    />
                <TextInput
                    style={styles.textinput}
                    label="E-mail"
                    maxLength={50}
                    onChangeText={(text) => setState({...state, dadoscliente: {...state.dadoscliente, email: text }})}
                    value={state.dadoscliente.email}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    theme={{ colors: { primary: '#c52f33'}}}
                    />
            </Provider>
        </View>
    )
}

export default Cadastro;


const styles = StyleSheet.create({
    textinput : {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(201, 201, 201, 0.2)',
    }
})