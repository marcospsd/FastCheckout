import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ContainerLogin } from './styles'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ConfigPage = ({navigation}) => {
    const [ url, setUrl] = useState("")

    const Connect = async () => {
        try {
            await AsyncStorage.setItem("@urlapi", url)
            return navigation.goBack()
        } catch (e) {
            console.log('erro')
        } 
    }

    useEffect(() => {
        const Init = async () => {
            const x = await AsyncStorage.getItem('@urlapi')
            setUrl(x ? x : "")
        }
        Init()
    }, [])

    
    return (
        <View style={{ flex: 1, backgroundColor: '#c52f33', alignItems: 'center', justifyContent: 'center'}}>
            <ContainerLogin>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 20}}>Insira uma URL para Conexão</Text>
                <TextInput
                    style={{ width: 250, marginBottom: 10, backgroundColor: 'rgba(201, 201, 201, 0.2)', marginBottom: 20 }} theme={{ colors: { primary: '#c52f33'}}}
                    label="URL"
                    onChangeText={(text) => setUrl(text)}
                    value={url}
                    />
                <Button mode="contained" style={{ marginBottom: 20}} theme={{ colors: { primary: '#c52f33'}}} onPress={Connect}>Connectar</Button>
            </ContainerLogin>
        </View>
    )
}

export default ConfigPage;