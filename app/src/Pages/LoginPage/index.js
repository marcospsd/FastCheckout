import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper' 
import { ContainerLogin } from './styles'
import IMGLogo from '../../Assets/FAST2.png'
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../Context/authcontext'
import AlertSnack from '../../Components/Snackbar'



const LoginPage = ({ navigation }) => {
    const { Login } = useContext(AuthContext)
    const [ disabled, setDisabled ] = useState(false)
    const [ viewpass, setViewPass] = useState(true)
    const [ data, setData] = useState({ username: "", password: ""})
    const [ alert, setAlert ] = useState({ open: false, text: ""})

    const Entrar = async () => {
        if (data.username && data.password) {
            setDisabled(true)
            const x = await Login(data)
            if (x) setAlert({ open: true, text: x})
            setDisabled(false)
        }        

    }


    return (
    <View style={{ flex: 1, backgroundColor: '#c52f33', alignItems: 'center', justifyContent: 'center'}}>
        
        <ContainerLogin style={{elevation: 100}}>
            <Image source={IMGLogo} style={{ width: 300, height: 100, marginBottom: 30, marginTop: 20}} resizeMode="contain" />
            <TextInput 
                style={{ width: 300, marginBottom: 10, backgroundColor: 'rgba(201, 201, 201, 0.2)' }} theme={{ colors: { primary: '#c52f33'}}}
                label="Login"
                onChangeText={(text) => setData({...data, username: text.toLowerCase()})}
                left={ <TextInput.Icon icon="account" color="black" disabled/> }
                />
            <TextInput 
                style={{ width: 300, marginBottom: 20, backgroundColor: 'rgba(201, 201, 201, 0.2)',}} theme={{ colors: { primary: '#c52f33'}}}
                label="Senha"
                secureTextEntry={viewpass}
                onChangeText={(text) => setData({...data, password: text.toLowerCase()})}
                left={ <TextInput.Icon icon="key" color="black" disabled/> }
                right={
                    <TextInput.Icon icon={viewpass ? 'eye' : 'eye-off'} onPress={() => setViewPass(!viewpass)} />
                }
                />
            <Button mode="contained" style={{ width: 150, marginBottom: 20}} theme={{ colors: { primary: '#c52f33'}}} onPress={Entrar} disabled={disabled}>Entrar</Button>
            <TouchableOpacity style={{ marginBottom: 20}} onPress={() => navigation.navigate('ConfigPage')}>
                <Feather name="settings" size={40} color="black" />
            </TouchableOpacity>
        </ContainerLogin>
        <AlertSnack text={alert.text} open={alert} setOpen={setAlert} />
    </View>
    )
}


export default LoginPage;
