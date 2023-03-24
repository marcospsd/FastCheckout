import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ContainerLogin } from './styles'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../../Components/TopBar'
import AlertSnack from '../../Components/Snackbar'
import { service, api} from '../../Services/api'


const ConfigPage = ({navigation, route}) => {
    const [ url, setUrl] = useState("")
    const [ blockButton, setBlockButton] = useState(false)
    const [ alert, setAlert] = useState({ open: false, text: ""})

    const Connect = async () => {
        setBlockButton(true)
        service.get(`${url}/auth/status/`)
        .then((res) => {
            AsyncStorage.setItem("@urlapi", url)
            api.defaults.baseURL = url
            return navigation.goBack()
        })
        .catch((err) => {
            setAlert({open: true, text: "Não foi possivel conectar no servidor."})
        })
        .finally((fin) => {

            setBlockButton(false)
        })

    }

    useEffect(() => {
        const Init = async () => {
            const x = await AsyncStorage.getItem('@urlapi')
            setUrl(x ? x : "")
        }
        Init()
    }, [])

    
    return (
        <View style={{flex: 1, backgroundColor: '#c52f33',}}>
            <TopBar PageName={route.name} navigation={navigation}/>
            
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <ContainerLogin>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 20}}>Insira uma URL para Conexão</Text>
                    <TextInput
                        style={{ width: 300, marginBottom: 10, backgroundColor: 'rgba(201, 201, 201, 0.2)', marginBottom: 20 }} theme={{ colors: { primary: '#c52f33'}}}
                        label="URL"
                        onChangeText={(text) => setUrl(text)}
                        value={url}
                        />
                    <Button mode="contained" style={{ width: 150, marginBottom: 20}} theme={{ colors: { primary: '#c52f33'}}} onPress={Connect} disabled={blockButton}>Conectar</Button>
                </ContainerLogin>
            </View>
            <AlertSnack text={alert.text} open={alert} setOpen={setAlert} />

        </View>
    )
}

export default ConfigPage;