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
            setPinPad({
                habilitar: false,
                dispositivo: ""
            })
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

