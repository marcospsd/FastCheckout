import React, { useRef, useState, useContext, } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { TextInput, Provider } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { CreateVendaContext } from '../../../Context/createvendacontext'
import { ActivityIndicator } from 'react-native-paper'
import { api } from '../../../Services/api'
import { CPFReplace2 } from '../../../Functions/format'



const Cadastro = () => {
    const { state, setState } = useContext(CreateVendaContext)
    const [ disabled, setDisabled ] = useState(false)
    const cpfREF = useRef(null)

    const BuscaCPF = () => {
        setDisabled(true)
        const x = api.get(`/cliente/cliente/${cpfREF.current.getRawValue()}/`)
        .then((res) => {
            setState({...state, cpf: cpfREF.current.getRawValue(), dadoscliente: res.data})
        })
        .finally((res) => setDisabled(false))
        return x
    }


    return ( 
        <View style={{ flex: 1, padding: 10}}>
            <Provider>
                <TextInput 
                    style={styles.textinput}
                    label="CPF"
                    maxLength={14}
                    onChangeText={(text) => setState({...state, cpf: CPFReplace2(text), dadoscliente: {...state.dadoscliente, cpf: CPFReplace2(text) }})}
                    value={state.cpf}
                    onBlur={() => {
                        if (state.cpf == 0) return;
                        if (!cpfREF.current.isValid()) return Alert.alert("ERRO !", "CPF Invalido ou Incompleto !", [ { text: 'OK', style: 'cancel'} ], { cancelable: false })
                        if (state.cpf.length == 11) BuscaCPF()
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
                    disabled={disabled}
                        />
                    {disabled == true ?  <ActivityIndicator style={{ position: 'absolute', top: 25, right: 25}}/> : null}
                <TextInput 
                    style={styles.textinput}
                    label='Nome'
                    onChangeText={(text) => setState({...state, dadoscliente: {...state.dadoscliente, nome: text.toUpperCase() }})}
                    value={state.dadoscliente.nome}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    theme={{ colors: { primary: '#c52f33'}}}
                    disabled={disabled}
                    />
                <TextInput
                    style={styles.textinput}
                    label="Telefone"
                    maxLength={15}
                    onChangeText={(text) => setState({...state, dadoscliente: {...state.dadoscliente, telefone: CPFReplace2(text) }})}
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
                    disabled={disabled}
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
                    disabled={disabled}
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