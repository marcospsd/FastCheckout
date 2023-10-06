import React, { useEffect, useState, createContext } from "react";
import { api } from '../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState(null)
    const [ printer, setPrinter ] = useState(true)

    useEffect(() => {
        const loadStorageData = async () => {
            const baseURL = await AsyncStorage.getItem('@urlapi')
            const getUser = await AsyncStorage.getItem('@userdata')
            const getTOKEN = await AsyncStorage.getItem('@tokenuser')
            api.defaults.baseURL = baseURL
            if (getUser && getTOKEN) {
                api.defaults.headers.Authorization = `token ${getTOKEN}`
                setUser(JSON.parse(getUser))
            }
            const print = await AsyncStorage.getItem('@printrede')
            if (!print) {
                AsyncStorage.setItem('@printrede', 'true')
            }
            setPrinter(print == 'true' ? true : false)
            setLoading(false)
        }
        loadStorageData()
    }, [])

    const Login = async (data) => {
        const x = api.post('/auth/', data)
        .then((res) => {
            api.defaults.headers.Authorization = `token ${res.data.token}`
            AsyncStorage.setItem('@userdata', JSON.stringify(res.data))
            AsyncStorage.setItem('@tokenuser', res.data.token)
            setUser(res.data)
        })
        .catch((err) => {
           return "Não foi possivel fazer login com as credencias fornecidas."
        })
        
        return x
    }

    const Logout = async () => {
        setUser(null)
        await AsyncStorage.removeItem('@userdata')
        await AsyncStorage.removeItem('@tokenuser')
        api.defaults.headers.Authorization = null;
    }

    return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, Login, Logout, printer, setPrinter }}>
        {children}
    </AuthContext.Provider>)
}

