import React, { useEffect, useState, createContext } from "react";
import { api } from '../Services/api';
import { useMMKVObject, useMMKVString, useMMKVBoolean } from 'react-native-mmkv'
import { storage } from '../Functions/storage'


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useMMKVObject('FC@USER', storage)
    const [ url ] = useMMKVString('FC@URLBASE', storage)
    const [ printRede, setPrintRede] = useMMKVBoolean("FC@PRINTREDE", storage)
    const [ pinpad, setPinPad] = useMMKVObject("FC@PINPAD", storage)

    
    useEffect(() => {
        const loadStorageData = async () => {
            setLoading(true)
            api.defaults.baseURL = url
            if (user) {
                api.defaults.headers.Authorization = `token ${user.token}`
            }
            setLoading(false)
        }
        loadStorageData()
    }, [])

    const Login = async (data) => {
        const x = api.post('/auth/', data)
        .then((res) => {
            api.defaults.headers.Authorization = `token ${res.data.token}`
            setUser(res.data)
            setPrintRede(true)
            if (!pinpad){
                    setPinPad({
                        habilitar: false,
                        dispositivo: "",
                        operador: "0001",
                        cod_empresa: res.data?.variaveis?.SITEF_CODEMPRESA,
                        url: res.data?.variaveis?.SITEF_URL,
                        cnpj: res.data?.variaveis?.SITEF_CNPJ,
                        cnpj_automacao: res.data?.variaveis?.SITEF_CNPJAUTO,
                        comexterna: res.data?.variaveis?.SITEF_COMEXTERNA
                    })
                }
            if (pinpad) {
                setPinPad({...pinpad,
                    cod_empresa: res.data?.variaveis?.SITEF_CODEMPRESA,
                    url: res.data?.variaveis?.SITEF_URL,
                    cnpj: res.data?.variaveis?.SITEF_CNPJ,
                    cnpj_automacao: res.data?.variaveis?.SITEF_CNPJAUTO,
                    comexterna: res.data?.variaveis?.SITEF_COMEXTERNA
                })
            }
        })
        .catch(() => {
           return "Não foi possivel fazer login com as credencias fornecidas."
        })
        
        return x
    }

    const Logout = async () => {
        setUser(null)
        api.defaults.headers.Authorization = null;
    }

    return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, Login, Logout }}>
        {children}
    </AuthContext.Provider>)
}

